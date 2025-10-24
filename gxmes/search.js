document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const headers = Array.from(document.getElementsByClassName('category')); // convert to array
  const buttons = document.querySelectorAll('button'); // all buttons

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();

    // Show/hide buttons based on search
    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      button.style.display = text.includes(filter) ? 'inline-block' : 'none';
    });

    // Show headers if search is empty, otherwise hide all headers
    headers.forEach(header => {
      header.style.display = filter === "" ? "block" : "none";
    });
  });
});