document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const buttons = document.querySelectorAll('button:not(header button)');

    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      button.style.display = text.includes(filter) ? 'inline-block' : 'none';
    });
  });
});