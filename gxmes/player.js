document.addEventListener("DOMContentLoaded", () => {
	// --- helpers ---
	function rot13(str) {
		// only letters are rotated; punctuation stays the same
		return str.replace(/[A-Za-z]/g, (c) => {
			const base = c <= "Z" ? 65 : 97;
			return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
		});
	}

	function isExternalUrl(u) {
		return u.startsWith("http://") || u.startsWith("https://") || (u.startsWith("uggc://") && new URLSearchParams(window.location.search).get("cw") === "true") || (u.startsWith("uggcf://") && new URLSearchParams(window.location.search).get("cw") === "true");
	}

	// --- read params ---
	const params = new URLSearchParams(window.location.search);
	let which = params.get("which");
	let name = params.get("name");
	const widthParam = params.get("width");
	const heightParam = params.get("height");
	const cw = params.get("cw") === "true"; // ciphered which
	const cn = params.get("cn") === "true"; // ciphered name

	const width = widthParam ? parseInt(widthParam, 10) : 800;
	const height = heightParam ? parseInt(heightParam, 10) : 600;

	const placeholder = document.getElementById("gameFrame"); // initial element in your HTML
	const container = placeholder.parentNode;
	const saveButton = document.getElementById("saveButton");
	const fullscreenBtn = document.getElementById("fullscreenBtn");

	saveButton.style.display = "none";

	// --- decode if needed ---
	if (cw && which) which = rot13(which);
	if (cn && name) name = rot13(name);

	// --- create game element (iframe or object) ---
	let gameElement = null;
	if (which) {
		if (isExternalUrl(which)) {
			gameElement = document.createElement("object");
			gameElement.data = which;
			gameElement.type = "text/html";
		} else {
			gameElement = document.createElement("iframe");
			// if user supplied a leading slash or a relative path, keep it as-is; otherwise, prefix /gxmes/
			gameElement.src = which.startsWith("/") ? which : "/gxmes/" + which;
		}

		gameElement.width = width;
		gameElement.height = height;
		gameElement.id = "gameFrame";
		gameElement.setAttribute("frameborder", "0");
		gameElement.setAttribute("allowfullscreen", "");
		gameElement.style.display = "block";
		gameElement.style.maxWidth = "100%";
		gameElement.style.boxSizing = "border-box";

		// replace placeholder (works whether placeholder is iframe or not)
		container.replaceChild(gameElement, placeholder);
	} else {
		// no which param: keep existing element, but ensure size
		gameElement = document.getElementById("gameFrame");
		if (gameElement) {
			gameElement.width = width;
			gameElement.height = height;
		}
	}

	// --- fullscreen with graceful fallback ---
	let inManualFullscreen = false;
	let savedStyles = new Map();

	function enterManualFullscreen(el) {
		if (inManualFullscreen) return;
		inManualFullscreen = true;

		// save inline styles for restore
		savedStyles.set(el, {
			position: el.style.position || "",
			top: el.style.top || "",
			left: el.style.left || "",
			width: el.style.width || "",
			height: el.style.height || "",
			zIndex: el.style.zIndex || "",
			background: el.style.background || ""
		});

		// hide other content except the element and buttons
		Array.from(document.body.children).forEach(child => {
			if (child === el) return;
			// keep fullscreen and save buttons visible
			if (child === fullscreenBtn || child === saveButton) return;
			child.style.display = "none";
		});

		el.style.position = "fixed";
		el.style.top = "0";
		el.style.left = "0";
		el.style.width = "100vw";
		el.style.height = "100vh";
		el.style.zIndex = "2147483647"; // large z-index
		el.style.background = "#000";
	}

	function exitManualFullscreen(el) {
		if (!inManualFullscreen) return;
		inManualFullscreen = false;

		// restore hidden elements
		Array.from(document.body.children).forEach(child => {
			child.style.display = "";
		});

		// restore element styles
		const saved = savedStyles.get(el) || {};
		el.style.position = saved.position;
		el.style.top = saved.top;
		el.style.left = saved.left;
		el.style.width = saved.width || (width + "px");
		el.style.height = saved.height || (height + "px");
		el.style.zIndex = saved.zIndex;
		el.style.background = saved.background;

		savedStyles.delete(el);
	}

	fullscreenBtn.addEventListener("click", async () => {
		// first try the Fullscreen API on the game element itself
		try {
			if (gameElement.requestFullscreen) {
				await gameElement.requestFullscreen();
				return;
			}
			// vendor prefixes
			if (gameElement.webkitRequestFullscreen) {
				await gameElement.webkitRequestFullscreen();
				return;
			}
			if (gameElement.msRequestFullscreen) {
				await gameElement.msRequestFullscreen();
				return;
			}
		} catch (e) {
			// continue to fallback if request fails
		}

		// Some browsers prevent fullscreen for object/iframe — fallback to manual
		enterManualFullscreen(gameElement);
	});

	// If user presses Escape or fullscreenchange indicates exit, restore manual fullscreen
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			// if Fullscreen API is active, letting browser handle; also exit manual fallback
			if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
				// full API; do nothing special (browser will exit)
			}
			// always try to exit manual fallback if active
			exitManualFullscreen(gameElement);
		}
	});

	// listen for standard fullscreenchange to clean manual state if needed
	document.addEventListener("fullscreenchange", () => {
		if (!document.fullscreenElement) exitManualFullscreen(gameElement);
	});
	document.addEventListener("webkitfullscreenchange", () => {
		if (!document.webkitFullscreenElement) exitManualFullscreen(gameElement);
	});
	document.addEventListener("msfullscreenchange", () => {
		if (!document.msFullscreenElement) exitManualFullscreen(gameElement);
	});

	// --- Update page title if 'name' is provided ---
	if (name !== null && name !== undefined) {
		document.title = name + " — NullG*mes Player";
	} else {
		document.title = "NullG*mes Player";
	}

	// --- Custom save button logic for specific games ---
	function save(game, how) {
		if (!which) return;
		if (which.includes(game)) {
			saveButton.style.display = "inline-block";
			saveButton.setAttribute("onclick", how);
		}
	}

	// known example
	save("spacecompany", "document.getElementById('gameFrame').contentWindow.Game.save();");
});