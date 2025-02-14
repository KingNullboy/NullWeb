// Allowed users and their nicknames
const VALID_USERS = {
    "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" }
};

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

    const GITHUB_USERNAME = "nullmedia-social"; // Change to your GitHub username
    const REPO_NAME = "KingNullboys-MiniSocialMedia"; // Change to your repository name
    const FILE_PATH = "blob/main/index.html"; // Path of the file in the repo
    const TOKEN = "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"; // Replace with your GitHub personal access token

    const url = "https://api.github.com/${GITHUB_USERNAME}/${REPO_NAME}/${FILE_PATH}";

    try {
        // 1. Get the current file content and SHA
        const response = await fetch(url, {
            headers: { "Authorization": `token ${TOKEN}` }
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

        // 2. Append new post with new format using <article> tags
        let updatedContent = currentContent + `\n<article>\n<h1>${nickname}</h1><br>\n<h2>${title}</h2><br>\n<p>${postContent}</p>\n</article>`;

        // 3. Convert back to base64
        const encodedContent = btoa(updatedContent);

        // 4. Push updated content to GitHub
        const updateResponse = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `New post by ${nickname}`,
                content: encodedContent,
                sha: data.sha
            })
        });

        if (!updateResponse.ok) {
            throw new Error("Failed to update file");
        }

        alert("Post added successfully!");
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}
