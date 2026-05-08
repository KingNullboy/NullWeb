document.addEventListener("DOMContentLoaded", () => {
	// =========================
	// URL Params
	// =========================

	const params = new URLSearchParams(window.location.search);

	let which = params.get("which") || "";
	let name = params.get("name") || "Unknown G*me";

	const width = parseInt(params.get("width") || "800", 10);
	const height = parseInt(params.get("height") || "600", 10);

	const cw = params.get("cw") === "true";
	const cn = params.get("cn") === "true";

	// =========================
	// DOM Elements
	// =========================

	const container = document.getElementById("playerContainer");
	const fullscreenBtn = document.getElementById("fullscreenBtn");
	const saveButton = document.getElementById("saveButton");
	const titleElement = document.getElementById("gameTitle");

	if (!container) {
		console.error("Missing #playerContainer");
		return;
	}

	// =========================
	// Helpers
	// =========================

	function rot13(str) {
		return str.replace(/[A-Za-z]/g, char => {
			const base = char <= "Z" ? 65 : 97;

			return String.fromCharCode(
				((char.charCodeAt(0) - base + 13) % 26) + base
			);
		});
	}

	function isExternalUrl(url) {
		return /^https?:\/\//i.test(url);
	}

	function normalizePath(path) {
		if (isExternalUrl(path)) {
			return path;
		}

		return path.startsWith("/")
			? path
			: "/gxmes/" + path;
	}

	function isFlashGame(path) {
		const lower = path.toLowerCase();

		// Direct SWF
		if (lower.split("?")[0].endsWith(".swf")) {
			return true;
		}

		// SWF hidden inside query params
		if (lower.includes(".swf")) {
			return true;
		}

		return false;
	}

	// =========================
	// Decode Params
	// =========================

	if (cw && which) {
		which = rot13(which);
	}

	if (cn && name) {
		name = rot13(name);
	}

	// =========================
	// Page Title
	// =========================

	document.title = `${name} — NullG*mes Player`;

	if (titleElement) {
		titleElement.textContent = name;
	}

	// =========================
	// Validate
	// =========================

	if (!which) {
		container.innerHTML = `
			<p>No g*me specified.</p>
		`;

		return;
	}

	const finalPath = normalizePath(which);

	// =========================
	// Create Game Element
	// =========================

	let gameElement;

	if (isFlashGame(finalPath)) {
		const ruffle = window.RufflePlayer?.newest();

		if (!ruffle) {
			container.innerHTML = `
				<p>Ruffle failed to load.</p>
			`;

			return;
		}

		gameElement = ruffle.createPlayer();

		gameElement.id = "gameFrame";

		gameElement.style.width = width + "px";
		gameElement.style.height = height + "px";
		gameElement.style.maxWidth = "100%";
		gameElement.style.display = "block";
		gameElement.style.margin = "auto";

		container.appendChild(gameElement);

		gameElement.load(finalPath);
	}

	else {
		gameElement = document.createElement("iframe");

		gameElement.id = "gameFrame";

		gameElement.src = finalPath;
		gameElement.width = width;
		gameElement.height = height;

		gameElement.frameBorder = "0";
		gameElement.allowFullscreen = true;

		gameElement.style.maxWidth = "100%";
		gameElement.style.display = "block";
		gameElement.style.margin = "auto";

		container.appendChild(gameElement);
	}

	// =========================
	// Fullscreen
	// =========================

	async function enterFullscreen() {
		try {
			if (gameElement.requestFullscreen) {
				await gameElement.requestFullscreen();
			}

			else if (gameElement.webkitRequestFullscreen) {
				await gameElement.webkitRequestFullscreen();
			}

			else if (gameElement.msRequestFullscreen) {
				await gameElement.msRequestFullscreen();
			}
		}

		catch (err) {
			console.error("Fullscreen failed:", err);
		}
	}

	if (fullscreenBtn) {
		fullscreenBtn.addEventListener("click", enterFullscreen);
	}

	// =========================
	// Save System
	// =========================

	const saveHandlers = {
		spacecompany() {
			gameElement.contentWindow.Game.save();
		}
	};

	function enableSave(handler) {
		if (!saveButton) {
			return;
		}

		saveButton.style.display = "inline-block";

		saveButton.addEventListener("click", () => {
			try {
				handler();
			}

			catch (err) {
				console.error("Save failed:", err);
			}
		});
	}

	for (const game in saveHandlers) {
		if (which.toLowerCase().includes(game.toLowerCase())) {
			enableSave(saveHandlers[game]);
			break;
		}
	}

	// =========================
	// Debug
	// =========================

	console.log("Loaded game:", {
		name,
		which,
		finalPath,
		width,
		height,
		flash: isFlashGame(finalPath)
	});
});