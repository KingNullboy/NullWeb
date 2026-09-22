document.addEventListener("DOMContentLoaded", async () => {
    const d = document;

    // --- UI Elements ---
    const log = d.getElementById("groq_log");
    const input = d.getElementById("groq_input");
    const send = d.getElementById("send_btn");
    const clear = d.getElementById("clear_btn");
    const selector = d.getElementById("groq_chat_selector");

    // --- Configuration ---
    const NICO_ENDPOINT = "/tools/ai/nico/";
    const OLLAMA_ENDPOINT = "/api/ollama/api/chat"; // Standard Ollama chat completions route
    const OLLAMA_MODEL = "qwen2.5:1.5b";

    // --- State ---
    let currentChat = selector ? selector.value : "1";
    let isNicoMode = false;
    let debugEnabled = false;

    // Nico Specific State
    let nicoTemp = 0.5;
    let nicoHiddenSize = 128;
    let nicoVersion = "v1";

    // --- Helpers ---
    const loadHistory = (chatNum) => JSON.parse(localStorage.getItem(`chat_history_${chatNum}`)) || [];
    const saveHistory = (chatNum, hist) => localStorage.setItem(`chat_history_${chatNum}`, JSON.stringify(hist));
    const getImgToken = () => localStorage.getItem("deepai_token");

    let history = loadHistory(currentChat);
    let imgToken = getImgToken();

    function renderMessage(role, content) {
        const div = d.createElement("div");
        div.className = `msg-${role}`;
        
        let label = "System", color = "#ff0";
        if (role === "user") { 
            label = "You"; 
            color = "#0f0"; 
        } else if (role === "assistant") {
            label = isNicoMode ? "Nico" : "Qwen";
            color = isNicoMode ? "#ff6b6b" : "#0ff";
        }

        div.innerHTML = `<b style="color:${color}">${label}:</b><br>${marked.parse(content)}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }

    function updateLog() {
        log.innerHTML = "";
        if (isNicoMode) {
            renderMessage("system", `--- Nico Mode Active [${nicoVersion} | HS:${nicoHiddenSize}] ---`);
        } else {
            history.forEach(m => renderMessage(m.role, m.content));
        }
    }

    // --- Command Logic ---
    const commands = {
        "/nico on": () => { isNicoMode = true; updateLog(); },
        "/nico off": () => { isNicoMode = false; updateLog(); },
        "/debug": () => { debugEnabled = !debugEnabled; renderMessage("system", `Debug: ${debugEnabled}`); },
        "/temp": (val) => {
            let t = parseFloat(val);
            if (!isNaN(t) && t >= 0 && t <= 2) { nicoTemp = t; renderMessage("system", `Temp: ${t}`); }
        },
        "/hs": (val) => {
            let hs = parseInt(val);
            if (!isNaN(hs)) { nicoHiddenSize = hs; renderMessage("system", `Hidden Size: ${hs}`); }
        },
        "/version": (val) => {
            if (!val) return;
            nicoVersion = val.startsWith("v") ? val : "v" + val;
            renderMessage("system", `Corpus Version: ${nicoVersion}`);
        }
    };

    // --- Main Actions ---
    send.onclick = async () => {
        const q = input.value.trim();
        if (!q) return;
        input.value = "";

        // Check for commands
        const [cmd, ...args] = q.split(" ");
        if (commands[q]) { commands[q](); return; }
        if (commands[cmd]) { commands[cmd](args.join(" ")); return; }

        if (q.startsWith("/img ")) { handleImageRequest(q.slice(5)); return; }

        renderMessage("user", q);

        if (isNicoMode) {
            try {
                const res = await fetch(NICO_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: q,
                        temperature: nicoTemp,
                        hidden_size: nicoHiddenSize,
                        version: nicoVersion
                    })
                });
                const data = await res.json();
                renderMessage("assistant", data.reply || "...");
            } catch (e) {
                renderMessage("system", `Nico Error: ${e.message}`);
            }
        } else {
            history.push({ role: "user", content: q });
            try {
                const res = await fetch(OLLAMA_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: OLLAMA_MODEL,
                        messages: history,
                        stream: false
                    })
                });

                if (!res.ok) {
                    throw new Error(`Ollama Server returned ${res.status}`);
                }

                const json = await res.json();
                const reply = json.message?.content || "No response received.";
                
                history.push({ role: "assistant", content: reply });
                saveHistory(currentChat, history);
                renderMessage("assistant", reply);
            } catch (e) {
                renderMessage("system", `Ollama Error: ${e.message}`);
            }
        }
    };

    async function handleImageRequest(prompt) {
        if (!imgToken) return renderMessage("system", "Missing DeepAI token.");
        try {
            const res = await fetch("https://api.deepai.org/api/text2img", {
                method: "POST",
                headers: { "api-key": imgToken },
                body: new URLSearchParams({ text: prompt })
            });
            const data = await res.json();
            if (data.output_url) renderMessage("assistant", `![Image](${data.output_url})`);
        } catch (e) { renderMessage("system", `Img Error: ${e.message}`); }
    }

    // --- Events ---
    if (selector) {
        selector.onchange = () => {
            if (isNicoMode) return;
            saveHistory(currentChat, history);
            currentChat = selector.value;
            history = loadHistory(currentChat);
            updateLog();
        };
    }

    clear.onclick = () => {
        if (confirm("Clear history?")) {
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

    updateLog();
});
