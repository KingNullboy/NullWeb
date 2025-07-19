const SCRIPT_SRC = document.currentScript?.src || "unknown";
console.log("Script URL: ", SCRIPT_SRC);

// Debug thing
console.log(document.currentScript?.src);

console.log("%cHELLO THERE! Don't dare try to hack into other people's accounts. I mean it.", "color: red;");
console.log("%cAlso, you discovered an easter egg! Don't post about it though. Congrats on finding it.", "color: lightgreen;");
console.log("%cOh, you want to make your console.log()s fun too? Just put \%c at the beginning of your first argument in the log function\, and in the second argument, put css in quotes for the text\, the same way you'd do a style attribute for an HTML element.", "color: cyan");

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

if (window.location.href !== window.location.protocol + "//" + document.domain + "/socialmedia/login" && window.location.href !== window.location.protocol + "//" + document.domain + "/socialmedia/login.html") {
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
}
});

async function getValidUsers() {
  const TOKEN = CryptoJS.AES.decrypt(
    'U2FsdGVkX1+COHsM+2s4JjvbAzYWdSq/kQhroxYQhXan2jJsBQG1GMka+VLu18bXJUTpta2zGaARlwA2jrLMQOl2TAw1F7mHpQjrWelpyRkJVYdne/v9k5R1jjHvQzHPX/6Z4ypKjQvUnRvBDid6JQ==',
    localStorage.getItem('auth')
  ).toString(CryptoJS.enc.Utf8);

  try {
    const response = await fetch("https://api.github.com/repos/nullmedia-social/userdata/contents/users.json?ref=main", {
      headers: {
		"User-Agent": "nullmedia-social",
        "Authorization": `token ${TOKEN}`,
        "Accept": "application/vnd.github.v3.raw"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid user data format.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching valid users:", error);
    alert("Unable to verify users. Please try again later.");
    return null;
  }
}

const FILTERED_WORDS = ["fuck", "shit", "bitch", "dick", "ass", "damn", "what the hell", "gyatt", "rizz","wtf", "wth", "sigma", "skibidi", "faggot", "whore", "slut", "porn", "asshole","fuk", "fag", "facebook", "fuc", "danm", "pussy", "cock", "<script", "</script>","\\n", "crapintosh_test"];

// Added a separate dangerous tag & attribute list
const DANGEROUS_TAGS = ["script", "iframe", "object", "embed", "link", "meta", "base"];
const DANGEROUS_ATTRS = ["onerror", "onload", "onmouseover", "onfocus", "onclick", "onmouseenter", "onexit", "onunload", "style", "formaction", "srcdoc"];

const ALLOWLIST = [
  "class", "password", "hello", "passion", "assistant", "massive", "brass", "pass", "sass", "glass"
];

function containsFilteredWords(text) {
    const lowerText = text.toLowerCase();

    // Check allowlist first (full-word match only)
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        if (ALLOWLIST.includes(word)) continue;

        for (let j = 0; j < FILTERED_WORDS.length; j++) {
            if (word.includes(FILTERED_WORDS[j])) {
                return true;
            }
        }
    }

    // Now check for dangerous HTML tags
    for (let tag of DANGEROUS_TAGS) {
        const regex = new RegExp("<\\s*" + tag + "[\\s>]", "i");
        if (regex.test(lowerText)) return true;
    }

    // Check for dangerous attributes like onerror, onclick, etc
    for (let attr of DANGEROUS_ATTRS) {
        const attrRegex = new RegExp(attr + "\\s*=", "i");
        if (attrRegex.test(lowerText)) return true;
    }

    return false;
}
  
  async function updateGitHubFile() {
	var VALID_USERS = await getValidUsers();
	var currentUser = localStorage.getItem("user");
	setTimeout(console.log("Waited 2.5 seconds!"), 2500);
	function escapeQuotesOutsideTags(input) {let inside = false, output = ""; for (let c of input) output += c == "<" ? (inside = true, c) : c == ">" ? (inside = false, c) : !inside && (c == "'" || c == '"') ? (c == "'" ? "&apos;" : "&quot;") : c; return output;}	
	var title = escapeQuotesOutsideTags(document.getElementById("title").value);
	var postContent = escapeQuotesOutsideTags(document.getElementById("postContent").value);
  
	// Check for filtered words
  if (containsFilteredWords(title) || containsFilteredWords(postContent)) {
	  alert("Your post contains words that are not allowed. Remove them or replace them to post this.\nThe words that are not allowed could include brainrot words.");
	  return;
  }
  
	// Validate user credentials
	if ((localStorage.getItem("user") === null) || localStorage.getItem("password") === null) {
		alert("You must log in to post.");
		return;
	}

	if (title === '' && postmode === undefined) {
		alert("You need to post something!");
		return;
	}
  
	// Get nickname
	const nickname = eval(`VALID_USERS.users.${currentUser}.nickname`);
	const realNickname = eval(`VALID_USERS.users.${currentUser}.realNickname`);

	const TOKEN = CryptoJS.AES.decrypt('U2FsdGVkX1+COHsM+2s4JjvbAzYWdSq/kQhroxYQhXan2jJsBQG1GMka+VLu18bXJUTpta2zGaARlwA2jrLMQOl2TAw1F7mHpQjrWelpyRkJVYdne/v9k5R1jjHvQzHPX/6Z4ypKjQvUnRvBDid6JQ==', localStorage.getItem('auth')).toString(CryptoJS.enc.Utf8);

	if (!TOKEN) {
		alert("Failed to fetch token!");
		return;
	}
  
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
			"Authorization": `token ${TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			message: "New post by " + realNickname,
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

async function checkPassword(input) {
	try {
		const response = await fetch("https://nullwebsecurity.netlify.app/.netlify/functions/auth", {
			method: "GET",
			headers: {
				"Script-URL": "https://www.null-web.vastserve.com/socialmedia/script.js",
				"X-Password": input
			}
		});
		const result = await response.json();
		return result.correct === true;
	} catch (error) {
		console.error("Failed to check password:", error);
		return false;
	}
}

async function promptPasswordUntilCorrect() {
	while (true) {
		let userInput = prompt("This is a password-protected site. Please enter the password.");
		if (!userInput) {
			alert("No password entered.");
			window.location.href = "about:blank";
			return;
		}

		const isCorrect = await checkPassword(userInput);
		if (isCorrect) {
			localStorage.setItem("auth", userInput); // store actual password for future validation
			break;
		} else {
			alert("Incorrect password.");
		}
	}
}

async function verifyStoredPassword() {
	const stored = localStorage.getItem("auth");
	if (!stored) return false;
	return await checkPassword(stored);
}

//(async () => {
//	const isValid = await verifyStoredPassword();
//	if (!isValid) {
//		await promptPasswordUntilCorrect();
//	}
//})();

async function login() {
	const TOKEN = CryptoJS.AES.decrypt('U2FsdGVkX1+COHsM+2s4JjvbAzYWdSq/kQhroxYQhXan2jJsBQG1GMka+VLu18bXJUTpta2zGaARlwA2jrLMQOl2TAw1F7mHpQjrWelpyRkJVYdne/v9k5R1jjHvQzHPX/6Z4ypKjQvUnRvBDid6JQ==', localStorage.getItem('auth')).toString(CryptoJS.enc.Utf8);
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	// Get valid users using the getValidUsers function
	const VALID_USERS = await getValidUsers();

	// Check if the users were fetched successfully
	if (!VALID_USERS) {
		alert("Unable to verify users. Please try again later.");
		return;
	}

	const userData = eval(`VALID_USERS.users.${username}`)

	// Validate the user and password
	if (!userData || userData.password !== password) {
		alert("Invalid username or password.");
		return;
	}

	// Save login info to localStorage
	localStorage.setItem("user", username);
	localStorage.setItem("password", password);

	alert("Login successful!");
	window.history.back();
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