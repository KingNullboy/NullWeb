window.addEventListener('DOMContentLoaded', (event) => {
  fetch('index.html')
    .then(response => response.text())  // Get the text content of the file
    .then(data => {
      // Count occurrences of "</button>" in the file content
      const buttonTimes = (data.match(/<\/button>/g) || []).length - 3;

      // Get the current URL
      const currentUrl = window.location.href;
      let baseUrl = window.location.protocol + "//" + document.domain + "/gxmes/";

      // Get references to the elements that will be updated
      const gamenumElement = document.getElementById("gamenum");
      const creditElement = document.getElementById("credit");
      const thingElement = document.getElementById("thing");

      // Check if we're on the games link page
      if (currentUrl === baseUrl || currentUrl === baseUrl + "index" || currentUrl === baseUrl + "index.html") {
        // Update gamenumElement for the games link page
        if (gamenumElement) {
          gamenumElement.innerHTML = `There are ${buttonTimes} g*mes of varying quality!`;
        }
      } else {
        // Update gamenumElement for other pages
        if (gamenumElement) {
          gamenumElement.innerHTML = `There are ${buttonTimes + 1} g*me sites/g*mes right now! However, one is temporarily out of order.`;
        }
      }

      // Check if we're not on the games link page to update the credit and thing elements
      if (currentUrl !== baseUrl && currentUrl !== baseUrl + "index" && currentUrl !== baseUrl + "index.html") {
        // Update creditElement if we're not on the games link page
        if (creditElement) {
          creditElement.innerHTML = `This g*mes website was originally made by selenite-cc on GitHub. Nullboy000 (me) added ${buttonTimes - 50} more g*mes and made it an actual website, not just html files. (I think. I'm pretty sure selenite-cc wasn't using them to host a website, but given I'm basing that on the fact that I couldn't find it anywhere, I could be wrong, since I barely looked.)`;
        }
      } else {
        // If on the games link page, update thingElement with description of the site
        if (thingElement) {
          thingElement.innerHTML = `NullG*mes is a website with some Flash G*mes available to play, there are currently <b>${buttonTimes}</b> g*mes available to play. This website was made in mind to also provide kids in schools who have free time to be able to play old g*mes they used to enjoy but have not been able to play because of Flash shutting down.`;
        }

        // Update gamenumElement for the games link page
        if (gamenumElement) {
          gamenumElement.innerHTML = `There are ${buttonTimes + 1} g*me sites/g*mes right now! However, one is temporarily out of order.`;
        }
      }
    })
    .catch(error => {
      console.error("Error fetching the file:", error);
    });
});