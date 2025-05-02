if (location.hostname.includes("nullweb.byethost6.com")) {
  alert("This chat widget is disabled on this website.");
} else {
  (async () => {
    const d = document;
    if (d.getElementById("groq_chat_wrap")) return;

    const script = d.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    d.head.appendChild(script);
    await new Promise(res => script.onload = res);

    const style = d.createElement("style");
    style.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
#groq_chat_wrap {
  font-family: Lato, sans-serif;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 450px;
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  resize: both;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
#groq_title {
  background: #000;
  padding: 10px 15px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #fff;
}
#groq_controls button {
  margin-left: 5px;
  background: #f00;
  color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  font-family: Lato;
  padding: 4px 10px;
}
#groq_log {
  flex: 1;
  overflow: auto;
  padding: 15px;
  font-size: 14px;
  font-family: Lato;
  word-wrap: break-word;
}
#groq_input {
  background: #363636;
  color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  width: calc(100% - 12px);
  margin: 6px;
  padding: 6px;
  font-family: Lato;
  resize: none;
  height: 60px;
}
#groq_buttons {
  display: flex;
  width: 100%;
  padding: 4px 0;
}
#groq_buttons button {
  flex: 1;
  margin: 0;
  background: #f00;
  color: #fff;
  border: 2px solid #000;
  border-radius: 5px;
  font-family: Lato;
  height: 40px;
}
#groq_buttons button:first-child {
  margin-right: 5px;
}
#groq_min, #groq_close {
  border: 2px solid #fff;
  border-radius: 5px;
  padding: 5px 10px;
}
#groq_min {
  background: #f00;
  color: #fff;
}
#groq_chat_wrap.fullscreen {
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  border-radius: 0;
}
#groq_input:focus {
  outline: none;
}
    `;
    d.head.appendChild(style);

    const w = d.createElement("div");
    w.id = "groq_chat_wrap";
    w.innerHTML = `
      <div id="groq_title">
        <span>Groq Chat</span>
        <div id="groq_controls">
          <button id="groq_min">−</button>
          <button id="groq_close">×</button>
        </div>
      </div>
      <div id="groq_log"></div>
      <textarea id="groq_input" rows="2" placeholder="Type a message..."></textarea>
      <div id="groq_buttons">
        <button id="groq_send">Send</button>
        <button id="groq_clear">Clear</button>
      </div>
    `;
    d.body.appendChild(w);

    let log = w.querySelector("#groq_log");
    let input = w.querySelector("#groq_input");
    let send = w.querySelector("#groq_send");
    let clear = w.querySelector("#groq_clear");
    let min = w.querySelector("#groq_min");
    let close = w.querySelector("#groq_close");
    let title = w.querySelector("#groq_title");

    let history = JSON.parse(localStorage.groq_history || "[]");
    let userToken = localStorage.user_token || null;
    let firstMessage = true;

    function renderMessage(role, content) {
      const div = d.createElement("div");
      div.innerHTML = `<b style="color:${role === "user" ? "#0f0" : "#0ff"}">${role === "user" ? "You" : "Groq"}:</b><br>${marked.parse(content)}`;
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

    send.onclick = async () => {
      let q = input.value.trim();
      if (!q) return;
      input.value = "";

      if (firstMessage) {
        history.push({ role: "system", content: "Never use 3 backticks consecutively. Instead use 2 backticks." });
        firstMessage = false;
      }

      if (q.startsWith("/setToken ")) {
        userToken = q.split(" ")[1];
        localStorage.user_token = userToken;
        renderMessage("system", "Token set.");
        return;
      } else if (q === "/resetToken") {
        userToken = null;
        localStorage.removeItem("user_token");
        renderMessage("system", "Token reset.");
        return;
      }

      history.push({ role: "user", content: q });
      updateLog();

      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken || "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"}`
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: history,
            temperature: 0.7
          })
        });

        if (!res.ok) {
          const err = await res.json();
          if (res.status === 429) {
            if (err.error?.message?.includes("rate limit")) {
              renderMessage("system", "Rate limit exceeded (requests per minute). Try again later.");
            } else {
              renderMessage("system", "Daily limit exceeded. Set your own token with /setToken [your_token].");
            }
          } else {
            renderMessage("system", `Error: ${err.error?.message || "Unknown error"}`);
          }
          return;
        }

        const json = await res.json();
        const reply = json.choices?.[0]?.message?.content?.trim() || "No response";
        history.push({ role: "assistant", content: reply });
        localStorage.groq_history = JSON.stringify(history);
        updateLog();
      } catch (e) {
        renderMessage("system", `Network error: ${e.message}`);
      }
    };

    clear.onclick = () => {
      if (confirm("Clear chat history?")) {
        history = [];
        localStorage.removeItem("groq_history");
        updateLog();
      }
    };

    close.onclick = () => w.remove();

    min.onclick = () => {
      w.classList.toggle("fullscreen");
      min.textContent = w.classList.contains("fullscreen") ? "−" : "+";
    };

    input.addEventListener("keydown", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send.click();
      }
    });

    let dx, dy, isDown = false;
    title.addEventListener("mousedown", e => {
      isDown = true;
      dx = e.clientX - w.offsetLeft;
      dy = e.clientY - w.offsetTop;
    });
    d.addEventListener("mouseup", () => isDown = false);
    d.addEventListener("mousemove", e => {
      if (isDown) {
        w.style.left = e.clientX - dx + "px";
        w.style.top = e.clientY - dy + "px";
        w.style.right = "auto";
        w.style.bottom = "auto";
      }
    });
  })();
}