const START_MONEY = 1000;
const SPIN_COST = 50;
const MAX_SLOTS = 6;

const symbols = ["🍒","🍋","🔔","⭐","7️⃣"];
// Base payouts without multipliers; upgrades will increase these
const basePayouts = {
	"🍒": {two:20,three:150,four:400,five:800,six:1500},
	"🍋": {two:30,three:200,four:450,five:900,six:1700},
	"🔔": {two:40,three:300,four:600,five:1200,six:2000},
	"⭐": {two:60,three:500,four:1000,five:2000,six:3000},
	"7️⃣": {two:100,three:1000,four:2000,five:4000,six:7000}
};

const defaultState = {
	money: START_MONEY,
	slots: 3,
	slotValues: [],
	spins: 0,
	wins: 0,
	losses: 0,
	totalWon: 0,
	totalSpent: 0,
	achievements: {},
	lastWinsInARow: 0,
	symbolUpgrades: { "🍒":0, "🍋":0, "🔔":0, "⭐":0, "7️⃣":0 } // tracks how many upgrades each symbol has
};

let state = { ...defaultState, ...(JSON.parse(localStorage.getItem("slotState")) || {}) };

const moneyText = document.getElementById("money");
const slotsDiv = document.getElementById("slots");
const resultText = document.getElementById("result");
const statsDiv = document.getElementById("stats");
const upgradesDiv = document.getElementById("upgrades");
const achievementsDiv = document.getElementById("achievements");
const spinBtn = document.getElementById("spin");

function save() { localStorage.setItem("slotState", JSON.stringify(state)); }

function updateUI(){
	moneyText.textContent = `Money: $${state.money}`;
	statsDiv.innerHTML = `
		Spins: ${state.spins}<br>
		Wins: ${state.wins}<br>
		Losses: ${state.losses}<br>
		Spent: $${state.totalSpent}<br>
		Won: $${state.totalWon}
	`;
	renderSlots();
	renderAchievements();
	save();
}

function renderSlots(){
	while(state.slotValues.length < state.slots) state.slotValues.push("❔");
	state.slotValues.length = state.slots;

	slotsDiv.innerHTML = "";
	state.slotValues.forEach(val => {
		const d = document.createElement("div");
		d.className = "slot"; 
		d.textContent = val;
		slotsDiv.appendChild(d);
	});
}

function randomSymbol(){ return symbols[Math.floor(Math.random()*symbols.length)]; }

function spinSlot(el, index, delay){
	el.classList.add("spinning");
	return new Promise(resolve => {
		const int = setInterval(()=>el.textContent=randomSymbol(),120); // slower symbol changes
		setTimeout(()=>{
			clearInterval(int);
			el.classList.remove("spinning");
			state.slotValues[index]=el.textContent;
			resolve(el.textContent);
		}, delay);
	});
}

/* ===== Achievements Definitions ===== */
const ACHIEVEMENTS = [
	{ id:"firstSpin", name:"First Spin", desc:"Spin for the first time", check:()=>state.spins>=1 },
	{ id:"bigWin", name:"Big Winner", desc:"Win $500 or more in a single spin", check:(win)=>win>=500 },
	{ id:"slotCollector", name:"Slot Collector", desc:"Unlock all 6 reels", check:()=>state.slots===6 },
	{ id:"luckyStreak", name:"Lucky Streak", desc:"Win 3 spins in a row", check:()=>state.lastWinsInARow>=3 },
	{ id:"jackpot", name:"Jackpot", desc:"Win 7️⃣ on all reels", check:()=>state.slotValues.every(v=>"7️⃣"===v) },
	{ id:"persistent", name:"Persistent", desc:"Reach 50 spins", check:()=>state.spins>=50 }
];

function showToast(msg){
	const div = document.createElement("div");
	div.textContent = msg;
	div.className = "toast";
	document.body.appendChild(div);
	setTimeout(()=>div.remove(), 2500);
}

function checkAchievements(win){
	let moneyBoost = 0;
	ACHIEVEMENTS.forEach(a=>{
		if(!state.achievements[a.id] && a.check(win)){
			state.achievements[a.id]=true;
			showToast(`🏆 Achievement Unlocked: ${a.name}!`);
			moneyBoost += 0.002;
		}
	});
	if(moneyBoost){
		state.money = Math.round(state.money * (1+moneyBoost)/10)*10;
	}
}

function renderAchievements(){
	achievementsDiv.innerHTML="";
	ACHIEVEMENTS.forEach(a=>{
		const unlocked = state.achievements[a.id] || false;
		const div = document.createElement("div");
		div.className = "achievement";
		div.textContent = unlocked ? `✅ ${a.name} — ${a.desc}` : `❌ ${a.name} — ${a.desc}`;
		achievementsDiv.appendChild(div);
	});
}

/* ===== SPIN LOGIC ===== */
spinBtn.onclick = async ()=>{
	if(state.money<SPIN_COST){ showGameOver(); return; }

	state.money-=SPIN_COST; state.totalSpent+=SPIN_COST; state.spins++;
	spinBtn.disabled=true; resultText.textContent="";

	const slotEls = Array.from(document.querySelectorAll(".slot"));
	const delays = slotEls.map(() => 1200 + Math.random() * 800); // spin duration per reel

	const results = [];
	slotEls.forEach((el)=>el.classList.add("spinning"));
	for (let i=0; i<slotEls.length; i++){
		await new Promise(r=>setTimeout(r, i*250)); // staggered stops
		results.push(await spinSlot(slotEls[i], i, delays[i]));
	}

	// Count symbol occurrences
	const counts = {};
	results.forEach(r=>counts[r]=(counts[r]||0)+1);

	// Calculate wins based on symbol upgrades
	let win = 0;
	for(const sym of Object.keys(counts)){
		const c = counts[sym];
		if(c>=2){
			let payout = 0;
			if(c>=6) payout = basePayouts[sym].six;
			else if(c===5) payout = basePayouts[sym].five;
			else if(c===4) payout = basePayouts[sym].four;
			else if(c===3) payout = basePayouts[sym].three;
			else if(c===2) payout = basePayouts[sym].two;

			// Apply per-symbol upgrade bonus: +10% per upgrade level
			const bonusMultiplier = 1 + 0.1*state.symbolUpgrades[sym];
			payout = Math.round(payout * bonusMultiplier);
			win += payout;
		}
	}

	if(win>0){
		state.money+=win; state.totalWon+=win; state.wins++; resultText.textContent=`🎉 WIN +$${win}`;
		state.lastWinsInARow++; 
	}else{ state.losses++; resultText.textContent="No win."; state.lastWinsInARow=0; }

	spinBtn.disabled = state.money<=0;
	checkAchievements(win);
	updateUI();
};

/* ===== GAME OVER OVERLAY ===== */
function showGameOver(){
	const overlay = document.createElement("div");
	overlay.id="gameOverOverlay";
	overlay.innerHTML = `<div>💀 GAME OVER 💀<br><button id="retryBtn">Retry</button></div>`;
	document.body.appendChild(overlay);
	document.getElementById("retryBtn").onclick = ()=>{
		document.body.removeChild(overlay);
		state = {...defaultState};
		updateUI();
	};
}

/* ===== RESET BUTTON ===== */
document.getElementById("reset").onclick = ()=>{
	state = {...defaultState};
	updateUI();
};

updateUI();

// Popup elements
const upgradesPopup = document.getElementById("upgradesPopup");
const achievementsPopup = document.getElementById("achievementsPopup");
document.getElementById("openAchievements").onclick = ()=> achievementsPopup.style.display="flex";

// Close buttons
document.querySelectorAll(".closePopup").forEach(btn=>{
	btn.onclick = ()=> {
		btn.closest(".popup").style.display="none";
	};
});

// --- Popup handling ---
const techTreePopup = document.getElementById("techTreePopup");
document.getElementById("openTechTree").onclick = () => {
    techTreePopup.style.display = "flex";
    renderTechTree(); // <-- must call to fill the popup
};

// --- Tech tree data ---
const techNodes = [
  // Slot chain
  { id:"slot1", name:"+1 Slot", x:700, y:50, cost:800, prereq:null },
  { id:"slot2", name:"+1 Slot", x:700, y:150, cost:1600, prereq:"slot1" },
  { id:"slot3", name:"+1 Slot", x:700, y:250, cost:2400, prereq:"slot2" },

  // Lemon 🍋 upgrades
  { id:"lem1", name:"Upgrade 🍋 Lv1", x:500, y:150, cost:200, prereq:null },
  { id:"lem2", name:"Upgrade 🍋 Lv2", x:500, y:250, cost:400, prereq:"lem1" },
  { id:"lem3", name:"Upgrade 🍋 Lv3", x:500, y:350, cost:600, prereq:"lem2" },

  // Cherry 🍒 upgrades
  { id:"cherry1", name:"Upgrade 🍒 Lv1", x:900, y:150, cost:200, prereq:null },
  { id:"cherry2", name:"Upgrade 🍒 Lv2", x:900, y:250, cost:400, prereq:"cherry1" },
  { id:"cherry3", name:"Upgrade 🍒 Lv3", x:900, y:350, cost:600, prereq:"cherry2" },

  // Bell 🔔 upgrades
  { id:"bell1", name:"Upgrade 🔔 Lv1", x:400, y:450, cost:300, prereq:null },
  { id:"bell2", name:"Upgrade 🔔 Lv2", x:400, y:550, cost:500, prereq:"bell1" },
  { id:"bell3", name:"Upgrade 🔔 Lv3", x:400, y:650, cost:700, prereq:"bell2" },

  // Star ⭐ upgrades
  { id:"star1", name:"Upgrade ⭐ Lv1", x:700, y:450, cost:400, prereq:null },
  { id:"star2", name:"Upgrade ⭐ Lv2", x:700, y:550, cost:600, prereq:"star1" },
  { id:"star3", name:"Upgrade ⭐ Lv3", x:700, y:650, cost:800, prereq:"star2" },

  // Seven 7️⃣ upgrades
  { id:"seven1", name:"Upgrade 7️⃣ Lv1", x:1000, y:450, cost:500, prereq:null },
  { id:"seven2", name:"Upgrade 7️⃣ Lv2", x:1000, y:550, cost:800, prereq:"seven1" },
  { id:"seven3", name:"Upgrade 7️⃣ Lv3", x:1000, y:650, cost:1200, prereq:"seven2" }
];

function renderTechTree() {
  const container = document.getElementById("techTree");
  container.innerHTML = "";

  // 1️⃣ First, sync node unlocked states from saved state
  techNodes.forEach(node => {
    // Slot nodes
    if (node.name.includes("Slot")) {
      const slotNumber = parseInt(node.id.replace("slot", ""), 10);
      node.unlocked = state.slots >= 3 + slotNumber; // base slots = 3
    }
    // Fruit nodes
    symbols.forEach(sym => {
      if (node.name.includes(sym)) {
        const level = state.symbolUpgrades[sym];
        const nodeLevel = parseInt(node.name.match(/Lv(\d+)/)[1], 10);
        node.unlocked = nodeLevel <= level;
      }
    });
  });

  // 2️⃣ Draw lines first so they appear behind nodes
  techNodes.forEach(node => {
    if (!node.prereq) return;
    const parent = techNodes.find(n => n.id === node.prereq);
    const line = document.createElement("div");
    line.className = "techLine";
    const x1 = parent.x + 60;
    const y1 = parent.y + 20;
    const x2 = node.x + 60;
    const y2 = node.y + 20;
    const width = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = width + "px";
    line.style.height = "4px";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.position = "absolute";
    line.style.background = "#fff";
    line.style.transformOrigin = "0 0";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.zIndex = "0"; // behind nodes

    container.appendChild(line);
  });

  // 3️⃣ Draw nodes on top of lines
  techNodes.forEach(node => {
    const div = document.createElement("div");
    div.className = "techNode";
    div.style.left = node.x + "px";
    div.style.top = node.y + "px";
    div.style.position = "absolute";
    div.style.zIndex = "1"; // above lines
    div.textContent = node.name;

    const prereqUnlocked = !node.prereq || techNodes.find(n => n.id === node.prereq).unlocked;
    const affordable = state.money >= node.cost && !node.unlocked && prereqUnlocked;

    // Set border color
    if (node.unlocked) {
      div.style.border = "2px solid yellow"; // purchased
      div.style.opacity = 1;
    } else {
      div.style.border = "2px solid red";   // unpurchased
      div.style.opacity = affordable ? 1 : 0.5;
    }

    // Tooltip showing cost
    div.title = `Cost: $${node.cost}`;

    div.onclick = () => {
      if (!prereqUnlocked) return showToast("Unlock prerequisite first!");
      if (node.unlocked) return; // already purchased
      if (state.money < node.cost) return showToast("Not enough money!");

      state.money -= node.cost;
      node.unlocked = true;

      // Apply symbol upgrade if fruit
      symbols.forEach(sym => {
        if (node.name.includes(sym)) state.symbolUpgrades[sym]++;
      });

      // Apply slot upgrade if node is a slot
      if (node.name.includes("Slot")) state.slots++;

      showToast(`${node.name} unlocked!`);
      updateUI();
      renderTechTree(); // re-render to update lines/colors
    };

    container.appendChild(div);
  });
}

// Export current save
document.getElementById("exportSave").onclick = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "slotSave.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Save exported!");
};

// Import save
document.getElementById("importSave").onclick = () => {
    document.getElementById("importFile").click();
};

document.getElementById("importFile").onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            // Optional: verify structure
            if (imported.money !== undefined && imported.slots !== undefined) {
                state = imported;
                updateUI();
                renderTechTree();
                showToast("Save loaded!");
            } else {
                alert("Invalid save file!");
            }
        } catch (err) {
            alert("Error reading save file!");
        }
    };
    reader.readAsText(file);
};
