document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const which = params.get("which");
	const name = params.get("name");
	const iframe = document.getElementById("gameFrame");
	const saveButton = document.getElementById("saveButton");
	const fullscreenBtn = document.getElementById("fullscreenBtn");

	// Hide save button by default
	saveButton.style.display = "none";

	// Set iframe source based on whether it's a full URL or a relative path
	if (which && iframe) {
		if (which.startsWith("http://") || which.startsWith("https://")) {
			iframe.src = which;
		} else {
			iframe.src = "/gxmes/" + which;
		}
	}

	// Fullscreen functionality
	fullscreenBtn.addEventListener("click", () => {
		if (iframe.requestFullscreen) {
			iframe.requestFullscreen();
		} else if (iframe.webkitRequestFullscreen) {
			iframe.webkitRequestFullscreen();
		} else if (iframe.msRequestFullscreen) {
			iframe.msRequestFullscreen();
		} else {
			alert("Fullscreen not supported by this browser.");
		}
	});

	// Update page title if 'name' is provided
	if (name !== null) {
		document.title = name + " — NullG*mes Player";
	} else {
		document.title = "NullG*mes Player";
	}

	// Custom save button logic for specific games
	function save(game, how) {
		if (which && which.includes(game)) {
			saveButton.style.display = "inline-block";
			saveButton.setAttribute("onclick", how);
		}
	}

	// Example save configuration for a known game
	save("spacecompany", "document.getElementById('gameFrame').contentWindow.Game.save();");
});