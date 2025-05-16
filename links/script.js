function GxmeFiles() {
	alert('This will download the source code for my website. Don\'t use NullMedia from the source code. If this is your first time downloading these files on this computer: After downloading the files, press the meta key (search key on Chromebooks) type in "files", press enter, click the search bar at the top-right, type in "NullWeb", right click (click with 2 fingers) what pops up, click extract, close the files app ONCE, right click the thing that ends in ".zip", and click delete. Then click the other file twice fast, and click any file that you want to open twice fast, and enjoy your games!\nIf you have done this before on this computer: Press the meta key (search key on Chromebooks), type in files, press enter, click the search bar at the top-right, type in "NullWeb", then click the file that pops up twice fast, and click any file that you want to open twice fast, and enjoy your g*mes!');
	window.location.href = 'https://downgit.evecalm.com/#/home?url=https://github.com/nullmedia-social/NullWeb/tree/main/gxmes';
}

async function checkPassword(input) {
	try {
		const response = await fetch("https://nullwebsecurity.netlify.app/.netlify/functions/auth", {
			method: "GET",
			headers: {
				"Script-URL": "https://www.null-web.vastserve.com/links/script.js",
				"X-Password": input
			}
		});
		const result = await response.json();
		return result.correct === true;
	} catch (err) {
		console.error("Failed to verify password:", err);
		return false;
	}
}

async function promptPasswordUntilCorrect() {
	while (true) {
		const userPassword = prompt("This is a password-protected site. Please enter the password.");
		if (!userPassword) {
			alert("No password entered.");
			window.location = "about:blank";
			return;
		}
		const correct = await checkPassword(userPassword);
		if (correct) {
			localStorage.setItem("auth", userPassword);
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

(async () => {
	const verified = await verifyStoredPassword();
	if (!verified) {
		await promptPasswordUntilCorrect();
	}
})();