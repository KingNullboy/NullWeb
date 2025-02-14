// Allowed users and their nicknames
const VALID_USERS = {
    "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" }
};

// Function to handle Base64 encoding properly
function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// Function to handle Base64 decoding properly
function decodeBase64(str) {
    return decodeURIComponent(escape(atob(str)));
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
    const repoOwner = "nullmedia-social"; // GitHub username/organization
    const repoName = "KingNullboys-MiniSocialMedia"; // Repository name
    const filePath = "index.html"; // File path
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const token = "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";

    try {
        // Step 2: Fetch the current file data
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch file data. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.content || !data.sha) {
            throw new Error("Invalid file data received");
        }

        // Decode the current file content
        let currentContent = decodeBase64(data.content);

        // Step 3 & 5: Append new post and update file
        let updatedContent = currentContent + `
<article>
    <h1>${nickname}</h1><br>
    <h2>${title}</h2><br>
    <p>${postContent}</p>
</article>`;

        const encodedContent = encodeBase64(updatedContent);

        // Step 4: Update the file in the GitHub repository
        const updateResponse = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `New post by ${nickname}`,
                content: encodedContent,
                sha: data.sha
            })
        });

        if (!updateResponse.ok) {
            throw new Error(`Failed to update file. Status: ${updateResponse.status}`);
        }

        alert("Post added successfully!");
    } catch (error) {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
    }
}
