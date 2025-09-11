const SCRIPT_SRC = document.currentScript?.src || "unknown";
console.log("Script URL: ", SCRIPT_SRC);
console.log(document.currentScript?.src);
console.log("%cHELLO THERE! Don't dare try to hack into other people's accounts. I mean it.", "color: red;");
console.log("%cAlso, you discovered an easter egg! Don't post about it though. Congrats on finding it.", "color: lightgreen;");
console.log("%cOh, you want to make your console.log()s fun too? Just put \%c at the beginning of your first argument in the log function, and in the second argument, put css in quotes for the text, the same way you'd do a style attribute for an HTML element.", "color: cyan");

function getReplyCountForPost(postTitle) {
    const allPosts = document.querySelectorAll('article');
    let count = 0;
    allPosts.forEach(post => {
        const postTitleElement = post.querySelector('h2');
        if (postTitleElement) {
            const link = postTitleElement.querySelector('a');
            if (link && link.getAttribute('href').includes(postTitle)) count += 1;
        }
    });
    return count;
}

function getReplyTitle(originalPost) {
    const replyCount = getReplyCountForPost(originalPost);
    return `Reply number ${replyCount + 1} in response to <a href="${window.location.href}#` + originalPost + `" id="link">` + originalPost + `</a>`;
}

var postmode;
var originalpost;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.reply-button').forEach(button => {
        button.addEventListener('click', function () {
            originalpost = this.closest('article').querySelector('h2').innerText;
            postmode = getReplyTitle(originalpost);
            window.scrollTo(0, 0);
        });
    });

    let lastFocusedElement = null;
    document.addEventListener('focusin', function (event) {
        if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') lastFocusedElement = event.target;
    });

    // Text formatting functions
    function addTags(template, cursorOffset) {
        const activeElement = lastFocusedElement;
        if (!activeElement) return;
        activeElement.focus();
        const cursorPos = activeElement.selectionStart;
        const textBefore = activeElement.value.substring(0, cursorPos);
        const textAfter = activeElement.value.substring(cursorPos);
        activeElement.value = textBefore + template + textAfter;
        activeElement.selectionStart = activeElement.selectionEnd = cursorPos + cursorOffset;
    }

    const formattingButtons = {
        boldBtn: ['<b></b>', 3],
        italicBtn: ['<i></i>', 3],
        underlineBtn: ['<u></u>', 3],
        codeBlockBtn: ['<pre><code></code></pre>', 13],
        linkBtn: ['<a href="">[your title here]</a>', 9],
        blockquoteBtn: ['<blockquote></blockquote>', 12],
        insertImageBtn: ['<img src="" width="225px">', 19]
    };

    Object.keys(formattingButtons).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => addTags(...formattingButtons[id]));
    });

    // Keybinds
    document.addEventListener('keydown', function (event) {
        if (!lastFocusedElement) return;
        if (!(lastFocusedElement.tagName === "TEXTAREA" || lastFocusedElement.tagName === "INPUT")) return;

        if (event.ctrlKey && !event.shiftKey) {
            switch (event.key) {
                case 'b': event.preventDefault(); addTags('<b></b>', 3); break;
                case 'i': event.preventDefault(); addTags('<i></i>', 3); break;
                case 'u': event.preventDefault(); addTags('<u></u>', 3); break;
                case 'k': event.preventDefault(); addTags('<a href="">[your title here]</a>', 9); break;
                case 'q': event.preventDefault(); addTags('<blockquote></blockquote>', 12); break;
            }
        } else if (event.ctrlKey && event.shiftKey) {
            switch (event.key) {
                case 'C': event.preventDefault(); addTags('<pre><code></code></pre>', 13); break;
                case 'I': event.preventDefault(); addTags('<img src="" width="225px">', 19); break;
            }
        }
    });
});

const FILTERED_WORDS = ["fuck", "shit", "bitch", "dick", "ass", "damn", "what the hell", "gyatt", "rizz", "wtf", "wth", "sigma", "skibidi", "faggot", "whore", "slut", "porn", "asshole", "fuk", "fag", "facebook", "fuc", "danm", "pussy", "cock", "\\n", "crapintosh_test"];
const DANGEROUS_TAGS = ["script", "iframe", "object", "embed", "link", "meta", "base"];
const DANGEROUS_ATTRS = ["onerror", "onload", "onmouseover", "onfocus", "onclick", "onmouseenter", "onexit", "onunload", "style", "formaction", "srcdoc"];
const ALLOWLIST = ["class", "password", "hello", "passion", "assistant", "massive", "brass", "pass", "sass", "glass"];

function containsFilteredWords(text) {
    const lowerText = text.toLowerCase();
    const words = text.split(/\s+/);
    for (let word of words) {
        if (ALLOWLIST.includes(word)) continue;
        if (FILTERED_WORDS.some(fw => word.includes(fw))) return true;
    }
    for (let tag of DANGEROUS_TAGS) if (new RegExp("<\\s*" + tag + "[\\s>]", "i").test(lowerText)) return true;
    for (let attr of DANGEROUS_ATTRS) if (new RegExp(attr + "\\s*=", "i").test(lowerText)) return true;
    return false;
}

async function submitPost() {
    const username = localStorage.getItem("user");
    const password = localStorage.getItem("password");
    const title = document.getElementById("title")?.value || postmode || "Untitled";
    const content = document.getElementById("postContent")?.value || "";

    if (!username || !password) {
        alert("You must log in to post.");
        return;
    }

    if (!title && !content) {
        alert("You need to post something!");
        return;
    }

    if (containsFilteredWords(title) || containsFilteredWords(content)) {
        alert("Your post contains forbidden words or tags.");
        return;
    }

    try {
        // Call the Netlify function
        const response = await fetch("https://nullapis.netlify.app/.netlify/functions/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                title,
                content,
                postmode
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Post submitted successfully! Please allow a few moments for it to appear.");
            window.location.reload();
        } else {
            alert("Failed to submit post: " + (result.message || "Unknown error"));
        }

    } catch (err) {
        console.error("Error posting:", err);
        alert("An error occurred while submitting the post.");
    }
}

document.addEventListener("DOMContentLoaded", () => document.getElementById("submit").addEventListener("click", submitPost));

async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch("https://nullapis.netlify.app/.netlify/functions/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.status === 200 && result.message === "Login successful") {
            localStorage.setItem("user", username);
            localStorage.setItem("password", password)
            alert("Login successful!");
            window.history.back();
        } else {
            alert("Login failed: " + (result.error || "Unknown error"));
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred while logging in.");
    }
}

async function checkPassword(input) {
    try {
        const response = await fetch("https://nullapis.netlify.app/.netlify/functions/auth", {
            method: "GET",
            headers: {
                "Script-URL": "https://www.null-web.vastserve.com/socialmedia/script.js",
                "X-Password": input
            }
        });
        const result = await response.json();
        return result.correct === true;
    } catch (error) {
        console.error("Failed to check password:", error);
        return false;
    }
}
async function verifyStoredPassword() {
	const stored = localStorage.getItem("auth");
	if (!stored) return false;
	return await checkPassword(stored);
}
async function promptPasswordUntilCorrect() {
    while (true) {
        let userInput = prompt("This is a password-protected site. Please enter the password.");

        const isCorrect = await checkPassword(userInput);
        if (isCorrect) {
            localStorage.setItem("auth", userInput);
            break;
        } else {
            alert("Incorrect password.");
        }
    }
}
(async () => { const isValid = await verifyStoredPassword(); if (!isValid) await promptPasswordUntilCorrect(); })();

// Update login/logout button logic
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login");
    if (!loginBtn) return;
    if (!localStorage.getItem("user") || !localStorage.getItem("password")) {
        loginBtn.innerHTML = "Login";
        loginBtn.onclick = () => { window.location.href = "login.html"; };
    } else {
        loginBtn.innerHTML = "Log Out";
        loginBtn.onclick = () => { localStorage.removeItem("user"); localStorage.removeItem("password"); location.reload(); };
    }
});

async function loadPosts() {
    const container = document.createElement('div');
    container.id = 'postsContainer';
    document.body.appendChild(container);

    try {
        const response = await fetch("https://nullapis.netlify.app/.netlify/functions/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sub: window.location.href.replace(window.location.protocol+"//"+document.domain+"/socialmedia/", "").replace(".html", "").replace("about:srcdoc", "index") || "index" })
        });

        const data = await response.json();
        const posts = data.posts || [];

        container.innerHTML = '';

        posts.forEach(post => {
            const article = document.createElement('article');
            article.id = post.title;
            article.innerHTML = `
                <h1><img src="${post.pfp || 'pfps/default.png'}" width="40" height="40" style="border-radius: 20px;">
                    <span style="position: relative; bottom: 11px;">${post.author}</span>
                </h1>
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <br>
                <button class="reply-button"><img src='reply.png' alt='reply' /></button>
            `;
            container.appendChild(article);
        });

        document.querySelectorAll('.reply-button').forEach(button => {
            button.addEventListener('click', function () {
                originalpost = this.closest('article').querySelector('h2').innerText;
                postmode = getReplyTitle(originalpost);
                window.scrollTo(0, 0);
            });
        });

    } catch (err) {
        console.error("Error loading posts:", err);
        container.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);