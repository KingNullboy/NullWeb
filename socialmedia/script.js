function getReplyCountForPost(postTitle) {
    // Find all posts (replies and original posts)
    const allPosts = document.querySelectorAll('article');
  
    let count = 0;
  
    allPosts.forEach(post => {
        const postTitleElement = post.querySelector('h2');
        if (postTitleElement) {
            const link = postTitleElement.querySelector('a'); // Find <a> element inside the h2
            console.log(link);
            if (link && link.getAttribute('href').includes(postTitle)) {  // Check if the link points to the original post
                count += 1;
            }
        }
    });
  
    return count; // Return the count of replies to the original post
}

// Function to generate the title for a reply based on how many replies exist
function getReplyTitle(originalPost) {
    // Get the number of replies for this post
    const replyCount = getReplyCountForPost(originalPost);  // You'll need to create this helper function to count replies
    return `Reply number ${replyCount + 1} in response to <a href='\\${document.domain}/socialmedia#` + originalPost + `' id='link'>` + originalPost + `</a>`;
  }  

var postmode;
var originalpost;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.reply-button').forEach(button => {
        button.addEventListener('click', function() {
            originalpost = this.closest('article').querySelector('h2').innerText;
            postmode = getReplyTitle(originalpost);
            console.log(originalpost);
            window.scrollTo(0, 0);
        });
    });
});

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
  
  function containsFilteredWords(text) {
      for (let i = 0; i < FILTERED_WORDS.length; i++) {
          if (text.toLowerCase().includes(FILTERED_WORDS[i].toLowerCase())) {
              return true;
          }
      }
      return false;
  }
  
  async function updateGitHubFile() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const title = document.getElementById("title").value;
    const postContent = document.getElementById("postContent").value;
  
    // Check for filtered words
  if (containsFilteredWords(title) || containsFilteredWords(postContent)) {
      alert("Your post contains words that are not allowed. Remove them or replace them to post this.\nThe words that are not allowed could include brainrot words.");
      return;
  }
  
    // Validate user credentials
    if (!(username in VALID_USERS) || VALID_USERS[username].password !== password) {
        alert("Invalid username or password.");
        return;
    }
  
    // Get nickname
    const nickname = VALID_USERS[username].nickname;

    const TOKEN = process.env.TOKEN;
  
    // Fetch the current index.html content
    const response = await fetch("index.html");
    if (!response.ok) {
        alert("Failed to fetch the page content.");
        return;
    }
  
    let currentContent = await response.text();
  
    // Locate the <center> tag in the body to insert new posts inside it
    if (postmode === undefined) {
        var updatedContent = currentContent.replace(
            "<button onclick='window.scrollTo(0, 0);'>Go to top</button>\n\t\t</center>",
            "<br><article id='" + originalpost + "'><h1>" + nickname + "</h1><h2>" + title + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png'></button></article>\n\t\t\t<button onclick='window.scrollTo(0, 0);'>Go to top</button>\n\t\t</center>"
        );
    } else {
        var updatedContent = currentContent.replace(
            "<button onclick='window.scrollTo(0, 0);'>Go to top</button>\n\t\t</center>",
            "<br><article id='" + originalpost + "'><h1>" + nickname + "</h1><h2>" + postmode + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png'></button></article><br>\n\t\t\t<button onclick='window.scrollTo(0, 0);'>Go to top</button>\n\t\t</center>"
        );
    }
  
    // GitHub API URL for updating the file
    const githubApiUrl = "https://api.github.com/repos/nullmedia-social/KingNullboys-MiniSocialMedia/contents/socialmedia/index.html";
  
    // Get file SHA for update
    const fileData = await fetch(githubApiUrl, {
        headers: { "Authorization": "token " + TOKEN }
    });
  
    if (!fileData.ok) {
        alert("Failed to retrieve file data.");
        return;
    }
  
    const fileJson = await fileData.json();
  
    // Encode updated content in base64
    const encodedContent = btoa(updatedContent);
  
    // Push the updated content to GitHub
    const updateResponse = await fetch(githubApiUrl, {
        method: "PUT",
        headers: {
            "Authorization": "token " + TOKEN,
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
  
    alert("Post added successfully! Please allow up to 5 minutes for the webpage to update.");
    location.reload();
  }
  
  function password(pswd) {
      let password = prompt("This is a password-protected site. Please enter the password.");
      if (password !== pswd) {
         alert("Incorrect password.");
          window.location = "about:blank";
      } else {
          localStorage.setItem("auth", "true");
      }
  }
  
  if (localStorage.getItem("auth") !== "true") {
      password(process.env.PASSWORD);
  }