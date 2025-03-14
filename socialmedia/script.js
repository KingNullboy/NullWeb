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
	return `Reply number ${replyCount + 1} in response to <a href="${window.location.href}#` + originalPost + `" id="link">` + originalPost + `</a>`;
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

		// Shared function for adding bold tags
function addBoldTags(isKeybind) {
    if (isKeybind === true) {
        event.preventDefault(); // Prevent default action for keybind
    }

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

// Shared function for adding italic tags
function addItalicTags(isKeybind) {
    
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
        const cursorPos = activeElement.selectionStart;
        const textBefore = activeElement.value.substring(0, cursorPos);
        const textAfter = activeElement.value.substring(cursorPos);
        const italicTemplate = '<i></i>';
        activeElement.value = textBefore + italicTemplate + textAfter;
        activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 3;
    }
}

// Shared function for adding underline tags
function addUnderlineTags(isKeybind) {
    
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

// Shared function for adding code block tags
function addCodeBlockTags(isKeybind) {
    
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

// Shared function for adding link tags
function addLinkTags(isKeybind) {
    
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

// Shared function for adding blockquote tags
function addBlockquoteTags(isKeybind) {
    
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

// Shared function for adding image tag
function addImageTags(isKeybind) {
    
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
        const cursorPos = activeElement.selectionStart;
        const textBefore = activeElement.value.substring(0, cursorPos);
        const textAfter = activeElement.value.substring(cursorPos);
        const imageTemplate = '<img src="" width="225px">';
        activeElement.value = textBefore + imageTemplate + textAfter;
        activeElement.selectionStart = activeElement.selectionEnd = cursorPos + 19;
    }
}

// Listen for keydown events for keybinds (Ctrl + key)
document.addEventListener('keydown', function(event) {
	if (document.activeElement.tagName === "TEXTAREA" || document.activeElement.tagName === "INPUT") {
	    if (event.ctrlKey && event.key === 'b') {
    	    addBoldTags(true);
			event.preventDefault();
	    } else if (event.ctrlKey && event.key === 'i') {
    	    addItalicTags(true);
			event.preventDefault();
	    } else if (event.ctrlKey && event.key === 'u') {
    	    addUnderlineTags(true);
			event.preventDefault();
	    } else if (event.ctrlKey && event.shiftKey && event.key === 'c') {
    	    addCodeBlockTags(true);
			event.preventDefault();
	    } else if (event.ctrlKey && event.key === 'k') {
    	    addLinkTags(true);
			event.preventDefault();
	    } else if (event.ctrlKey && event.shiftKey && event.key === 'q') {
    	    addBlockquoteTags(true);
			event.preventDefault();
	    } else if (event.ctrlKey && event.shiftKey && event.key === 'i') {
   			addImageTags(true);
			event.preventDefault();
   		}
	}
});

	// Listen for button clicks for formatting (on mobile and desktop)
	document.getElementById('boldBtn').addEventListener('click', function() {
	    addBoldTags(false);
	});

	document.getElementById('italicBtn').addEventListener('click', function() {
	    addItalicTags(false);
	});

	document.getElementById('underlineBtn').addEventListener('click', function() {
    	addUnderlineTags(false);
	});	

	document.getElementById('codeBlockBtn').addEventListener('click', function() {
	    addCodeBlockTags(false);
	});

	document.getElementById('linkBtn').addEventListener('click', function() {
	    addLinkTags(false);
	});

	document.getElementById('blockquoteBtn').addEventListener('click', function() {
    	addBlockquoteTags(false);
	});

	document.getElementById('insertImageBtn').addEventListener('click', function() {
    	addImageTags(false);
	});
});

document.addEventListener('focusin', function(event) {
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
        document.getElementById("formatBtns").style.display = "block";
    }
});

document.addEventListener('focusout', function(event) {
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
        document.getElementById("formatBtns").style.display = "none";
    }
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
																										const FILTERED_WORDS = ["fuck", "shit", "bitch", "dick", " ass ", "damn", "what the hell", "gyatt", "rizz", "wtf", "wth", "sigma", "skibidi", "faggot", "whore", "slut", "porn", "asshole", "fuk", "fag", "facebook", "fuc", "danm", "pussy", "cock"];
  
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

	if (title === '' && postmode === undefined) {
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
			"<br><article id='" + title + "'><h1>" + nickname + "</h1><h2>" + title + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png'></button></article>\n\t\t<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>"
		);
	} else {
		var updatedContent = currentContent.replace(
			"<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>",
			"<br><article id='" + postmode + "'><h1>" + nickname + "</h1><h2>" + postmode + "</h2><p>" + postContent + "</p><br><button class='reply-button'><img src='reply.png' alt='reply.png'></button></article><br>\n\t\t<button onclick='window.scrollTo(0, 0);' id='scrollBtn'>Go to top</button>\n\t\t</center>"
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