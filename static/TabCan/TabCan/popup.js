document.getElementById("stopButton").addEventListener("click", async () => {
  await browser.runtime.sendMessage({ action: "stopAudio" });
  alert("You begged… but the choice is KingNullboy's 😎");
});