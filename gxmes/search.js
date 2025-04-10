const searchInput = document.getElementById('searchInput');
const buttons = document.querySelectorAll('.button-container button');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  buttons.forEach(button => {
    const match = button.textContent.toLowerCase().includes(query);
    button.style.display = match ? 'inline-block' : 'none';
  });
});