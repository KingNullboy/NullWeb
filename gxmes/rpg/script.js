// === Random function ===
function random(min, max, int = false) {
	let val = Math.random() * (max - min + (int ? 1 : 0)) + min;
	return int ? Math.floor(val) : val;
}

function repeat(times, action) {
	for (let i = 0; i < times; i++) {
		action(i);
	}
}

// === Items ===
const items = {
	use: function (item) {
		if (item.type === "heal") {
			playerStats.health += item.healAmount;
			if (playerStats.health > 20) playerStats.health = 20; // Max health cap
			log(`You used ${item.name} and healed for ${item.healAmount} health!`);
			log(`Your current health is now ${playerStats.health}.`);
		} else if (item.type === "weapon") {
			if (playerStats.inBattle && currentEnemy) {
				// Attempt to hit
				if (random(0, 1) <= item.hitChance) {
					let damage = random(1, item.maxDamage, true);
					let crit = random(0, 1) <= item.critChance;
					if (crit) damage *= 2;

					currentEnemy.health -= damage;
					log(`You hit ${currentEnemy.name} for ${damage} damage${crit ? " (Critical!)" : ""}!`);

					// Check if enemy is defeated
					if (currentEnemy.health <= 0) {
						log(`${currentEnemy.name} has been defeated!`);
						winBattle("murder");
					}
				} else {
					log(`You missed ${currentEnemy.name}!`);
				}
			} else {
				log(item.desc);
			}
		} else if (item.type === "shield") {
			log(item.desc);
		}
	},
	weapons: {
		trainerSword: {
			name: "Trainer Sword",
			type: "weapon",
			maxDamage: 3,
			hitChance: 0.5,
			critChance: 0.1,
			desc: "A basic sword that deals up to 3 damage, with a 50% chance to hit and a 10% chance to crit."
		}
	},
	shields: {
		trainerShield: {
			name: "Trainer Shield",
			type: "shield",
			maxDeflect: 5,
			deflectChance: 0.25,
			desc: "A decent shield that has a 25% chance to deflect an attack, and can absorb up to 5 damage."
		}
	},
	heals: {
		trainerPotion: {
			name: "Trainer Potion",
			type: "heal",
			healAmount: 5
		}
	}
};

// === Enemies ===
const enemies = [
	{
		name: "Evil Bob",
		health: 2,
		maxDamage: 1,
		hitChance: 0.75,
		critChance: 0.1,
		convinceThreshold: 5,
		xpReward: 1,
		moneyReward: 1,
		fleeChance: -1
	},
	{
		name: "Sneaky Goblin",
		health: 5,
		maxDamage: 3,
		hitChance: 0.6,
		critChance: 0.15,
		convinceThreshold: 8,
		xpReward: 3,
		moneyReward: 2,
		fleeChance: 40
	},
	{
		name: "Angry Troll",
		health: 8,
		maxDamage: 4,
		hitChance: 0.7,
		critChance: 0.2,
		convinceThreshold: 12,
		xpReward: 5,
		moneyReward: 5,
		fleeChance: 40
	},
	{
		name: "Cursed Skeleton",
		health: 6,
		maxDamage: 3,
		hitChance: 0.65,
		critChance: 0.25,
		convinceThreshold: 10,
		xpReward: 4,
		moneyReward: 3,
		fleeChance: 30
	},
	{
		name: "Forest Bandit",
		health: 5,
		maxDamage: 3,
		hitChance: 0.7,
		critChance: 0.1,
		convinceThreshold: 7,
		xpReward: 3,
		moneyReward: 4,
		fleeChance: 20
	},
	{
		name: "Dark Sorcerer",
		health: 10,
		maxDamage: 5,
		hitChance: 0.6,
		critChance: 0.3,
		convinceThreshold: 15,
		xpReward: 6,
		moneyReward: 6,
		fleeChance: 15
	}
];

// === Player Stats ===
var playerStats = localStorage.getItem("playerStats")
	? JSON.parse(localStorage.getItem("playerStats"))
	: {
		health: 20,
		xp: 0,
		level: 1,
		money: 5,
		levelXpThreshold: [10, 20, 30, 50, 80, 120, 170, 230, 300, 400, 520, 650, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000],
		inBattle: false,
		inventory: {
			slot1: items.weapons.trainerSword,
			slot2: items.shields.trainerShield,
			slot3: items.heals.trainerPotion,
			slot4: null, slot5: null, slot6: null, slot7: null, slot8: null, slot9: null, slot10: null
		},
		pos: {
			x: 0,
			y: 0,
			visited: ["0,0"]

		},
		log: []
	};

// === Save Function ===
function savePlayerStats() {
	localStorage.setItem("playerStats", JSON.stringify(playerStats));
	log("Game saved!");
}

// === DOM References ===
const DOMContent = {
	btns: {
		explore: document.getElementById("explore-btn"),
		inventory: document.getElementById("inventory-btn"),
		save: document.getElementById("save-btn"),
		clearsave: document.getElementById("clear-save-btn")
	},
	gamecontainer: {
		charinfo: {
			level: document.getElementById("character-level"),
			health: document.getElementById("character-health"),
			xp: document.getElementById("character-xp"),
			money: document.getElementById("character-money")
		},
		log: document.getElementById("game-log")
	},
	controlsSubmenu: document.getElementById("controls-submenu"),
	battleControls: document.getElementById("battle-controls")
};

// === Helper Functions ===
function log(text) {
	let p = document.createElement("p");
	p.textContent = text;
	DOMContent.gamecontainer.log.appendChild(p);
	DOMContent.gamecontainer.log.scrollTop = DOMContent.gamecontainer.log.scrollHeight;

	// Store in localStorage
	playerStats.logs.push(text);
}

function createButton(text, parent, action) {
	let btn = document.createElement("button");
	btn.textContent = text;
	btn.addEventListener("click", action);
	parent.appendChild(btn);
}

function checkLevelUp() {
	while (playerStats.levelXpThreshold[playerStats.level - 1] && playerStats.xp >= playerStats.levelXpThreshold[playerStats.level - 1]) {
		playerStats.level++;
		log(`You leveled up! You are now level ${playerStats.level}!`);
	}
}

function winBattle(method) {
	let xpGained = method === "murder" ? currentEnemy.xpReward : 0;
	playerStats.money += currentEnemy.moneyReward;
	playerStats.xp += xpGained;
	checkLevelUp();

	log(`You won the battle by ${method}!`);
	if (method !== "cowardice") {
		log(`You gained ${currentEnemy.moneyReward} money and ${xpGained} XP!`);
	}

	DOMContent.btns.explore.disabled = false;
	DOMContent.btns.inventory.disabled = false;
	DOMContent.btns.save.disabled = false;
	DOMContent.battleControls.innerHTML = "";

	playerStats.inBattle = false;
	currentEnemy = null;
	savePlayerStats();
}

let currentEnemy = null;

function initBattle(enemy) {
	currentEnemy = enemy || enemies[random(0, enemies.length - 1, true)];
	log(`A wild ${currentEnemy.name} appeared!`);

	DOMContent.btns.explore.disabled = true;
	DOMContent.btns.save.disabled = true;
	playerStats.inBattle = true;

	DOMContent.battleControls.innerHTML = "";
	DOMContent.controlsSubmenu.innerHTML = "";

	createButton("Convince", DOMContent.battleControls, function () {
		if (random(1, 20, true) >= currentEnemy.convinceThreshold) {
			log(`You convinced ${currentEnemy.name} to leave!`);
			winBattle("convince");
		} else {
			log(`You failed to convince ${currentEnemy.name}. Prepare for battle!`);
			playerStats.health -= currentEnemy.maxDamage * random(0.5, 1, false);
		}
	});

	createButton("Flee", DOMContent.battleControls, function () {
		if (random(1, 100, true) <= currentEnemy.fleeChance) {
			log(`You successfully fled from ${currentEnemy.name}!`);
			winBattle("cowardice");
		} else {
			log(`You failed to flee from ${currentEnemy.name}! Prepare for battle!`);
			playerStats.health -= currentEnemy.maxDamage * random(0.5, 1, false);
		}
	});
}

// === Movement ===
function move(direction) {
	switch (direction) {
		case "up": playerStats.pos.y += 1; break;
		case "down": playerStats.pos.y -= 1; break;
		case "left": playerStats.pos.x -= 1; break;
		case "right": playerStats.pos.x += 1; break;
	}

	const posString = `${playerStats.pos.x},${playerStats.pos.y}`;
	log(`You moved ${direction}. Current position: (${playerStats.pos.x}, ${playerStats.pos.y})`);

	if (!playerStats.pos.visited.includes(posString)) {
		playerStats.pos.visited.push(posString);
		if (random(1, 10, true) <= 4) { // 40% chance
			initBattle();
		}
	}

	savePlayerStats();
}

// === Event Listeners ===
DOMContent.btns.explore.addEventListener("click", function () {
	DOMContent.controlsSubmenu.innerHTML = "";

	createButton("Up", DOMContent.controlsSubmenu, () => move("up"));
	createButton("Down", DOMContent.controlsSubmenu, () => move("down"));
	createButton("Left", DOMContent.controlsSubmenu, () => move("left"));
	createButton("Right", DOMContent.controlsSubmenu, () => move("right"));
});

DOMContent.btns.inventory.addEventListener("click", function () {
	DOMContent.controlsSubmenu.innerHTML = "";

	repeat(10, (i) => {
		if (playerStats.inventory[`slot${i + 1}`]) {
			createButton(playerStats.inventory[`slot${i + 1}`].name, DOMContent.controlsSubmenu, function () {
				items.use(playerStats.inventory[`slot${i + 1}`]);
				if (playerStats.inventory[`slot${i + 1}`].type === "heal") {
					playerStats.inventory[`slot${i + 1}`] = null;
				}
			});
		}
	});
});

DOMContent.btns.save.addEventListener("click", savePlayerStats);
DOMContent.btns.clearsave.addEventListener("click", function () {
	localStorage.removeItem("playerStats");
	window.location.reload();
});
document.addEventListener("click", function () {
	DOMContent.gamecontainer.charinfo.level.textContent = `Level: ${playerStats.level}`;
	DOMContent.gamecontainer.charinfo.health.textContent = `Health: ${playerStats.health}`;
	DOMContent.gamecontainer.charinfo.xp.textContent = `XP: ${playerStats.xp}`;
	DOMContent.gamecontainer.charinfo.money.textContent = `Money: ${playerStats.money}`;
})

// === Initial Log ===
log("Welcome to Super RPG Simulator 300000!");