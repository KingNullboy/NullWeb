document.addEventListener("DOMContentLoaded", async () => {
  const d = document;

  let log = d.getElementById("groq_log");
  let input = d.getElementById("groq_input");
  let send = d.getElementById("send_btn");
  let clear = d.getElementById("clear_btn");
  let selector = d.getElementById("groq_chat_selector");

  let currentChat = selector.value;
  let debugEnabled = false;

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

  function loadImgToken() {
    return localStorage.getItem("deepai_token");
  }

  function saveImgToken(token) {
    if (token)
      localStorage.setItem("deepai_token", token);
    else
      localStorage.removeItem("deepai_token");
  }

  let history = loadHistory(currentChat);
  let userToken = loadToken(currentChat);
  let imgToken = loadImgToken();
  let firstMessage = history.length === 0;

  function renderMessage(role, content) {
    const div = d.createElement("div");
    div.innerHTML = `<b style="color:${role === "user" ? "#0f0" : role === "assistant" ? "#0ff" : "#ff0"}">${role === "user" ? "You" : role === "assistant" ? "Groq" : "System"}:</b><br>${marked.parse(content)}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function debugLog(message) {
    if (debugEnabled) {
      renderMessage("system", `Debug: \`${message}\``);
    }
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
        content: "Ready to start chatting! Commands: `/setToken`, `/resetToken`, `/setImgToken`, `/resetImgToken`, `/img [prompt]`, `/debug`. Markdown formatting is supported!"
      });
      firstMessage = false;
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
    } else if (q.startsWith("/setImgToken ")) {
      imgToken = q.split(" ")[1];
      saveImgToken(imgToken);
      renderMessage("system", "Image token set.");
      return;
    } else if (q === "/resetImgToken") {
      imgToken = null;
      saveImgToken(null);
      renderMessage("system", "Image token reset.");
      return;
    } else if (q === "/debug") {
      debugEnabled = !debugEnabled;
      renderMessage("system", `Debugging ${debugEnabled ? "enabled" : "disabled"}.`);
      return;
    } else if (q.startsWith("/img ")) {
      const prompt = q.slice(5);
      if (!imgToken) {
        renderMessage("system", "Image generation failed: You need to set your own DeepAI API key using `/setImgToken`. DeepAI requires payment on the account for image generation and this is not the fault of KingNullboy.");
        return;
      }

      renderMessage("user", `/img ${prompt}`);
      try {
        const res = await fetch("https://api.deepai.org/api/text2img", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "api-key": imgToken
          },
          body: new URLSearchParams({ text: prompt })
        });

        const data = await res.json();
        debugLog(JSON.stringify(data));

        if (data.output_url) {
          renderMessage("assistant", `![Generated Image](${data.output_url})`);
        } else {
          renderMessage("system", `Image generation failed: ${data.err || "Unknown error."}`);
        }
      } catch (e) {
        renderMessage("system", `Image generation failed: ${e.message}`);
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