// Allowed users and their nicknames
const VALID_USERS = {
    "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" },
    "dwd2012": { password: "tyrone123", nickname: "Dawson" },
    "seth2011": { password: "110311Seth", nickname: "Quantompower" },
    "td2012": { password: "mypasswordispassword", nickname: "Mr. Myers77" },
    "bry2012": { password: "password", nickname: "Bryleigh" }
};

// Function to handle Base64 encoding properly (though not needed for this use case)
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
    
    // Get the current page content
    const currentContent = document.body.innerHTML;

    // 1. Append new post with new format using <article> tags
    const updatedContent = currentContent + \n<article>\n<h1>${nickname}</h1><br>\n<h2>${title}</h2><br>\n<p>${postContent}</p>\n</article>;
    
    // 2. Update the page with the new content
    document.body.innerHTML = updatedContent;

    // 3. Optionally, if you want to update GitHub as well, uncomment the following:
    const url = "https://api.github.com/repos/nullmedia-social/KingNullboys-MiniSocialMedia/contents/index.html";
    const GITHUB_TOKEN = 'your_github_token_here';

    const encodedContent = encodeBase64(updatedContent);

    // Push updated content to GitHub (optional)
    const updateResponse = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": Bearer ${GITHUB_TOKEN},
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: New post by ${nickname},
            content: encodedContent,
            sha: data.sha
        })
    });

    if (!updateResponse.ok) {
        throw new Error(Failed to update file. Status: ${updateResponse.status});
    }

    alert("Post added successfully!");
}

function password(pswd) {
    let password = prompt("This is a password-protected site. Please enter the password.")
    if (password !== pswd) {
        alert("Incorrect password.");
        window.location = "about:blank";
    }
}

password("NullMediaCrew-000");