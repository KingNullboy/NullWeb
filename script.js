// Allowed users and their nicknames
const VALID_USERS = {
    "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" }
};

// Function to handle Base64 encoding properly
function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

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
    const url = "https://api.github.com/repos/nullmedia-social/KingNullboys-MiniSocialMedia/contents/index.html";

    try {
        // 1. Get the current file content and SHA
        const response = await fetch(url, {
            headers: { "Authorization": "Bearer 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" }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch file data");
        }

        const data = await response.json();

        if (!data.content || !data.sha) {
            throw new Error("Invalid file data received");
        }

        // Decode base64 content
        let currentContent = atob(data.content);
        console.log("Current Content (Decoded):", currentContent);  // Log the current content

        // 2. Append new post with new format using <article> tags
        let updatedContent = currentContent + `\n<article>\n<h1>${nickname}</h1><br>\n<h2>${title}</h2><br>\n<p>${postContent}</p>\n</article>`;

        // 3. Convert updated content back to Base64
        const encodedContent = encodeBase64(updatedContent);
        console.log("Updated Content (Base64 Encoded):", encodedContent);  // Log the encoded content

        // 4. Push updated content to GitHub
        const updateResponse = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `New post by ${nickname}`,
                content: encodedContent,
                sha: data.sha
            })
        });

        const updateResponseJson = await updateResponse.json();
        console.log("GitHub Response (Update):", updateResponseJson);  // Log the response from the GitHub API

        if (!updateResponse.ok) {
            throw new Error("Failed to update file");
        }

        alert("Post added successfully!");
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}
