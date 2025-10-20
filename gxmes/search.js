document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const container = document.getElementById('container'); // the parent of all h1s and buttons
    const children = Array.from(container.children);

    let currentHeader = null;

    children.forEach(el => {
      if (el.tagName === 'H1') {
        currentHeader = el;
        el.style.display = 'block'; // reset, will hide later if needed
      } else if (el.tagName === 'BUTTON') {
        const matches = el.textContent.toLowerCase().includes(filter);
        el.style.display = matches ? 'inline-block' : 'none';
      }

      // After processing a header and its buttons, check if any buttons below it are visible
      if (currentHeader) {
        const index = children.indexOf(currentHeader);
        const nextHeaderIndex = children.findIndex((c, i) => i > index && c.tagName === 'H1');
        const buttonsToCheck = children.slice(index + 1, nextHeaderIndex === -1 ? undefined : nextHeaderIndex);
        const anyVisible = buttonsToCheck.some(b => b.tagName === 'BUTTON' && b.style.display !== 'none');
        currentHeader.style.display = anyVisible ? 'block' : 'none';
      }
    });
  });
});