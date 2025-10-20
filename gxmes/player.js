document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const which = params.get("which");
	const name = params.get("name");
	const width = params.get("width") || 800;
	const height = params.get("height") || 600;
	const container = document.getElementById("gameFrame").parentNode;
	const saveButton = document.getElementById("saveButton");
	const fullscreenBtn = document.getElementById("fullscreenBtn");

	// Hide save button by default
	saveButton.style.display = "none";

	let gameElement;

	if (which) {
		// Check if it's an external URL
		if (which.startsWith("http://") || which.startsWith("https://")) {
			// Use <object> for external links
			gameElement = document.createElement("object");
			gameElement.data = which;
			gameElement.type = "text/html";
		} else {
			// Use <iframe> for local games
			gameElement = document.createElement("iframe");
			gameElement.src = "/gxmes/" + which;
		}

		gameElement.width = width;
		gameElement.height = height;
		gameElement.id = "gameFrame";
		gameElement.setAttribute("frameborder", "0");
		gameElement.setAttribute("allowfullscreen", "");

		// Replace the existing iframe
		const oldIframe = document.getElementById("gameFrame");
		container.replaceChild(gameElement, oldIframe);
	}

	// Fullscreen functionality with fallback
	fullscreenBtn.addEventListener("click", () => {
		if (gameElement.requestFullscreen) {
			gameElement.requestFullscreen();
		} else if (gameElement.webkitRequestFullscreen) {
			gameElement.webkitRequestFullscreen();
		} else if (gameElement.msRequestFullscreen) {
			gameElement.msRequestFullscreen();
		} else {
			// Fallback: make element fill the window manually
			gameElement.style.position = "fixed";
			gameElement.style.top = 0;
			gameElement.style.left = 0;
			gameElement.style.width = "100vw";
			gameElement.style.height = "100vh";
			gameElement.style.zIndex = 9999;
			gameElement.style.background = "#000";

			// Optional: hide other page content while "fullscreen"
			Array.from(document.body.children).forEach(el => {
				if (el !== gameElement && el !== fullscreenBtn && el !== saveButton) {
					el.style.display = "none";
				}
			});

			// Exit fallback fullscreen on ESC key
			document.addEventListener("keydown", function escListener(e) {
				if (e.key === "Escape") {
					gameElement.style.position = "";
					gameElement.style.top = "";
					gameElement.style.left = "";
					gameElement.style.width = width + "px";
					gameElement.style.height = height + "px";
					gameElement.style.zIndex = "";
					gameElement.style.background = "";

					Array.from(document.body.children).forEach(el => {
						if (el !== gameElement) el.style.display = "";
					});

					document.removeEventListener("keydown", escListener);
				}
			});
		}
	});

	// Update page title if 'name' is provided
	document.title = name ? `${name} — NullG*mes Player` : "NullG*mes Player";

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