// --- CONFIGURATION ---
const currentUser = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    const loginBtn = document.getElementById('loginBtn');
    const submitBtn = document.getElementById('submit');
    const postArea = document.getElementById('postContent');
    const imageInput = document.getElementById('imageInput');

    if (postsContainer) loadPosts();
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (submitBtn) submitBtn.addEventListener('click', submitPost);

    // --- YOUR ORIGINAL FORMATTING LISTENERS ---
    // Make sure these IDs match your HTML buttons
    document.getElementById('boldBtn')?.addEventListener('click', () => addTags('**', '**'));
    document.getElementById('italicBtn')?.addEventListener('click', () => addTags('*', '*'));
    document.getElementById('underlineBtn')?.addEventListener('click', () => addTags('<u>', '</u>'));
    document.getElementById('codeBlockBtn')?.addEventListener('click', () => addTags('\n```\n', '\n```\n'));
    document.getElementById('linkBtn')?.addEventListener('click', () => addTags('[', '](url)'));
    document.getElementById('blockquoteBtn')?.addEventListener('click', () => addTags('> ', ''));
    document.getElementById('insertImageBtn')?.addEventListener('click', () => imageInput?.click());

    // Image Upload Logic
    if (imageInput && postArea) {
        imageInput.addEventListener('change', async function () {
            const file = this.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            const originalPlaceholder = postArea.placeholder;
            try {
                postArea.placeholder = "Uploading image... please wait.";
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

                const data = await res.json();
                if (data.url) {
                    addTags(`![image](${data.url})`, "", 0);
                } else {
                    alert(data.error || "Upload failed.");
                }
            } catch (err) {
                alert("Server connection failed during upload.");
            } finally {
                postArea.placeholder = originalPlaceholder;
                imageInput.value = "";
            }
        });
    }

    if (postArea) {
        postArea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    const header = document.querySelector('header');
    if (header) {
        const authBtn = document.getElementById("login");

        if (currentUser) {
            authBtn.innerText = "Logout";
            authBtn.onclick = async () => {
                try {
                    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
                } finally {
                    localStorage.clear();
                    window.location.reload();
                }
            };
        } else {
            authBtn.innerText = "Login";
            authBtn.onclick = () => window.location.href = 'login.html';
        }
        header.appendChild(authBtn);
    }
});

// --- CORE FUNCTIONS ---

async function handleLogin() {
    const userVal = document.getElementById('username')?.value;
    const passVal = document.getElementById('password')?.value;
    if (!userVal || !passVal) return alert("Credentials required.");
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userVal, password: passVal }),
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('username', data.username);
            localStorage.setItem('nickname', data.nickname);
            window.location.href = 'index.php';
        } else {
            alert(data.error || "Login failed.");
        }
    } catch (err) { alert("Server connection failed."); }
}

async function loadPosts() {
    const container = document.getElementById('postsContainer');

    // FIXED SUB DETECTION
    const params = new URLSearchParams(window.location.search);
    const sub = params.get('sub') || 'index';

    try {
        const response = await fetch(`/api/posts?sub=${sub}`, { credentials: 'include' });
        if (response.status === 401) {
            container.innerHTML = `<p class="error-msg">[ ACCESS DENIED: PLEASE LOGIN ]</p>`;
            return;
        }
        const data = await response.json();
        if (!data.posts) throw new Error("No posts found");
        container.innerHTML = '';
        data.posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'post-card';
            postElement.id = `post-${post.id}`;
            const cleanHtml = typeof DOMPurify !== 'undefined'
                ? DOMPurify.sanitize(marked.parse(post.content))
                : post.content;
            const isAuthor = currentUser === post.author_username;
            const isAdmin = currentUser === 'knb2012';
            postElement.innerHTML = `
                <div class="post-header">
                    <img src="pfps/${post.pfp}" class="post-pfp" onerror="this.src='pfps/default.png'">
                    <div class="post-meta">
                        <span class="nickname">${post.author_nickname}</span>
                        <span class="username">@${post.author_username} • ${timeAgo(post.timestamp)}</span>
                    </div>
                    ${(isAuthor || isAdmin) ? `<button class="delete-btn" onclick="deletePost('${post.id}')">Delete</button>` : ''}
                </div>
                <h2 class="post-title">${post.title || ''}</h2>
                <div class="post-body">${cleanHtml}</div>
            `;
            container.appendChild(postElement);
        });
    } catch (err) { container.innerHTML = '<p>Failed to load posts.</p>'; }
}

async function submitPost() {
    const title = document.getElementById('title')?.value || "";
    const content = document.getElementById('postContent').value;

    // FIXED SUB DETECTION
    const params = new URLSearchParams(window.location.search);
    const sub = params.get('sub') || 'index';

    if (!content.trim()) return alert("Post content required.");
    try {
        const response = await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, sub }),
            credentials: 'include'
        });
        if (response.ok) { window.location.reload(); }
        else { const err = await response.json(); alert(err.error || "Failed to post."); }
    } catch (e) { alert("Network error."); }
}

async function deletePost(postId) {
    if (!confirm("Confirm record deletion?")) return;
    try {
        const res = await fetch(`/api/post/${postId}`, { method: 'DELETE', credentials: 'include' });
        if (res.ok) {
            const el = document.getElementById(`post-${postId}`);
            if (el) el.remove();
        }
    } catch (err) { alert("Could not delete post."); }
}

function timeAgo(timestamp) {
    const date = new Date(timestamp);
    if (isNaN(date)) return "unknown";
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "just now";
    const intervals = { y: 31536000, mo: 2592000, d: 86400, h: 3600, m: 60 };
    for (let key in intervals) {
        const count = Math.floor(seconds / intervals[key]);
        if (count > 0) return count + key;
    }
}

window.addTags = function (start, end = "", offset = 0) {
    const textarea = document.getElementById('postContent');
    if (!textarea) return;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;
    const replacement = start + text.substring(startPos, endPos) + end;
    textarea.value = text.substring(0, startPos) + replacement + text.substring(endPos);
    textarea.focus();
    const newCursorPos = startPos + replacement.length + offset;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    textarea.dispatchEvent(new Event('input'));
};