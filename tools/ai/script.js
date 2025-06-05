document.addEventListener("DOMContentLoaded", async () => {
  const d = document;

  let log = d.getElementById("groq_log");
  let input = d.getElementById("groq_input");
  let send = d.getElementById("send_btn");
  let clear = d.getElementById("clear_btn");
  let selector = d.getElementById("groq_chat_selector");

  let currentChat = selector.value;
  let debugEnabled = false;

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info
  };

  function debugPrint(method, ...args) {
    originalConsole[method].apply(console, args);
    if (debugEnabled) {
      renderMessage(
        "system",
        `**[${method.toUpperCase()}]** ${args
          .map(a => typeof a === "object" ? "```json\n" + JSON.stringify(a, null, 2) + "\n```" : String(a))
          .join(" ")}`
      );
    }
  }

  console.log = (...args) => debugPrint("log", ...args);
  console.warn = (...args) => debugPrint("warn", ...args);
  console.error = (...args) => debugPrint("error", ...args);
  console.info = (...args) => debugPrint("info", ...args);

  function loadHistory(chatNum) {
    let hist = localStorage.getItem("groq_history_" + chatNum);
    return hist ? JSON.parse(hist) : [];
  }

  function saveHistory(chatNum, history) {
    localStorage.setItem("groq_history_" + chatNum, JSON.stringify(history));
  }

  function loadToken(chatNum) {
    return localStorage.getItem("user_token_" + chatNum);
  }

  function saveToken(chatNum, token) {
    if (token)
      localStorage.setItem("user_token_" + chatNum, token);
    else
      localStorage.removeItem("user_token_" + chatNum);
  }

  let history = loadHistory(currentChat);
  let userToken = loadToken(currentChat);
  let firstMessage = history.length === 0;

  function renderMessage(role, content) {
    const div = d.createElement("div");
    div.innerHTML = `<b style="color:${role === "user" ? "#0f0" : role === "assistant" ? "#0ff" : "#ff0"}">${role === "user" ? "You" : role === "assistant" ? "Groq" : "System"}:</b><br>${marked.parse(content)}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function updateLog() {
    log.innerHTML = "";
    for (const m of history) {
      renderMessage(m.role, m.content);
    }
  }

  updateLog();

  selector.onchange = () => {
    saveHistory(currentChat, history);
    saveToken(currentChat, userToken);

    currentChat = selector.value;
    history = loadHistory(currentChat);
    userToken = loadToken(currentChat);
    firstMessage = history.length === 0;
    updateLog();
  };

  send.onclick = async () => {
    let q = input.value.trim();
    if (!q) return;
    input.value = "";

    if (firstMessage) {
      history.push({
        role: "system",
        content: `Ready to start chatting! Feel free to use **Markdown** formatting.

**Commands:**
- \`/setToken [token]\`: Set Groq token
- \`/resetToken\`: Clear Groq token
- \`/img [prompt]\`: Generate an image using DeepAI
- \`/debug\`: Toggle debug mode (shows console logs in chat)`
      });
      firstMessage = false;
    }

    if (q === "/debug") {
      debugEnabled = !debugEnabled;
      renderMessage("system", `Debug mode ${debugEnabled ? "enabled" : "disabled"}.`);
      return;
    }

    if (q.startsWith("/setToken ")) {
      userToken = q.split(" ")[1];
      saveToken(currentChat, userToken);
      renderMessage("system", "Token set.");
      return;
    } else if (q === "/resetToken") {
      userToken = null;
      saveToken(currentChat, null);
      renderMessage("system", "Token reset.");
      return;
    } else if (q.startsWith("/img ")) {
      const prompt = q.slice(5);
      history.push({ role: "user", content: q });
      updateLog();

      try {
        const res = await fetch("https://api.deepai.org/api/text2img", {
          method: "POST",
          headers: {
            "Api-Key": "6d271cb7-5741-" + "4a9f-a396-937981e154a4",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({ text: prompt })
        });

        if (!res.ok) {
          const err = await res.json();
          renderMessage("system", `Image generation failed: ${err?.err || "Unknown error"}`);
          return;
        }

        const json = await res.json();
        renderMessage("assistant", `Image generated for prompt: **${prompt}**\n\n![Generated Image](${json.output_url})`);
      } catch (e) {
        console.error("DeepAI error", e);
        renderMessage("system", `Network error: ${e.message}`);
      }
      return;
    }

    history.push({ role: "user", content: q });
    updateLog();

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken || "gsk_YcgtVMTZM1oEwMneyoQ0WGdy" + "b3FYsTJj6k22oylTpy4MBA3zhhzC"}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: history,
          temperature: 0.7
        })
      });

      if (!res.ok) {
        const err = await res.json();
        if (res.status === 429) {
          if (err.error?.message?.includes("rate limit")) {
            renderMessage("system", "Rate limit exceeded. Try again later.");
          } else {
            renderMessage("system", "Daily limit exceeded. Use /setToken [your_token].");
          }
        } else {
          renderMessage("system", `Error: ${err.error?.message || "Unknown error"}`);
        }
        return;
      }

      const json = await res.json();
      const reply = json.choices?.[0]?.message?.content?.trim() || "No response";
      history.push({ role: "assistant", content: reply });
      saveHistory(currentChat, history);
      updateLog();
    } catch (e) {
      console.error("Groq fetch error", e);
      renderMessage("system", `Network error: ${e.message}`);
    }
  };

  clear.onclick = () => {
    if (confirm("Clear chat history?")) {
      history = [];
      saveHistory(currentChat, history);
      updateLog();
    }
  };

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send.click();
    }
  });
});