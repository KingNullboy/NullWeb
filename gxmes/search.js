document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const headers = document.getElementsByClassName('category'); // all category headers
  const buttons = document.querySelectorAll('button:not(header button)');

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    
    // Show/hide buttons based on search
    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      button.style.display = text.includes(filter) ? 'inline-block' : 'none';
    });

    // Hide all headers while searching, show them if search is empty
    headers.forEach(h => {
      h.style.display = filter === "" ? 'none' : "block";
    });
  });
});