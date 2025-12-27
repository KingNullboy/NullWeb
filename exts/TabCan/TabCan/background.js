let audio = null;

async function checkTabs() {
  const tabs = await browser.tabs.query({});
  if (tabs.length >= 4 && !audio) {
    playCanCan();
  } else if (tabs.length < 4 && audio) {
    stopCanCan();
  }
}

function playCanCan() {
  audio = new Audio("https://nullhq.duckdns.org/exts/TabCan/assets/cancan.mp3");
  audio.loop = true;
  audio.play();
}

function stopCanCan() {
  if (audio) {
    audio.pause();
    audio = null;
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "stopAudio") {
    stopCanCan();
  }
});

browser.tabs.onCreated.addListener(checkTabs);
browser.tabs.onRemoved.addListener(checkTabs);