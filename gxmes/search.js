document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const randomButton = document.getElementById('randomGxmeBtn');
  const count = document.getElementById('gamenum');
  const noResults = document.getElementById('noResults');
  const sections = Array.from(document.querySelectorAll('.game-section'));
  const games = Array.from(document.querySelectorAll('a[data-game]'));

  if (!searchInput || !randomButton || !count || !noResults) {
    return;
  }

  const normalize = value => value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const updateResults = () => {
    const query = normalize(searchInput.value.trim());
    const visibleGames = [];

    sections.forEach(section => {
      const title = section.querySelector('.game-section-title');
      if (title) {
        title.hidden = Boolean(query);
      }

      section.querySelectorAll('a[data-game]').forEach(game => {
        const gameMatches = !query || normalize(game.textContent).includes(query);
        const matches = gameMatches;
        game.hidden = !matches;
        if (matches) visibleGames.push(game);
      });

      section.hidden = Boolean(query) && !section.querySelector('a[data-game]:not([hidden])');
    });

    count.textContent = query
      ? `Showing ${visibleGames.length} of ${games.length} g*mes.`
      : `There are ${games.length} g*mes of varying quality!`;
    noResults.hidden = visibleGames.length !== 0;
  };

  searchInput.addEventListener('input', updateResults);
  randomButton.addEventListener('click', () => {
    const visibleGames = games.filter(game => !game.hidden);
    if (visibleGames.length) {
      visibleGames[Math.floor(Math.random() * visibleGames.length)].click();
    }
  });
});
