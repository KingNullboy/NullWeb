document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const which = params.get("which");
    const name = params.get("name");
	const iframe = document.getElementById("gameFrame");

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
		document.getElementById("name").innerHTML = name;
	} else {
		document.title = "NullG*mes Player"
		document.getElementById("name").innerHTML = "NullG*mes Player";
	}
});