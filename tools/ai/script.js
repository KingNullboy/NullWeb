document.addEventListener("DOMContentLoaded", async () => {
  const d = document;

  let log = d.getElementById("groq_log");
  let input = d.getElementById("groq_input");
  let send = d.getElementById("send_btn");
  let clear = d.getElementById("clear_btn");
  let selector = d.getElementById("groq_chat_selector");

  let currentChat = selector.value;
  let debugMode = false;

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

  function loadImageToken(chatNum) {
    return localStorage.getItem("image_token_" + chatNum);
  }

  function saveImageToken(chatNum, token) {
    if (token)
      localStorage.setItem("image_token_" + chatNum, token);
    else
      localStorage.removeItem("image_token_" + chatNum);
  }

  let history = loadHistory(currentChat);
  let userToken = loadToken(currentChat);
  let imageToken = loadImageToken(currentChat) || "6d271cb7-5741-" + "4a9f-a396-937981e154a4";
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

  function debugLog(...args) {
    if (debugMode) {
      renderMessage("system", "DEBUG: " + args.map(a => typeof a === "object" ? JSON.stringify(a) : a).join(" "));
    }
  }

  updateLog();

  selector.onchange = () => {
    saveHistory(currentChat, history);
    saveToken(currentChat, userToken);
    saveImageToken(currentChat, imageToken);

    currentChat = selector.value;
    history = loadHistory(currentChat);
    userToken = loadToken(currentChat);
    imageToken = loadImageToken(currentChat) || "6d271cb7-5741-" + "4a9f-a396-937981e154a4";
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
        content: `Welcome to NullAI! You can use **Markdown formatting** in your messages.

Here are some useful commands:
- \`/setToken YOUR_GROQ_TOKEN\` — set your Groq API token
- \`/resetToken\` — reset Groq token
- \`/setImgToken YOUR_DEEPAI_TOKEN\` — set your DeepAI image token
- \`/resetImgToken\` — reset DeepAI token
- \`/img your prompt\` — generate an image using DeepAI
- \`/debug\` — toggle debug output in chat log

You're chatting with **Groq AI**, not ChatGPT. This interface is powered by my brain. Let's go! 🚀`
      });
      firstMessage = false;
    }

    if (q === "/debug") {
      debugMode = !debugMode;
      renderMessage("system", `Debug mode ${debugMode ? "enabled" : "disabled"}.`);
      return;
    }

    if (q.startsWith("/setToken ")) {
      userToken = q.split(" ")[1];
      saveToken(currentChat, userToken);
      renderMessage("system", "Groq token set.");
      return;
    } else if (q === "/resetToken") {
      userToken = null;
      saveToken(currentChat, null);
      renderMessage("system", "Groq token reset.");
      return;
    }

    if (q.startsWith("/setImgToken ")) {
      imageToken = q.split(" ")[1];
      saveImageToken(currentChat, imageToken);
      renderMessage("system", "Image token set.");
      return;
    } else if (q === "/resetImgToken") {
      imageToken = "6d271cb7-5741-" + "4a9f-a396-937981e154a4";
      saveImageToken(currentChat, null);
      renderMessage("system", "Image token reset to default.");
      return;
    }

    if (q.startsWith("/img ")) {
      const prompt = q.slice(5).trim();
      if (!prompt) {
        renderMessage("system", "You need to give me a prompt after /img.");
        return;
      }

      renderMessage("user", q);
      renderMessage("system", "Generating image...");

      try {
        const res = await fetch("https://api.deepai.org/api/text2img", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Key": imageToken
          },
          body: new URLSearchParams({ text: prompt }).toString()
        });

        const json = await res.json();
        debugLog("Image API response:", json);

        if (!json.output_url) {
          renderMessage("system", "Image generation failed: " + (json.err || "No image URL received."));
          return;
        }

        const img = new Image();
        img.src = json.output_url;
        img.alt = prompt;
        img.style.maxWidth = "100%";
        log.appendChild(img);
        log.scrollTop = log.scrollHeight;
      } catch (e) {
        renderMessage("system", "Network error while generating image: " + e.message);
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

      const json = await res.json();
      debugLog("Groq response:", json);

      if (!res.ok) {
        if (res.status === 429) {
          renderMessage("system", "Rate limit or quota exceeded. Use /setToken to try your own key.");
        } else {
          renderMessage("system", "Groq error: " + (json.error?.message || "Unknown error"));
        }
        return;
      }

      const reply = json.choices?.[0]?.message?.content?.trim() || "No response";
      history.push({ role: "assistant", content: reply });
      saveHistory(currentChat, history);
      updateLog();
    } catch (e) {
      renderMessage("system", "Network error: " + e.message);
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