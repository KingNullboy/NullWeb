document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("ads") === "true" || localStorage.getItem("ads") === null) {
      let adScript = document.createElement("script");
      adScript.setAttribute("data-cfasync", "false");
      adScript.setAttribute("type", "text/javascript");
      adScript.src = "https://pl26379383.profitableratecpm.com/cd/95/b5/cd95b527973b743989aca62366c43fdb.js";
    }
  });