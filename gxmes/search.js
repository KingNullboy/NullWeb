document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const categories = document.querySelectorAll('.category'); // assuming each category has a .category class

    categories.forEach(category => {
      const buttons = category.querySelectorAll('button:not(header button)');
      let anyVisible = false;

      buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        const matches = text.includes(filter);
        button.style.display = matches ? 'inline-block' : 'none';
        if (matches) anyVisible = true;
      });

      // Hide category if no buttons match, show if at least one does
      category.style.display = anyVisible ? 'block' : 'none';
    });
  });
});