fetch('index.html')
  .then(response => response.text())  // Get the text content of the file
  .then(data => {
    // Count occurrences of "</button>" in the file content
    const buttonTimes = (data.match(/<\/button>/g) || []).length - 3;

    // Check if the current URL matches one of the conditions
    const currentUrl = window.location.href;
    let baseUrl = window.location.protocol + "//" + document.domain + "/gxmes/";

    if (currentUrl === baseUrl || currentUrl === baseUrl + "index" || currentUrl === baseUrl + "index.html") {
      // If it's one of the matching URLs, update the "gamenum" element
      document.getElementById("gamenum").innerHTML = "There are " + buttonTimes + " g*mes of varying quality!";
    } else {
      baseUrl = window.location.protocol + "//" + document.domain + "/links/"
      if (currentUrl !== baseUrl || currentUrl !== baseUrl + "index" || currentUrl !== baseUrl + "index.html") {
      // Otherwise, update the "credit" and "thing" elements with the custom text
      document.getElementById("credit").innerHTML = "This g*mes website was originally made by selenite-cc on GitHub. Nullboy000 (me) added " + (buttonTimes - 50) + " more g*mes and made it an actual website, not just html files. (I think. I'm pretty sure selenite-cc wasn't using them to host a website, but given I'm basing that on the fact that I couldn't find it anywhere, I could be wrong, since I barely looked.)";
      } else {
      document.getElementById("thing").innerHTML = "NullG*mes is a website with some Flash G*mes available to play, there are currently <b>" + buttonTimes + "</b> g*mes available to play. This website was made in mind to also provide kids in schools who have free time to be able to play old g*mes they used to enjoy but have not been able to play because of Flash shutting down.";
        document.getElementById("gamenum").innerHTML = "There are " + (buttonTimes + 1) + " g*me sites/g*mes right now! However, one is temporarily out of order.";
      }
    }
  })
  .catch(error => {
    console.error("Error fetching the file:", error);
  });