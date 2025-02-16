// Allowed users and their nicknames
const VALID_USERS = {
  "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" },
  "dwd2012": { password: "tyrone123", nickname: "Dawson" },
  "seth2011": { password: "110311Seth", nickname: "Quantompower" },
  "td2012": { password: "mypasswordispassword", nickname: "Mr. Myers77" },
  "bry2012": { password: "password", nickname: "Bryleigh" }
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
  const tkn = await fetch("https://nullmedia.infinityfreeapp.com/token.txt");

  // Validate user credentials
  if (!(username in VALID_USERS) || VALID_USERS[username].password !== password) {
      alert("Invalid username or password.");
      return;
  }

  // Get nickname
  const nickname = VALID_USERS[username].nickname;

  try {
      // Fetch the raw content of index.html
      const response = await fetch("index.html");
      const currentContent = await response.text();

      // Locate the <center> tag in the content
      const centerStart = currentContent.indexOf("<center>");
      const centerEnd = currentContent.indexOf("</center>");

      if (centerStart === -1 || centerEnd === -1) {
          throw new Error("<center> element not found in index.html");
      }

      // Extract the content before and after the <center> tag
      const beforeCenter = currentContent.substring(0, centerStart + "<center>".length);
      const afterCenter = currentContent.substring(centerEnd);

      // Construct the new post HTML
      const postHTML = "<article>\n<h1>" + nickname + "</h1><br>\n<h2>" + title + "</h2><br>\n<p>" + postContent + "</p>\n</article>";

      // Combine the before, post, and after content to insert the new post inside the <center> element
      const updatedContent = beforeCenter + "\n" + postHTML + "\n" + afterCenter;

      // 3. Convert the updated content to Base64
      const encodedContent = encodeBase64(updatedContent);

      // 4. Push updated content to GitHub
      const updateResponse = await fetch("https://api.github.com/repos/nullmedia-social/KingNullboys-MiniSocialMedia/contents/index.html", {
          method: "PUT",
          headers: {
              "Authorization": "Bearer " + tkn,
              "Accept": "application/vnd.github+json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              message: "New post by " + nickname,
              content: encodedContent,
              sha: data.sha
          })
      });

      if (!updateResponse.ok) {
          throw new Error("Failed to update file. Status: " + updateResponse.status);
      }

      alert("Post added successfully!");
  } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
  }
}

async function password() {
  const resp = await fetch("https://nullmedia.infinityfreeapp.com/password.txt");
  const Password = await resp.text();
  let password = prompt("This is a password-protected site. Please enter the password.");
  if (password !== Password) {
      alert("Incorrect password.");
      window.location = "about:blank";
  }
}

password();