document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
      let adScript = document.createElement("script");
      adScript.setAttribute("type", "text/javascript");
      adScript.src = "/js/adCashAd.js";
  
      document.head.appendChild(adScript);
    }
  });