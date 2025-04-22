document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const which = params.get("which");
    const name = params.get("name");
	const iframe = document.getElementById("gameFrame");
	const saveButton = document.getElementById("saveButton");

	saveButton.style.display = "none";

	if (which && iframe) {
		// Prepend the '/gxmes/' directory to the path
		iframe.src = "/gxmes/" + which;
	}

	const fullscreenBtn = document.getElementById("fullscreenBtn");
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

	if (name !== null) {
    	document.title = name + " — NullG*mes Player";
	} else {
		document.title = "NullG*mes Player"
	}

	function save(game, how) {
		if (which.includes(game)) {
			saveButton.style.display = "block";
			saveButton.setAttribute("onclick", how)
		}
	};

	save("spacecompany", function() {
		document.getElementById('gameFrame').contentWindow.Game.save();
	});
});