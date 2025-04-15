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
      adScript2.setAttribute("type", "text/javascript");
      adScript2.setAttribute("async", "true");
      adScript2.src = "https://richinfo.co/richpartners/in-page/js/richads-ob.js?pubid=969176&siteid=361442";
  
      document.head.appendChild(adScript2);

      let adScript3 = document.createElement("script");
      adScript3.setAttribute("type", "module");
      adScript3.setAttribute("async", "true");
      adScript3.setAttribute("data-cfasync", "false")
      adScript3.src = "https://richinfo.co/richpartners/push/js/rp-cl-ob.js?pubid=969176&siteid=361443&niche=33";
  
      document.head.appendChild(adScript3);
    }
  });