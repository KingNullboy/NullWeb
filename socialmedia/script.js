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
	return `Reply number ${replyCount + 1} in response to <a href='\\${window.location.href}#` + originalPost + `' id='link'>` + originalPost + `</a>`;
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

	// Function to insert or toggle <b> (Bold), <i> (Italics), <u> (Underline)
  function insertTagAtCursor(tag) {
    var activeElement = document.activeElement;

    // For textareas, we need to handle text manipulation
    if (activeElement.tagName.toLowerCase() === 'textarea' || activeElement.tagName.toLowerCase() === 'input') {
      var cursorPos = activeElement.selectionStart;
      var text = activeElement.value;
      var selectedText = text.substring(activeElement.selectionStart, activeElement.selectionEnd);
      
      // Toggle the selected text by wrapping it in the desired tag
      if (selectedText.length > 0) {
        activeElement.value = text.substring(0, cursorPos) + tag.open + selectedText + tag.close + text.substring(activeElement.selectionEnd);
        activeElement.selectionStart = cursorPos + tag.open.length;
        activeElement.selectionEnd = cursorPos + tag.open.length + selectedText.length;
      } else {
        // If no text is selected, insert the tags at cursor position
        activeElement.value = text.substring(0, cursorPos) + tag.open + tag.close + text.substring(cursorPos);
        activeElement.selectionStart = cursorPos + tag.open.length;
        activeElement.selectionEnd = cursorPos + tag.open.length;
      }
    }
  }

  // Event listener for keydown to check for Ctrl+B, Ctrl+I, and Ctrl+U
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
      if (e.key === 'b') { // Ctrl + B (Bold)
        e.preventDefault();
        insertTagAtCursor({ open: '<b>', close: '</b>' });
      } else if (e.key === 'i') { // Ctrl + I (Italics)
        e.preventDefault();
        insertTagAtCursor({ open: '<i>', close: '</i>' });
      } else if (e.key === 'u') { // Ctrl + U (Underline)
        e.preventDefault();
        insertTagAtCursor({ open: '<u>', close: '</u>' });
      }
    }
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
	"mj1970": { password: "redwolf", nickname: "Disco Fox" },
	"michaeljackson2011": { password: "moonwalker2011", nickname: "Mikey" },
	"max32": { password: "bentleydude", nickname: "Bent" }
}
  
  // List of filtered words (Add words manually)
																										const FILTERED_WORDS = ["fuck", "shit", "bitch", "dick", " ass ", "damn", "hell", "gyatt", "rizz", "wtf", "wth", "sigma", "skibidi", "faggot", "whore", "slut", "porn", "asshole", "fuk", "fag", "facebook", "fuc", "danm", "pussy", "cock"];
  
  function containsFilteredWords(text) {
	  for (let i = 0; i < FILTERED_WORDS.length; i++) {
		  if (text.toLowerCase().includes(FILTERED_WORDS[i].toLowerCase())) {
			  return true;
		  }
	  }
	  return false;
  }
  
  async function updateGitHubFile() {
	var title = document.getElementById("title").value;
	var postContent = document.getElementById("postContent").value;
  
	// Check for filtered words
  if (containsFilteredWords(title) || containsFilteredWords(postContent)) {
	  alert("Your post contains words that are not allowed. Remove them or replace them to post this.\nThe words that are not allowed could include brainrot words.");
	  return;
  }
  
	// Validate user credentials
	if (!(localStorage.getItem("user") in VALID_USERS) || VALID_USERS[localStorage.getItem("user")].password !== localStorage.getItem("password")) {
		alert("Invalid username or password.");
		return;
	}

	if ((title === '' && postmode === undefined) || postContent === '') {
		alert("You need to post something!");
		return;
	}
  
	// Get nickname
	const nickname = VALID_USERS[localStorage.getItem("user")].nickname;

	var p1 = "github_pat_11BPPK76Y0dNfzx1aglxpH_zEe2p6OqcE1G8F34";
	var p2 = "o2NRwVEeP19fQAQO8QQ1fZ4hDRKHAMKGA5QRDD2sk8Z";
	const TOKEN = p1 + p2;
  
	// Fetch the current index.html content
		const response = await fetch(window.location.href);
	if (!response.ok) {
		alert("Failed to fetch the page content.");
		return;
	}
  
	let currentContent = await response.text();
  
	// Locate the <center> tag in the body to insert new posts inside it
	if (postmode === undefined) {
		var updatedContent = currentContent.replace(
			"<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>",
			"<br><article id='" + title + "'><h1>" + nickname + "</h1><h2>" + title + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png'></button></article>\n\t\t\t<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>"
		);
	} else {
		var updatedContent = currentContent.replace(
			"<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>",
			"<br><article id='" + postmode + "'><h1>" + nickname + "</h1><h2>" + postmode + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png'></button></article><br>\n\t\t\t<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>"
		);
	}
  
	// GitHub API URL for updating the file
	if (window.location.href === window.location.protocol + "//" + document.domain + "/socialmedia/") {
		var githubApiUrl = "https://api.github.com/repos/nullmedia-social/NullWeb/contents/socialmedia/index.html";
	} else {
		var githubApiUrl = "https://api.github.com/repos/nullmedia-social/NullWeb/contents/socialmedia/" + window.location.href.replace(window.location.protocol + "//" + document.domain + "/socialmedia/", "");
	}
  
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
	window.location.reload();
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
	  	password("NullMediaCrew-000");
}

function login(username, password) {

	if (!(username in VALID_USERS) && VALID_USERS[username].password !== password) {
		alert("Invalid username or password.");
	} else {
		localStorage.setItem("user", username);
		localStorage.setItem("password", password);
		alert("Logged in!");
		window.location.href = "index.html";
	}
}

document.addEventListener("DOMContentLoaded", function() {
	const baseUrl = window.location.protocol + "//" + document.domain + "/socialmedia/";
	if ((localStorage.getItem("user") === null || localStorage.getItem("password") === null) && !window.location.href.includes("login.html")) {
		alert("To post, you need to log in.");
		document.getElementById("login").innerHTML = "Login";
		document.getElementById("login").onclick = function() {
   			window.history.back();
		};
	}

	if (localStorage.getItem("user") !== null && localStorage.getItem("password") !== null && !window.location.href.includes("login.html")) {
	document.getElementById("login").innerHTML = "Log Out";
	document.getElementById("login").onclick = function() {
		localStorage.removeItem("user");
		localStorage.removeItem("password");
		location.reload();
		}
	};
});