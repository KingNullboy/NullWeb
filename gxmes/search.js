document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const headers = Array.from(document.getElementsByClassName('category')); // convert to array

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();

    headers.forEach(header => {
      const buttons = Array.from(header.querySelectorAll('button'));

      // Filter buttons individually
      buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        button.style.display = text.includes(filter) ? 'inline-block' : 'none';
      });

      // Hide headers if there is any input, show only if input is empty
      header.style.display = filter === "" ? 'block' : 'none';
    });
  });
});