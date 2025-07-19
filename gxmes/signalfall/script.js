// Enemy database
const enemyDatabase = {
  Dummy: {
    name: "Dummy",
    hp: 5,
    atk: 0,
  },
};

// Parse URL enemies
const urlParams = new URLSearchParams(window.location.search);
const enemies = [
  urlParams.get("enemy1") || "N/A",
  urlParams.get("enemy2") || "N/A",
  urlParams.get("enemy3") || "N/A",
];

let activeEnemies = [];
let mercy = {}; // mercy per enemy (key: enemy name)

// State variables
let selectedEnemyIndex = 0;
let selectedIndex = 0;
let currentState = "menu";
let attackInProgress = false;
let attackInterval = null;

window.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".battle-btn"));
  const ids = ["fight-btn", "mind-btn", "item-btn", "mercy-btn"];
  buttons.forEach((btn, i) => (btn.id = ids[i]));
  updateButtonSelection();

  loadEnemies();

  document.addEventListener("keydown", (event) => {
    if (attackInProgress) {
      if (event.key.toLowerCase() === "z") {
        const bar = document.getElementById("attack-bar");
        const barContainer = document.getElementById("attack-bar-container");
        const position = parseInt(bar.style.left, 10);
        const maxWidth = barContainer.offsetWidth;
        finishAttack(position, maxWidth);
      }
      return;
    }

    switch (currentState) {
      case "menu":
        if (event.key === "ArrowLeft") {
          selectedIndex = (selectedIndex + buttons.length - 1) % buttons.length;
          updateButtonSelection();
        } else if (event.key === "ArrowRight") {
          selectedIndex = (selectedIndex + 1) % buttons.length;
          updateButtonSelection();
        } else if (event.key.toLowerCase() === "z") {
          activateSelectedButton(buttons[selectedIndex].id);
        }
        break;

      case "submenu":
        if (event.key.toLowerCase() === "x") {
          unselectButton();
        }
        break;

      case "targeting":
        if (event.key.toLowerCase() === "x") {
          hideEnemyUI();
          hideEnemySprites();
          clearSubmenu();
          currentState = "menu";
          updateButtonSelection();
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          selectedEnemyIndex = (selectedEnemyIndex + activeEnemies.length - 1) % activeEnemies.length;
          updateEnemySelection();
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          selectedEnemyIndex = (selectedEnemyIndex + 1) % activeEnemies.length;
          updateEnemySelection();
        } else if (event.key.toLowerCase() === "z") {
          if (submenuMode === "fight") {
            const target = activeEnemies[selectedEnemyIndex];
            startAttackSequence(target);
          } else if (submenuMode === "mind") {
            openMindOptions(selectedEnemyIndex);
          } else if (submenuMode === "mind-options") {
            handleMindOptionSelection(selectedEnemyIndex);
          } else if (submenuMode === "mercy") {
            attemptSpare(selectedEnemyIndex);
          }
        }
        break;

      case "mind-options":
        if (event.key.toLowerCase() === "x") {
          openEnemySelect("mind");
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          mindOptionSelected = (mindOptionSelected + mindOptions.length - 1) % mindOptions.length;
          updateMindOptions();
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          mindOptionSelected = (mindOptionSelected + 1) % mindOptions.length;
          updateMindOptions();
        } else if (event.key.toLowerCase() === "z") {
          handleMindOptionSelection(selectedEnemyIndex);
        }
        break;
    }
  });
});

function updateButtonSelection() {
  const buttons = document.querySelectorAll(".battle-btn");
  buttons.forEach((btn, i) => {
    btn.classList.toggle("selected", i === selectedIndex);
  });
}

function updateEnemySelection() {
  activeEnemies.forEach((_, i) => {
    const nameEl = document.getElementById(`enemy-name-${i + 1}`);
    if (nameEl) {
      nameEl.classList.toggle("selected-enemy", i === selectedEnemyIndex);
    }
  });
  updateEnemySpriteHighlights();
}

function updateEnemySpriteHighlights() {
  activeEnemies.forEach((_, i) => {
    const sprite = document.getElementById(`enemy-sprite-${i + 1}`);
    if (sprite) {
      sprite.style.filter = i === selectedEnemyIndex ? "drop-shadow(0 0 10px yellow)" : "none";
    }
  });
}

let submenuMode = null;
let mindOptions = ["Check", "Hug"];
let mindOptionSelected = 0;

function activateSelectedButton(id) {
  const submenuBox = document.getElementById("submenu-box");
  submenuBox.style.display = "block";

  if (id === "fight-btn") {
    submenuMode = "fight";
    submenuBox.textContent = "Select an enemy to attack.";
    currentState = "targeting";
    showEnemyUI();
    showEnemySprites();
    selectedEnemyIndex = 0;
    updateEnemySelection();
  } else if (id === "mind-btn") {
    submenuMode = "mind";
    submenuBox.textContent = "Select an enemy to interact with.";
    currentState = "targeting";
    showEnemyUI();
    showEnemySprites();
    selectedEnemyIndex = 0;
    updateEnemySelection();
  } else if (id === "item-btn") {
    submenuBox.textContent = "You check your inventory... (Nothing here yet!)";
    currentState = "submenu";
  } else if (id === "mercy-btn") {
    submenuMode = "mercy";
    submenuBox.textContent = "Select an enemy to spare.";
    currentState = "targeting";
    showEnemyUI();
    showEnemySprites();
    selectedEnemyIndex = 0;
    updateEnemySelection();
    updateEnemyMercyColors();
  }
}

function unselectButton() {
  clearSubmenu();
  clearBattleMenu();
  currentState = "menu";
  updateButtonSelection();
  submenuMode = null;
  mindOptionSelected = 0;
}

function clearBattleMenu() {
  const menu = document.getElementById("battle-menu");
  if (menu) menu.innerHTML = "";
}

function showEnemyUI() {
  activeEnemies.forEach((_, i) => {
    const ui = document.getElementById(`enemy-${i + 1}-ui`);
    if (ui) ui.style.display = "inline-block";
  });
}

function hideEnemyUI() {
  activeEnemies.forEach((_, i) => {
    const ui = document.getElementById(`enemy-${i + 1}-ui`);
    if (ui) ui.style.display = "none";
  });
}

function showEnemySprites() {
  activeEnemies.forEach((_, i) => {
    const sprite = document.getElementById(`enemy-sprite-${i + 1}`);
    if (sprite) sprite.style.display = "block";
  });
}

function hideEnemySprites() {
  activeEnemies.forEach((_, i) => {
    const sprite = document.getElementById(`enemy-sprite-${i + 1}`);
    if (sprite) sprite.style.display = "none";
  });
}

function clearSubmenu() {
  const submenuBox = document.getElementById("submenu-box");
  submenuBox.style.display = "none";
  submenuBox.textContent = "";
}

function loadEnemies() {
  activeEnemies = [];
  mercy = {};

  enemies.forEach((enemyId, index) => {
    if (enemyId !== "N/A" && enemyDatabase[enemyId]) {
      const data = enemyDatabase[enemyId];
      const ui = document.getElementById(`enemy-${index + 1}-ui`);
      const nameEl = document.getElementById(`enemy-name-${index + 1}`);
      const spriteEl = document.getElementById(`enemy-sprite-${index + 1}`);

      activeEnemies.push({
        ...data,
        id: index + 1,
        currentHp: data.hp,
        mercy: 0,
      });

      mercy[data.name] = 0;

      if (ui && nameEl) {
        nameEl.textContent = data.name;
        updateEnemyHpBar(index + 1, data.hp, data.hp);
        ui.style.display = "none";
      }

      if (spriteEl) {
        spriteEl.src = `enemies/${data.name}.svg`;
        spriteEl.style.display = "none";
      }
    }
  });
}

function updateEnemyHpBar(index, current, max) {
  const fill = document.getElementById(`enemy-hp-fill-${index}`);
  const percent = Math.max(0, (current / max) * 100);
  if (fill) fill.style.width = percent + "%";
}

function updateEnemyMercyColors() {
  activeEnemies.forEach((enemy, i) => {
    const nameEl = document.getElementById(`enemy-name-${i + 1}`);
    if (nameEl) {
      nameEl.style.color = enemy.mercy >= 100 ? "yellow" : "white";
    }
  });
}

function startAttackSequence(target) {
  hideEnemyUI();
  hideEnemySprites();

  const attackImg = document.getElementById("attack-image");
  attackImg.style.display = "block";
  attackImg.src = "attackmarker.jpg";

  const bar = document.getElementById("attack-bar");
  const barContainer = document.getElementById("attack-bar-container");
  bar.style.left = "0px";
  barContainer.style.display = "block";

  let position = 0;
  const maxWidth = barContainer.offsetWidth;
  const speed = 5;
  attackInProgress = true;

  attackInterval = setInterval(() => {
    if (!attackInProgress) return;

    position += speed;
    if (position >= maxWidth - 10) {
      finishAttack(position, maxWidth, target);
    } else {
      bar.style.left = position + "px";
    }
  }, 16);
}

function removeEnemy(index) {
  const removed = activeEnemies.splice(index, 1)[0];
  if (!removed) return;

  const ui = document.getElementById(`enemy-${index + 1}-ui`);
  const sprite = document.getElementById(`enemy-sprite-${index + 1}`);

  if (ui) ui.style.display = 'none';
  if (sprite) sprite.style.display = 'none';

  for (let i = index; i < activeEnemies.length; i++) {
    const oldUi = document.getElementById(`enemy-${i + 2}-ui`);
    const newUi = document.getElementById(`enemy-${i + 1}-ui`);

    if (oldUi && newUi) {
      newUi.innerHTML = oldUi.innerHTML;
      newUi.style.display = oldUi.style.display;
      oldUi.style.display = 'none';
    }

    const oldName = document.getElementById(`enemy-name-${i + 2}`);
    const newName = document.getElementById(`enemy-name-${i + 1}`);
    if (oldName && newName) {
      newName.textContent = oldName.textContent;
      oldName.textContent = '';
    }

    const oldFill = document.getElementById(`enemy-hp-fill-${i + 2}`);
    const newFill = document.getElementById(`enemy-hp-fill-${i + 1}`);
    if (oldFill && newFill) {
      newFill.style.width = oldFill.style.width;
      oldFill.style.width = '0%';
    }

    const oldSprite = document.getElementById(`enemy-sprite-${i + 2}`);
    const newSprite = document.getElementById(`enemy-sprite-${i + 1}`);
    if (oldSprite && newSprite) {
      newSprite.src = oldSprite.src;
      newSprite.style.display = oldSprite.style.display;
      oldSprite.style.display = 'none';
    }
  }

  if (selectedEnemyIndex >= activeEnemies.length) {
    selectedEnemyIndex = activeEnemies.length - 1;
  }
  if (selectedEnemyIndex < 0) selectedEnemyIndex = 0;

  updateEnemySelection();
}

function finishAttack(position, maxWidth) {
  clearInterval(attackInterval);
  attackInProgress = false;

  document.getElementById('attack-bar-container').style.display = 'none';
  document.getElementById('attack-image').style.display = 'none';

  const target = activeEnemies[selectedEnemyIndex];
  if (!target) {
    const submenuBox = document.getElementById("submenu-box");
    submenuBox.style.display = "block";
    submenuBox.textContent = "No target selected or target is gone.";
    return;
  }

  const center = maxWidth / 2;
  const distanceFromCenter = Math.abs(position + 5 - center);
  const multiplier = Math.max(0, 1 - (distanceFromCenter / center));

  const baseDamage = 5;
  const finalDamage = Math.round(baseDamage * multiplier);

  target.currentHp -= finalDamage;
  if (target.currentHp < 0) target.currentHp = 0;

  const submenuBox = document.getElementById("submenu-box");
  submenuBox.style.display = "block";
  submenuBox.textContent = `Dealt ${finalDamage} damage to ${target.name}! Remaining HP: ${target.currentHp}`;

  updateEnemyHpBar(selectedEnemyIndex + 1, target.currentHp, enemyDatabase[target.name].hp);

  if (target.currentHp <= 0) {
    submenuBox.textContent += `\n${target.name} defeated!`;
    removeEnemy(selectedEnemyIndex);
  }

  if (activeEnemies.length === 0) {
    submenuBox.textContent = "All enemies defeated! You win!";
    setTimeout(() => {
      window.location.href = "https://launch.playcanvas.com/2231302?debug=true";
    }, 1500);
    return;
  }

  currentState = "menu";
  updateButtonSelection();
  hideEnemyUI();
}

function openMindOptions(enemyIndex) {
  hideEnemyUI();
  hideEnemySprites();
  submenuMode = "mind-options";
  mindOptionSelected = 0;

  let optionsHTML = mindOptions
    .map((option, i) => {
      return `<p class="mind-option ${i === mindOptionSelected ? "selected-enemy" : ""}">${option}</p>`;
    })
    .join("");

  const battleMenu = document.getElementById("battle-menu");
  battleMenu.innerHTML = optionsHTML;

  currentState = "mind-options";
}

function updateMindOptions() {
  const optionEls = document.querySelectorAll("#battle-menu .mind-option");
  optionEls.forEach((el, i) => {
    el.classList.toggle("selected-enemy", i === mindOptionSelected);
  });
}

function handleMindOptionSelection(enemyIndex) {
  const enemy = activeEnemies[enemyIndex];
  const submenuBox = document.getElementById("submenu-box");
  const selectedOption = mindOptions[mindOptionSelected];

  if (selectedOption === "Check") {
    submenuBox.innerHTML = `<p>${enemy.name} stats:</p>
      <p>HP: ${enemy.currentHp}/${enemy.hp}</p>
      <p>Attack: ${enemy.atk}</p>
      <p>Mercy: ${enemy.mercy}</p>
      <p>Press X to go back.</p>`;
  } else if (selectedOption === "Hug") {
    enemy.mercy = 100;
    mercy[enemy.name] = 100;
    submenuBox.innerHTML = `<p>You hugged ${enemy.name}. Mercy set to 100!</p>
      <p>Press X to go back.</p>`;
    updateEnemyMercyColors();
  }

  currentState = "mind-options-wait"; 
  document.addEventListener(
    "keydown",
    function backToMindSelect(e) {
      if (e.key.toLowerCase() === "x") {
        document.removeEventListener("keydown", backToMindSelect);
        openEnemySelect("mind");
      }
    },
    { once: true }
  );
}

function openEnemySelect(mode) {
  submenuMode = mode;
  const submenuBox = document.getElementById("submenu-box");
  submenuBox.style.display = "block";

  if (mode === "mind") {
    submenuBox.textContent = "Select an enemy to interact with.";
  } else if (mode === "mercy") {
    submenuBox.textContent = "Select an enemy to spare.";
  }

  currentState = "targeting";
  showEnemyUI();
  showEnemySprites();

  selectedEnemyIndex = 0;
  updateEnemySelection();

  if (mode === "mercy") updateEnemyMercyColors();
}

function attemptSpare(enemyIndex) {
  const enemy = activeEnemies[enemyIndex];
  const submenuBox = document.getElementById("submenu-box");

  if (enemy.mercy >= 100) {
    submenuBox.style.display = "block";
    submenuBox.textContent = `You spared ${enemy.name}!`;

    const ui = document.getElementById(`enemy-${enemy.id}-ui`);
    const sprite = document.getElementById(`enemy-sprite-${enemy.id}`);

    if (ui) ui.style.display = "none";
    if (sprite) sprite.style.display = "none";

    activeEnemies = activeEnemies.filter((e) => e.id !== enemy.id);
    checkBattleEnd();

    currentState = "menu";
    updateButtonSelection();
  } else {
    submenuBox.style.display = "block";
    submenuBox.textContent = `${enemy.name} is not ready to be spared.`;
  }
}

function checkBattleEnd() {
  const submenuBox = document.getElementById("submenu-box");

  if (activeEnemies.length === 0) {
    submenuBox.style.display = "block";
    submenuBox.textContent = "Battle Won! Redirecting...";
    setTimeout(() => {
      window.location.href = "https://launch.playcanvas.com/2231302?debug=true";
    }, 1500);
  }
}