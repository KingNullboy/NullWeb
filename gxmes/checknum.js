// Fetch the file asynchronously
fetch('index.html')
  .then(response => response.text())  // Get the text content of the file
  .then(data => {
    // Count occurrences of "</button>" in the file content
    const buttonTimes = (data.match(/<\/button>/g) || []).length - 3;

    // Update the innerHTML with the number of games
    document.getElementById("gamenum").innerHTML = "There are " + buttonTimes + " games of varying quality!";
  })
  .catch(error => {
    console.error("Error fetching the file:", error);
  });