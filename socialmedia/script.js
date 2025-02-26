// Allowed users and their nicknames
const VALID_USERS = {
  "knb2012": { password: "DuckSphere!", nickname: "KingNullboy" },
  "dwd2012": { password: "tyrone123", nickname: "Dawson" },
  "seth2012": { password: "110311Seth", nickname: "Quantompower" },
  "td2012": { password: "mypasswordispassword", nickname: "Mr. Myers77" },
  "brybry2012": { password: "billcipheriscousinswithhitler", nickname: "Bry" },
  "mlj2016": { password: "marci6266", nickname: "Marci" },
  "mk2014": { password: "Jayn-2007", nickname: "Marleigh Kate" },
  "lj1981": { password: "Marleigh-14", nickname: "Leighan" },
  "mj1970": { password: "redwolf", nickname: "Disco Fox" }
};

                                                                                                        // List of filtered words (Add words manually)
                                                                                                        const FILTERED_WORDS = ["fuck", "shit", "bitch", "dick", "ass", "damn", "hell", "gyatt", "rizz", "wtf", "wth", "sigma", "skibidi", "faggot", "whore", "slut", "porn"];

// Declare postmode globally
var postmode;

// Wait for the DOM to load before setting up the event listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Attach event listener to each reply button
    document.querySelectorAll('.reply-button').forEach(button => {
        button.addEventListener('click', function() {
            // When a reply button is clicked, set the global postmode to its parent <article> element
            let postElement = this.closest('article');
            postmode = postElement;  // Set postmode to the clicked post's <article> element

            console.log("Replying to post: ", postElement);
        });
    });

    // Attach the event listener for the submit button
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
        // Check if postmode has been set before submitting
        if (postmode === undefined) {
            alert("Please select a post to reply to.");
            return;
        }

        // Call updateGitHubFile() with the postmode
        updateGitHubFile(postmode);
    });
});

function containsFilteredWords(text) {
    for (let i = 0; i < FILTERED_WORDS.length; i++) {
        if (text.toLowerCase().includes(FILTERED_WORDS[i].toLowerCase())) {
            return true;
        }
    }
}

// Your existing function to update the GitHub file
async function updateGitHubFile(post) {
  // Your existing code here to handle the GitHub file update
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const title = document.getElementById("title").value;
  const postContent = document.getElementById("postContent").value;

  // Check for filtered words
  if (containsFilteredWords(title) || containsFilteredWords(postContent)) {
      alert("Your post contains words that are not allowed. Remove them or replace them to post this.");
      return;
  }

  // Validate user credentials
  if (!(username in VALID_USERS) || VALID_USERS[username].password !== password) {
      alert("Invalid username or password.");
      return;
  }

  const nickname = VALID_USERS[username].nickname;

  // Fetch the current index.html content
  const response = await fetch("index.html");
  if (!response.ok) {
      alert("Failed to fetch the page content.");
      return;
  }

  let currentContent = await response.text();

  // Update the content based on postmode
  if (post === undefined) {
      var updatedContent = currentContent.replace(
            "</center>",
            "\t<br><article><h1>" + nickname + "</h1><h2>" + title + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png' /></button></article>\n\t\t</center>"
      );
  } else {
      var updatedContent = currentContent.replace(
              post,
              post + "\t<br><article id='reply'><h1>" + nickname + "</h1><p>" + postContent + "</p></article>\n\t\t</center>"
      );
  }

  // Fetch GitHub file to get SHA and update
  const githubApiUrl = "https://api.github.com/repos/nullmedia-social/KingNullboys-MiniSocialMedia/contents/socialmedia/index.html";
  const fileData = await fetch(githubApiUrl, {
      headers: { "Authorization": "token " + whole }
  });

  if (!fileData.ok) {
      alert("Failed to retrieve file data.");
      return;
  }

  const fileJson = await fileData.json();

  const encodedContent = btoa(updatedContent);

  const updateResponse = await fetch(githubApiUrl, {
      method: "PUT",
      headers: {
          "Authorization": "token " + whole,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          message: "New post by " + nickname,
          content: encodedContent,
          sha: fileJson.sha
      })
  });

  if (!updateResponse.ok) {
      alert("Failed to update the file.");
      return;
  }

  alert("Post added successfully!");
  location.reload();
}