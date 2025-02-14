// Allowed users and their nicknames
const VALID_USERS = {
    "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" }
};

// Function to handle Base64 encoding properly
function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// GitHub API Details
const GITHUB_USERNAME = "nullmedia-social";
const REPO_NAME = "KingNullboys-MiniSocialMedia";
const FILE_PATH = "index.html"; // Make sure this path is correct
const TOKEN = "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"; // Your token

async function updateGitHubFile() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const title = document.getElementById("title").value;
    const postContent = document.getElementById("postContent").value;

    // Validate user credentials
    if (!(username in VALID_USERS) || VALID_USERS[username].password !== password) {
        alert("Invalid username or password.");
        return;
    }

    // Get nickname
    const nickname = VALID_USERS[username].nickname;
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

    try {
        console.log("Fetching existing file data from:", url);

        // 1. Get the current file content and SHA
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });

        if (!response.ok) {
            console.error("GitHub API response:", response);
            throw new Error(`Failed to fetch file data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched file data:", data);

        if (!data.content || !data.sha) {
            throw new Error("Invalid file data received from GitHub.");
        }

        // Decode base64 content
        let currentContent = atob(data.content);

        // 2. Append new post with new format
        let updatedContent = `${currentContent}\n<article>\n<h1>${nickname}</h1><br>\n<h2>${title}</h2><br>\n<p>${postContent}</p>\n</article>`;

        // 3. Convert back to Base64
        const encodedContent = encodeBase64(updatedContent);

        console.log("Encoded updated content:", encodedContent);

        // 4. Push updated content to GitHub
        const updateResponse = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `New post by ${nickname}`,
                content: encodedContent,
                sha: data.sha
            })
        });

        if (!updateResponse.ok) {
            console.error("GitHub API update response:", updateResponse);
            throw new Error(`Failed to update file. Status: ${updateResponse.status}`);
        }

        alert("Post added successfully!");
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}
