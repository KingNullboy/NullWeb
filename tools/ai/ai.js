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
    style.textContent = `/* (unchanged style, omitted for brevity — keep your original) */`;
    d.head.appendChild(style);

    const w = d.createElement("div");
    w.id = "groq_chat_wrap";
    w.innerHTML = `<!-- (unchanged HTML structure, also omitted for brevity — keep your original) -->`;
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
    let debug = false;

    function renderMessage(role, content) {
      const div = d.createElement("div");
      div.innerHTML = `<b style="color:${role === "user" ? "#0f0" : role === "system" ? "#ff0" : "#0ff"}">${role === "user" ? "You" : role === "system" ? "System" : "Groq"}:</b><br>${marked.parse(content)}`;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    function updateLog() {
      log.innerHTML = "";
      for (const m of history) {
        renderMessage(m.role, m.content);
      }
    }

    function debugLog(msg) {
      if (debug) renderMessage("system", `[debug] ${msg}`);
    }

    updateLog();

    send.onclick = async () => {
      let q = input.value.trim();
      if (!q) return;
      input.value = "";

      if (firstMessage) {
        history.push({ role: "system", content: "Ready to start chatting! Feel free to use Markdown formatting.\n\nAvailable commands:\n- `/setToken [key]`\n- `/resetToken`\n- `/debug`\n- `/img [prompt]`" });
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
      } else if (q === "/debug") {
        debug = !debug;
        renderMessage("system", `Debug mode ${debug ? "enabled" : "disabled"}.`);
        return;
      } else if (q.startsWith("/img ")) {
        const prompt = q.slice(5);
        renderMessage("user", q);
        renderMessage("system", "Generating image...");
        try {
          const res = await fetch("https://api.deepai.org/api/text2img", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "api-key": "6d271cb7-5741-" + "4a9f-a396-937981e154a4"
            },
            body: new URLSearchParams({ text: prompt })
          });

          if (!res.ok) {
            const err = await res.json();
            if (err.err && err.err.includes("You must add money")) {
              renderMessage("system", "Image generation is currently unavailable because DeepAI requires payment for usage. This is DeepAI's fault, not KingNullboy's. You can supply your own DeepAI key if you have credits.");
            } else {
              renderMessage("system", "Image generation failed: " + (err.err || res.statusText));
            }
            return;
          }

          const json = await res.json();
          if (json.output_url) {
            renderMessage("assistant", `![Image](${json.output_url})`);
          } else {
            renderMessage("system", "No image returned from DeepAI.");
          }
        } catch (e) {
          renderMessage("system", "Network or API error: " + e.message);
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
            model: "llama-3.1-8b-instant",
            messages: history,
            temperature: 0.7
          })
        });

        if (!res.ok) {
          const err = await res.json();
          if (res.status === 429) {
            renderMessage("system", err.error?.message?.includes("rate limit")
              ? "Rate limit exceeded (requests per minute). Try again later."
              : "Daily limit exceeded. Set your own token with /setToken [your_token].");
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