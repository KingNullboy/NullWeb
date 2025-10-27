document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const buttons = document.querySelectorAll('button:not(header button)');
    const headers = document.querySelectorAll('center h1, center h2');

    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      button.style.display = text.includes(filter) ? 'inline-block' : 'none';
    });
    headers.forEach(element => {
      element.style.display = searchInput.value === "" ? "" : "none"
    });
  });
});