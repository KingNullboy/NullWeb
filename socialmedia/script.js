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

	document.addEventListener('keydown', function(event) {
		// Check if Ctrl + Enter is pressed
		if (event.ctrlKey && event.key === 'Enter') {
			event.preventDefault(); // Prevent the default action (such as a page refresh)
			
			// Find the submit button and click it
			const submitButton = document.querySelector('#submitButton'); // Change this to your submit button's ID
			if (submitButton) {
				submitButton.click(); // Simulate clicking the submit button
			}
		}
	
		// Check if Ctrl + B is pressed (Bold)
		if (event.ctrlKey && event.key === 'b') {
			event.preventDefault();
			const activeElement = document.activeElement;
			if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
				const cursorPos = activeElement.selectionStart;
				const textBefore = activeElement.value.substring(0, cursorPos);
				const textAfter = activeElement.value.substring(cursorPos);
				const boldTemplate = '<b></b>';
				activeElement.value = textBefore + boldTemplate + textAfter;
				activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 3;
			}
		}
	
		// Check if Ctrl + I is pressed (Italics)
		if (event.ctrlKey && event.key === 'i') {
			event.preventDefault();
			const activeElement = document.activeElement;
			if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
				const cursorPos = activeElement.selectionStart;
				const textBefore = activeElement.value.substring(0, cursorPos);
				const textAfter = activeElement.value.substring(cursorPos);
				const italicsTemplate = '<i></i>';
				activeElement.value = textBefore + italicsTemplate + textAfter;
				activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 3;
			}
		}
	
		// Check if Ctrl + U is pressed (Underline)
		if (event.ctrlKey && event.key === 'u') {
			event.preventDefault();
			const activeElement = document.activeElement;
			if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
				const cursorPos = activeElement.selectionStart;
				const textBefore = activeElement.value.substring(0, cursorPos);
				const textAfter = activeElement.value.substring(cursorPos);
				const underlineTemplate = '<u></u>';
				activeElement.value = textBefore + underlineTemplate + textAfter;
				activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 3;
			}
		}
	
		// Check if Ctrl + Shift + C is pressed (Code Block)
		if (event.ctrlKey && event.shiftKey && event.key === 'C') {
			event.preventDefault();
			const activeElement = document.activeElement;
			if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
				const cursorPos = activeElement.selectionStart;
				const textBefore = activeElement.value.substring(0, cursorPos);
				const textAfter = activeElement.value.substring(cursorPos);
				const codeBlockTemplate = '<pre><code></code></pre>';
				activeElement.value = textBefore + codeBlockTemplate + textAfter;
				activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 13;
			}
		}
	
		// Check if Ctrl + K is pressed (Hyperlink)
		if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
			const activeElement = document.activeElement;
			if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
				const cursorPos = activeElement.selectionStart;
				const textBefore = activeElement.value.substring(0, cursorPos);
				const textAfter = activeElement.value.substring(cursorPos);
				const linkTemplate = '<a href="">[your title here]</a>';
				activeElement.value = textBefore + linkTemplate + textAfter;
				activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 9;
			}
		}
	
		// Check if Ctrl + Shift + Q is pressed (Blockquote)
		if (event.ctrlKey && event.shiftKey && event.key === 'Q') {
			event.preventDefault();
			const activeElement = document.activeElement;
			if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
				const cursorPos = activeElement.selectionStart;
				const textBefore = activeElement.value.substring(0, cursorPos);
				const textAfter = activeElement.value.substring(cursorPos);
				const blockquoteTemplate = '<blockquote></blockquote>';
				activeElement.value = textBefore + blockquoteTemplate + textAfter;
				activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 12;
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