document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
      let adScript = document.createElement("script");
      adScript.setAttribute("data-cfasync", "false");
      adScript.setAttribute("type", "text/javascript");
      adScript.src = "https://offfurreton.com/400/9145743";
  
      document.head.appendChild(adScript);
    }
  });