window.addEventListener('DOMContentLoaded', () => {
  let selectedEnemyIndex = 0;
  let selectedIndex = 0;
  let currentState = 'menu';
  let attackInProgress = false;
  let attackInterval = null;

  const buttons = Array.from(document.querySelectorAll('.battle-btn'));
  const ids = ['fight-btn', 'mind-btn', 'item-btn', 'mercy-btn'];
  buttons.forEach((btn, i) => btn.id = ids[i]);
  updateButtonSelection();

  loadEnemies();

  document.addEventListener('keydown', (event) => {
    if (attackInProgress) {
      if (event.key.toLowerCase() === 'z') {
        const bar = document.getElementById('attack-bar');
        const barContainer = document.getElementById('attack-bar-container');
        const position = parseInt(bar.style.left, 10);
        const maxWidth = barContainer.offsetWidth;
        finishAttack(position, maxWidth);
      }
      return;
    }

    if (currentState === 'menu') {
      if (event.key === 'ArrowLeft') {
        selectedIndex = (selectedIndex + buttons.length - 1) % buttons.length;
        updateButtonSelection();
      } else if (event.key === 'ArrowRight') {
        selectedIndex = (selectedIndex + 1) % buttons.length;
        updateButtonSelection();
      } else if (event.key.toLowerCase() === 'z') {
        activateSelectedButton(buttons[selectedIndex].id);
      }
    } else if (currentState === 'submenu') {
      if (event.key.toLowerCase() === 'x') {
        unselectButton();
      }
    } else if (currentState === 'targeting') {
      if (event.key.toLowerCase() === 'x') {
        hideEnemyUI();
        document.getElementById('submenu-box').style.display = 'none';
        document.getElementById('submenu-box').textContent = '';
        currentState = 'menu';
        updateButtonSelection();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        selectedEnemyIndex = (selectedEnemyIndex + activeEnemies.length - 1) % activeEnemies.length;
        updateEnemySelection();
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        selectedEnemyIndex = (selectedEnemyIndex + 1) % activeEnemies.length;
        updateEnemySelection();
      } else if (event.key.toLowerCase() === 'z') {
        const target = activeEnemies[selectedEnemyIndex];
        console.log(`Target confirmed: ${target.name}`);
        startAttackSequence();
      }
    }
  });

  function updateButtonSelection() {
    buttons.forEach((btn, i) => {
      btn.classList.toggle('selected', i === selectedIndex);
    });
  }

  function updateEnemySelection() {
    activeEnemies.forEach((_, i) => {
      const nameEl = document.getElementById(`enemy-name-${i + 1}`);
      if (nameEl) {
        nameEl.classList.toggle('selected-enemy', i === selectedEnemyIndex);
      }
    });
  }

  function activateSelectedButton(id) {
    const submenuBox = document.getElementById('submenu-box');
    submenuBox.style.display = 'block';

    switch (id) {
      case 'fight-btn':
        submenuBox.textContent = 'Select an enemy to attack.';
        currentState = 'targeting';
        showEnemyUI();
        break;
      case 'mind-btn':
        submenuBox.textContent = 'You try to understand the enemy...';
        currentState = 'submenu';
        break;
      case 'item-btn':
        submenuBox.textContent = 'You check your inventory... (Nothing here yet!)';
        currentState = 'submenu';
        break;
      case 'mercy-btn':
        submenuBox.textContent = 'You feel mercy... or maybe not.';
        currentState = 'submenu';
        break;
    }
  }

  function unselectButton() {
    const submenuBox = document.getElementById('submenu-box');
    submenuBox.style.display = 'none';
    submenuBox.textContent = '';
    currentState = 'menu';
    updateButtonSelection();
  }

  function showEnemyUI() {
    activeEnemies.forEach((_, i) => {
      const ui = document.getElementById(`enemy-${i + 1}-ui`);
      if (ui) ui.style.display = 'inline-block';
    });
    selectedEnemyIndex = 0;
    updateEnemySelection();
  }

  function hideEnemyUI() {
    activeEnemies.forEach((_, i) => {
      const ui = document.getElementById(`enemy-${i + 1}-ui`);
      if (ui) ui.style.display = 'none';
    });
  }

  function startAttackSequence() {
    hideEnemyUI();
    document.getElementById('attack-image').style.display = 'block';
    document.getElementById('attack-image').src = 'attackmarker.jpg'; // Change to your image path
    const bar = document.getElementById('attack-bar');
    const barContainer = document.getElementById('attack-bar-container');
    bar.style.left = '0px';
    barContainer.style.display = 'block';

    let position = 0;
    const maxWidth = barContainer.offsetWidth;
    const speed = 5;
    attackInProgress = true;

    attackInterval = setInterval(() => {
      if (!attackInProgress) return;

      position += speed;
      if (position >= maxWidth - 10) {
        finishAttack(position, maxWidth);
      } else {
        bar.style.left = position + 'px';
      }
    }, 16);
  }

  function finishAttack(position, maxWidth) {
    clearInterval(attackInterval);
    attackInProgress = false;

    document.getElementById('attack-bar-container').style.display = 'none';
    document.getElementById('attack-image').style.display = 'none';

    const center = maxWidth / 2;
    const distanceFromCenter = Math.abs(position + 5 - center);
    const multiplier = Math.max(0, 1 - (distanceFromCenter / center));

    const baseDamage = 5;
    const finalDamage = Math.round(baseDamage * multiplier);

    console.log(`Dealt ${finalDamage} damage!`);
  }
});

// Enemy loader
const enemyDatabase = {
  Dummy: {
    name: "Dummy",
    hp: 5,
    atk: 0
  }
};

const urlParams = new URLSearchParams(window.location.search);
const enemies = [
  urlParams.get('enemy1') || 'N/A',
  urlParams.get('enemy2') || 'N/A',
  urlParams.get('enemy3') || 'N/A'
];

let activeEnemies = [];

function loadEnemies() {
  enemies.forEach((enemyId, index) => {
    if (enemyId !== 'N/A' && enemyDatabase[enemyId]) {
      const data = enemyDatabase[enemyId];
      const ui = document.getElementById(`enemy-${index + 1}-ui`);
      const nameEl = document.getElementById(`enemy-name-${index + 1}`);

      activeEnemies.push({ ...data, id: index + 1, currentHp: data.hp });

      if (ui && nameEl) {
        nameEl.textContent = data.name;
        updateEnemyHpBar(index + 1, data.hp, data.hp);
        ui.style.display = 'none';
      }
    }
  });
}

function updateEnemyHpBar(index, current, max) {
  const fill = document.getElementById(`enemy-hp-fill-${index}`);
  const percent = Math.max(0, (current / max) * 100);
  if (fill) fill.style.width = percent + '%';
}