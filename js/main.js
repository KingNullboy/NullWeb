document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
      let adScript = document.createElement("script");
      adScript.setAttribute("data-cfasync", "false");
      adScript.setAttribute("type", "text/javascript");
      adScript.src = "/adType1.js";
      let adScript2 = document.createElement("script");
      adScript.setAttribute("data-cfasync", "false");
      adScript.setAttribute("type", "text/javascript");
      adScript.src = "https://offfurreton.com/400/9145743";
  
      document.head.appendChild(adScript);
      document.head.appendChild(adScript2);
  
      let currentURL = window.location.href;
      let baseURL = window.location.protocol + "//" + document.domain + "/";
      let indexURLs = [baseURL, baseURL + "index", baseURL + "index.html"];
  
      let extraScript = document.createElement("script");
      extraScript.setAttribute("data-cfasync", "false");
      extraScript.setAttribute("type", "text/javascript");
      extraScript.src = "/adType2.js";
      extraScript.setAttribute("async", "true");
  
      document.head.appendChild(extraScript);
    }
  });
  
  async function updateAnalytics() {
    // GitHub token
    var p1 = "github_pat_11BPPK76Y0dNfzx1aglxpH_zEe2p6OqcE1G8F34";
    var p2 = "o2NRwVEeP19fQAQO8QQ1fZ4hDRKHAMKGA5QRDD2sk8Z";
    const TOKEN = p1 + p2;
  
    // GitHub repository info
    const owner = "nullmedia-social"; // Your GitHub username
    const repo = "NullWeb"; // Your repository name
    const filePath = "analytics.txt"; // Path to the file you want to update
  
    // GitHub API URL for fetching the file
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  
    // Fetch current file content
    const response = await fetch(githubApiUrl, {
      headers: { "Authorization": `token ${TOKEN}` }
    });
    if (!response.ok) {
      return; // Stop execution if the file fetch fails
    }
  
    const fileData = await response.json();
    const fileContent = atob(fileData.content); // Decode the base64 content
  
    // Use regex to extract view and user numbers
    const viewRegex = /_\[(\d+)\]_/;
    const usersRegex = /__\[(\d+)\]__/;
  
    const viewMatch = fileContent.match(viewRegex);
    const usersMatch = fileContent.match(usersRegex);
  
    if (!viewMatch || !usersMatch) {
      return; // Stop execution if the file content doesn't match the expected format
    }
  
    // Extract numbers
    let viewCount = parseInt(viewMatch[1], 10);
    let userCount = parseInt(usersMatch[1], 10);
  
    // Increment the view count
    viewCount++;
  
    // Increment the user count if it's the user's first visit
    if (localStorage.getItem("hasVisited") === null) {
      userCount++;
      localStorage.setItem("hasVisited", "true");
    }
  
    // Rebuild the file content with updated counts
    const updatedContent = fileContent.replace(viewRegex, `_[${viewCount}]_`)
                                       .replace(usersRegex, `__[${userCount}]__`);
  
    // Encode the updated content back to base64
    const encodedContent = btoa(updatedContent);
  
    // Update the file on GitHub
    const updateResponse = await fetch(githubApiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `token ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update analytics counts",
        content: encodedContent,
        sha: fileData.sha // Provide the SHA to update the file
      })
    });
  
    if (!updateResponse.ok) {
      return; // Stop execution if the file update fails
    }
  }
  
  updateAnalytics();  