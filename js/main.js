document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
      let adLib = document.createElement("script");
      adLib.setAttribute("id", "aclib");
      adLib.setAttribute("type", "text/javascript");
      adLib.src = "//acscdn.com/script/aclib.js";
  
      document.head.appendChild(adLib);
      
      let adScript = document.createElement("script");
      adScript.setAttribute("type", "text/javascript");
      adScript.src = "/js/adCashAd.js";
  
      document.head.appendChild(adScript);
    }
  });