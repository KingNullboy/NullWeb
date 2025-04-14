document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
      let adLib = document.createElement("script");
      adLib.setAttribute("id", "aclib");
      adLib.setAttribute("type", "text/javascript");
      adLib.src = "//acscdn.com/script/aclib.js";
  
      document.head.appendChild(adLib);
      
      setTimeout(function() {
        let adScript = document.createElement("script");
        adScript.setAttribute("type", "text/javascript");
        adScript.src = "/js/adCashAd.js";
  
        document.head.appendChild(adScript);
      }, 1000);

      let adScript2 = document.createElement("script");
      adScript2.setAttribute("async", "true");
      adScript2.src = "//d.smopy.com/d/?resource=pubJS";
  
      document.head.appendChild(adScript);
    }
  });