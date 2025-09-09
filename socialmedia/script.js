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

document.getElementById("submit").addEventListener("click", submitPost)

// Login function remains mostly unchanged
async function getValidUsers() {
    const TOKEN = CryptoJS.AES.decrypt(
        'U2FsdGVkX1+3BAIDUKTRTKl4X2/ao75PetmZOsJruVRrD5Lvf0pDuFyS5WjWW2I2wLlxUsrsvS9p7XpKiIYXsGpSaYsXaJuIATfjXUaBTp0PjNBnOLolL4jw7IqtIC3xskcCWl0CWK3QXxjP5lAD6g==',
        localStorage.getItem('auth')
    ).toString(CryptoJS.enc.Utf8);

    try {
        const response = await fetch(
            "https://api.github.com/repos/nullmedia-social/userdata/contents/users.json?ref=main",
            {
                headers: {
                    "Authorization": `token ${TOKEN}`,
                    "Accept": "application/vnd.github.v3.raw"
                },
                cache: "no-store"
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("GitHub API error text:", errorText);
            throw new Error(`GitHub API request failed: ${response.status}`);
        }

        const rawData = await response.text();
        let parsed;

        try {
            parsed = JSON.parse(rawData);
        } catch (e) {
            throw new Error("Unable to parse JSON: " + e.message);
        }

        const validUsers = {};

        for (const [username, userInfo] of Object.entries(parsed)) {
            const pfp = userInfo.pfp || "default.png";
            const realNickname = userInfo.realNickname || username;
            const nickname = `<img src="pfps/${pfp}" width="40px" height="40px" style="border-radius: 20px;"> <span style="position: relative; bottom: 11px;">${realNickname}</span>`;

            validUsers[username] = {
                password: userInfo.password,
                nickname,
                realNickname
            };
        }

        return validUsers;
    } catch (error) {
        console.error("Error fetching valid users:", error);
        alert("Unable to verify users. Please try again later.");
        return null;
    }
}
async function login() {
    const TOKEN = CryptoJS.AES.decrypt('U2FsdGVkX1+3BAIDUKTRTKl4X2/ao75PetmZOsJruVRrD5Lvf0pDuFyS5WjWW2I2wLlxUsrsvS9p7XpKiIYXsGpSaYsXaJuIATfjXUaBTp0PjNBnOLolL4jw7IqtIC3xskcCWl0CWK3QXxjP5lAD6g==', localStorage.getItem('auth')).toString(CryptoJS.enc.Utf8);
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Get valid users using the getValidUsers function
    const VALID_USERS = await getValidUsers();

    // Check if the users were fetched successfully
    if (!VALID_USERS) {
        alert("Unable to verify users. Please try again later.");
        return;
    }

    const userData = eval(`VALID_USERS.${username}`)

    // Validate the user and password
    if (!userData || userData.password !== password) {
        alert("Invalid username or password.");
        return;
    }

    // Save login info to localStorage
    localStorage.setItem("user", username);
    localStorage.setItem("password", password);

    alert("Login successful!");
    window.history.back();
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
        if (!userInput) {
            alert("No password entered.");
            window.location.href = "about:blank";
            return;
        }

        const isCorrect = await checkPassword(userInput);
        if (isCorrect) {
            localStorage.setItem("auth", userInput); // store actual password for future validation
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