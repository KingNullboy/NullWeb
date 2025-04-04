console.log("%cHELLO THERE! Don't dare try to hack into other people's accounts. I mean it.", "color: red;");
console.log("%cAlso, you discovered an easter egg! Don't post about it though. Congrats on finding it.", "color: lightgreen;");
console.log("%cOh, you want to make your console.log()s fun too? Just put %c at the beginning of your first argument in the log function\, and in the second argument, put css in quotes for the text\, the same way you'd do a style attribute for an HTML element.", "color: cyan");

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

	let lastFocusedElement = null;

	document.addEventListener('focusin', function(event) {
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
        lastFocusedElement = event.target; // Track the focused element
    }
	});

		// Shared function for adding bold tags
function addBoldTags(isKeybind) {
    if (isKeybind === true) {
        event.preventDefault(); // Prevent default action for keybind
    }

    const activeElement = lastFocusedElement;
	activeElement.focus();
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
    
    const activeElement = lastFocusedElement;
	activeElement.focus();
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
    
    const activeElement = lastFocusedElement;
	activeElement.focus();
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
    
    const activeElement = lastFocusedElement;
	activeElement.focus();
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
    
    const activeElement = lastFocusedElement;
	activeElement.focus();
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
    
    const activeElement = lastFocusedElement;
	activeElement.focus();
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
    
    const activeElement = lastFocusedElement;
	activeElement.focus();
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
			event.preventDefault();
    	    addBoldTags(true);
	    } else if (event.ctrlKey && event.key === 'i') {
			event.preventDefault();
    	    addItalicTags(true);
	    } else if (event.ctrlKey && event.key === 'u') {
			event.preventDefault();
    	    addUnderlineTags(true);
	    } else if (event.ctrlKey && event.shiftKey && event.key === 'C') {
			event.preventDefault();
    	    addCodeBlockTags(true);
	    } else if (event.ctrlKey && event.key === 'k') {
			event.preventDefault();
    	    addLinkTags(true);
	    } else if (event.ctrlKey && event.key === 'q') {
			event.preventDefault();
    	    addBlockquoteTags(true);
	    } else if (event.ctrlKey && event.shiftKey && event.key === 'I') {
			event.preventDefault();
   			addImageTags(true);
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

// Allowed users and their nicknames
const VALID_USERS = {
	"knb2012": { password: "DuckSphere!", nickname: "<img src=\"pfps/knb2012.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">KingNullboy</span>" },
	"dwd2012": { password: "tyrone123", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Dawson</span>" },
	"seth2012": { password: "110311Seth", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Quantompower</span>" },
	"td2012": { password: "mypasswordispassword", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Mr. Myers77</span>" },
	"brybry2012": { password: "billcipheriscousinswithhitler", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Bry</span>" },
	"mlj2016": { password: "marci6266", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Marci</span>" },
	"mk2014": { password: "Jayn-2007", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Marleigh Kate</span>" },
	"lj1981": { password: "Marleigh-14", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Leighan</span>" },
	"mj1970": { password: "redwolf", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Disco Fox</span>" },
	"michaeljackson2011": { password: "moonwalker2011", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Mikey</span>" },
	"max32": { password: "bentleydude", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Bent</span>" },
	"eh2011": { password: "orange-0329", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">E.</span>" },
	"dk1955": { password: "215500", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">KingNullboy's Nana</span>" },
	"jk1958": { password: "005952", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">KingNullboy's Pawpaw</span>" },
	"mb1960": { password: "matt6:33", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">KingNullboy's Aunt</span>" },
	"rb1954": { password: "bologna", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">KingNullboy's Uncle</span>" },
	"coolreid5": { password: "lions&tigers", nickname: "<img src=\"pfps/default.png\" width=\"40px\" height=\"40px\" style=\"border-radius: 20px;\"> <span style=\"position: relative; bottom: 11px;\">Squirt</span>" }
}
  
// List of filtered words (Add words manually)
																										const FILTERED_WORDS = ["fuck", "shit", "bitch", "dick", " ass ", "damn", "what the hell", "gyatt", "rizz", "wtf", "wth", "sigma", "skibidi", "faggot", "whore", "slut", "porn", "asshole", "fuk", "fag", "facebook", "fuc", "danm", "pussy", "cock", "<script>", "</script>", "\\n"];
const ALLOWLIST = ["class", "password", "hello", "passion", "assistant", "massive", "brass", "pass", "sass", "glass"];

function containsFilteredWords(text) {
    // Split the input text into words (use regex to capture words)
    const words = text.split(/\s+/);

    // Iterate through each word in the input text
    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();

        // Skip words in the allowlist (even if they contain bad words)
        if (ALLOWLIST.includes(word)) {
            continue;
        }

        // Check for filtered words within the word
        for (let j = 0; j < FILTERED_WORDS.length; j++) {
            if (word.includes(FILTERED_WORDS[j].toLowerCase())) {
                return true; // Return true if a bad word is found
            }
        }
    }
    return false; // Return false if no bad words are found
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
		  localStorage.setItem("auth", "medialvl");
	  }
  }
	
if (localStorage.getItem("auth") !== "medialvl") {
	  	password("NullMediaCrew-000");
}

function login(username, password) {
	if (!(username in VALID_USERS) && VALID_USERS[username].password !== password) {
		alert("Invalid username or password.");
	} else {
		localStorage.setItem("user", username);
		localStorage.setItem("password", password);
		alert("Logged in!");
		window.history.back();
	}
}

document.addEventListener("DOMContentLoaded", function() {
	const baseUrl = window.location.protocol + "//" + document.domain + "/socialmedia/";
	if ((localStorage.getItem("user") === null || localStorage.getItem("password") === null) && !window.location.href.includes("login.html")) {
		alert("To post, you need to log in.");
		document.getElementById("login").innerHTML = "Login";
		document.getElementById("login").onclick = function() {
   			window.location.href = "login.html";
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

// Function to check for new posts
function checkForNewPosts() {
    const apiUrl = 'https://api.github.com/repos/nullmedia-social/NullWeb/commits';  // GitHub API URL for commits
    var p1 = "github_pat_11BPPK76Y0dNfzx1aglxpH_zEe2p6OqcE1G8F34";
	var p2 = "o2NRwVEeP19fQAQO8QQ1fZ4hDRKHAMKGA5QRDD2sk8Z";
	const TOKEN = p1 + p2;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${TOKEN}`,  // Authentication header
            'Accept': 'application/vnd.github.v3+json'  // Optional: specifies the accepted content type
        }
    })
        .then(response => response.json())
        .then(data => {
            const latestCommit = data[0];  // Get the latest commit
            const lastCheckedCommit = localStorage.getItem('lastCheckedCommit');

            // Check if this commit contains "New post by" in the message
            const commitMessage = latestCommit.commit.message;

            if (commitMessage.includes("New post by") && latestCommit.sha !== lastCheckedCommit) {
                showNotification();  // Show notification if the commit message indicates a new post
                localStorage.setItem('lastCheckedCommit', latestCommit.sha);  // Store the latest commit SHA
            }
        })
        .catch(error => console.error('Error checking for new posts:', error));
}

// Function to show the notification
function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';  // Show the notification

    // Reload the page when the user clicks the button
    document.getElementById('reloadBtn').addEventListener('click', () => {
        location.reload(true);  // Reload the page
    });
}

// Call the function every 15 seconds to check for new posts
setInterval(checkForNewPosts, 5000);  // Checks for new posts every 15 seconds