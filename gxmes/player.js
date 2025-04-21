document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const which = params.get("which");
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
});