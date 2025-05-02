if (location.hostname.includes("nullweb.byethost6.com")) {
    alert("Groq Chat cannot be used on this site.");
    throw new Error("Blocked on this domain");
  }
  
  (async () => {
    const d = document;
    if (d.getElementById("groq_chat_wrap")) return;
  
    const s = d.createElement("style");
    s.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
  
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
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
  }
  
  #groq_title {
    background: #000;
    padding: 10px 15px;
    cursor: move;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #fff;
    user-select: none;
  }
  
  #groq_title span {
    font-weight: bold;
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
  
  #groq_log div {
    margin-bottom: 10px;
  }
  
  #groq_log b {
    color: #0f0;
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
  
  pre {
    background: #222;
    padding: 8px;
    border-radius: 5px;
    font-family: "Space Mono", monospace;
    white-space: pre-wrap;
    overflow-x: auto;
  }
  
  code {
    background: #222;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: "Space Mono", monospace;
  }
  `;
    d.head.appendChild(s);
  
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
        <button id="groq_clear">Delete History</button>
      </div>
    `;
    d.body.appendChild(w);
  
    let h = JSON.parse(localStorage.groq_history || "[]");
    let firstMessage = true;
  
    const log = w.querySelector("#groq_log"),
          input = w.querySelector("#groq_input"),
          send = w.querySelector("#groq_send"),
          clear = w.querySelector("#groq_clear"),
          min = w.querySelector("#groq_min"),
          close = w.querySelector("#groq_close"),
          title = w.querySelector("#groq_title");
  
    function markdownToHTML(md) {
      md = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      for (let i = 6; i > 0; i--) {
        let re = new RegExp('^' + '#'.repeat(i) + ' (.+)$', 'gm');
        md = md.replace(re, `<h${i}>$1</h${i}>`);
      }

      md = md.replace(/^\s*---\s*$/gm, '<hr>');
      md = md.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
      md = md.replace(/^\d+\. (.+)$/gm, '<ol><li>$1</li></ol>');
      md = md.replace(/<\/ol>\n<ol>/g, '');
      md = md.replace(/^[-*] (.+)$/gm, '<ul><li>$1</li></ul>');
      md = md.replace(/<\/ul>\n<ul>/g, '');

      md = md.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
      md = md.replace(/\*(.+?)\*/g, '<i>$1</i>');
      md = md.replace(/__(.+?)__/g, '<u>$1</u>');
      md = md.replace(/~~(.+?)~~/g, '<s>$1</s>');

      md = md.replace(/`([^`]+?)`/g, '<code>$1</code>');
      md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
      md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%;">');

      md = md.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
      return md.replace(/\n/g, '<br>');
    }
  
    function updateLog() {
      log.innerHTML = h.map(m => `
        <div>
          <b>${m.role === "user" ? "You" : "Groq"}:</b><br>
          ${markdownToHTML(m.content)}
        </div>
      `).join("");
      log.scrollTop = log.scrollHeight;
    }
  
    updateLog();
  
    send.onclick = async () => {
      let q = input.value.trim();
      if (!q) return;
      input.value = "";
      if (firstMessage) {
        q = "Never use 3 backticks consecutively. Instead use 2 backticks.\n" + q;
        firstMessage = false;
      }
      h.push({ role: "user", content: q });
      updateLog();
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: h,
          temperature: 0.7
        })
      });
      const data = await res.json();
      const a = data.choices?.[0]?.message?.content?.trim() || "No response";
      h.push({ role: "assistant", content: a });
      localStorage.groq_history = JSON.stringify(h);
      updateLog();
    };
  
    clear.onclick = () => {
      if (confirm("Clear chat history?")) {
        h = [];
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