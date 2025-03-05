"use strict";
window.SharkGame = window.SharkGame || {};

window.onmousemove = (event) => {
	ame.lastActivity = _.now();

	tooltip = document.getElementById("tooltipbox");
	posX = event.clientX;
	posY = event.clientY;

	p.style.top = Math.max(Math.min(posY - 20, window.innerHeight - tooltip.offsetHeight - 10), 20) + "px";
	ld clip over right screen edge
	oltip.offsetWidth + posX + 35 > window.innerWidth) {
		e.left = posX - 10 - tooltip.offsetWidth + "px";
	 {
		e.left = posX + 15 + "px";
	
};

$(document).on("keyup", (event) => {
	ame.lastActivity = _.now();

	mkey = SharkGame.Keybinds.modifierKeys;
	key.ShiftLeft || mkey.ShiftRight) && !event.shiftKey) {
		ft = 0;
		ght = 0;
	 if ((mkey.AltLeft || mkey.AltRight) && !event.altKey) {
		 = 0;
		t = 0;
	 if ((mkey.ControlLeft || mkey.ControlRight) && !event.ctrlKey) {
		Left = 0;
		Right = 0;
	

	arkGame.Keybinds.handleKeyUp(event.code)) {
		tDefault();
	
});

$(document).on("keydown", (event) => {
	ame.lastActivity = _.now();
	arkGame.Keybinds.handleKeyDown(event.code)) {
		tDefault();
	
});

// CORE VARIABLES AND HELPER FUNCTIONS
$.extend(SharkGame, {
	AMES: [
		s A Shark",
		Game",
		Game: Barkfest",
		ker",
		s",
		 Name The Shark Game",
		k",
		,
		
		ms",
		",
		er",
		",
		s",
		
		arkness",
		Recreation",
		e Shark",
		pse",
		rkness",
		ans",
		ier",
		aradise",
		the Crabs",
		
		oes",
		
		ne Ocean",
		",
		obsters",
		x",
		d Dolphins",
		
		 in Frigid",
		f Wall Street",
		game:",
		dition",
		",
		D",
		
		do do-do",
		
		re Continues",
		nued",
		age",
		ition",
		) Edition",
		hark",
		Shark City",
		thing",
		the Lost Shark",
	
	AME: null,
	_GAME_NAME: "Shark Game",
	N: "20250127a",
	AL_VERSION: 0.71,
	N_NAME: "The Tempetuous Update",
	N: 1e-6, // floating point comparison is a joy
	T_SAFE_NUMBER: 1000000000000,
	e300,

	HRESHOLD: 120000,
	ADE_TIME: 5000,

	AL: 1000 / 10, // 20 FPS // I'm pretty sure 1000 / 10 comes out to 10 FPS
	/ 10,
	: _.now(),
	useActivity: _.now(),
	ouseActivity: _.now(),

	ampLastSave: false,
	ampGameStart: false,
	ampRunStart: false,
	ampRunEnd: false,
	ampSimulated: false,

	rHidden: true,
	nerated: false,

	er: false,
	e: false,

	 {},
	tentFlags: {},

	IconPath: "https://github.com/Toby222/SharkGame/blob/alpha/img/sprites.png?raw=true",
	HomeEventPath: "https://github.com/Toby222/SharkGame/blob/alpha/img/homemessagesprites.png?raw=true",

	
	
	ram {any[]} choices
	turns {any} A random element of choices
	
	(choices) {
		es[Math.floor(Math.random() * choices.length)];
	
	geIconHTML(imagePath, width, height) {
		th) {
			//placekitten.com/g/" + Math.floor(width) + "/" + Math.floor(height);
		
		l = "";
		e.Settings.current.iconPositions !== "off") {
			 width=" + width + " height=" + height + " src='" + imagePath + "' class='button-icon'>";
		
		Html;
	
	Sprite(spritePath, imageName, imageDiv, backupImageName) {
		ata;

		th === SharkGame.spriteIconPath) {
			kGame.Sprites;
		pritePath === SharkGame.spriteHomeEventPath) {
			kGame.HomeMessageSprites;
		

		ta = spritesData[imageName];
		v) {
			>");
		

		iginal sprite data is undefined, try loading the backup
		ata) {
			esData[backupImageName];
		

		ta) {
			ground-image", "url(" + spritePath + ")");
			ground-position", "-" + spriteData.frame.x + "px -" + spriteData.frame.y + "px");
			iteData.frame.w);
			riteData.frame.h);
		
			ground-image", 'url("//placehold.it/50x50")');
			;
			);
		
		Div;
	
});

SharkGame.Main = {
	ndler: -1,
	veHandler: -1,

	ramerate() {
		TERVAL = 1000 / SharkGame.Settings.current.framerate;
		 = 1 / SharkGame.Settings.current.framerate;
		kHandler) {
			.tickHandler);
		
		dler = setInterval(main.tick, SharkGame.INTERVAL);
	

	cifically wipe all progress
	ame() {
		ve.wipeSave();
		e();
		me();
	

	rt the game
	 {
		see if i forgot to categorize something
		rCategorizationOversights();

		
		e();
		ve if needed
		Game("load");
		up the game according to this data
		me();

		ri =
			t(window.HTMLElement) ||
			 (typeof safari !== "undefined" && window.safari.pushNotification)).toString() === "[object SafariRemoteNotification]";
		) {
			cted Safari browser!");
			ler.addPaneToStack("Safari Notice", SharkGame.Panes.safariNotice);
		
	

	et all game variables to their defaults
	ves a blank slate
	me() {
		_.now();
		fore = now;
		mestampSimulated = now;
		stActivity = now;
		e.GAME_NAME === null) {
			E = SharkGame.choose(SharkGame.GAME_NAMES);
			harkGame.ACTUAL_GAME_NAME + ": " + SharkGame.GAME_NAME;
		

		mestampLastSave = now;
		mestampGameStart = now;
		mestampRunStart = now;

		emoveClass("inGateway");
		).hide();
		).hide();
		rlay").hide();
		debarHidden = true;
		y errant classes
		emoveClass("gateway");

		 html and remove errant classes from tooltip
		ox")
			omeButtonOrGrotto")
			ncomeTable")
			spectTree")
			spectTreeUnpurchased")
			spectTreeAffordable")
			

		").html("- " + SharkGame.GAME_NAME + " -");
		umber").html(
			{SharkGame.VERSION} - ${SharkGame.VERSION_NAME}<br/>\
Mod of v ${SharkGame.ORIGINAL_VERSION}`,
		
		ttps://api.github.com/repos/Toby222/SharkGame/commits/alpha", (data) => {
			HA = data.sha;
		
		sages(false);
		ttings.current.buyAmount = 1;

		top timer from saying NaN
		rsistentFlags.totalPausedTime = 0;
		rsistentFlags.currentPausedTime = 0;

		resource tables
		sources.init();

		e world
		 GATE IS INITIALISED AFTER WORLD!!
		rld.init();

		netpool and completed worlds and gameover and wongame
		teway.init();

		meEvent lookup
		mories.init();

		requiredBy entries
		pectTree.init();

		e tabs
		me.init();
		b.init();
		ats.init();
		cycler.init();
		te.init();
		flection.init();
		eatsAndDebug.init();

		gs
		ags = {};
		rsistentFlags = {};

		entHandler.init();

		tleBarHandler.init();
		bHandler.init();
		neHandler.init();
		erlayHandler.init();

		ybinds.init();

		sources.minuteHand.init();
		sources.pause.init();
		sources.dial.init();
	

	d stored game data, if there is anything to load
	eGame(goal) {
		) {
			
				GameExists()) {
					
						
						
					
						
					
				
				
			
				
				
			
			ore
		
	

	erpret and use the data from the previous steps
	ame() {
		_.now();
		mestampLastSave = SharkGame.timestampLastSave || now;
		mestampGameStart = SharkGame.timestampGameStart || now;
		mestampRunStart = SharkGame.timestampRunStart || now;

		 up the world because it adds the world resource
		rld.setup();

		pects if necessary
		strictions
		pectTree.setup();

		mories.setup();

		p resources because a lot depends on it
		sources.setup();

		e tabs
		t up lab first
		b.setup();
		me.setup();
		ats.setup();
		cycler.setup();
		te.setup();
		flection.setup();
		eatsAndDebug.setup();

		sources.minuteHand.setup();
		sources.tokens.setup();

		entHandler.setup();

		if necessary
		teway.setup();

		game option if this is a first time run
		tleBarHandler.correctTitleBar();

		k settings
		amerate();

		tings
		Game.Settings, (settingId, settingData) => {
			SharkGame.Settings.current[settingId])) {
				nt[settingId] = settingData.defaultSetting;
				nChange === "function") {
					
				
			
		

		tleBarHandler.updateTopBar();

		osaveHandler === -1) {
			er = setInterval(main.autosave, SharkGame.Settings.current.autosaveFrequency * 60000);
		

		dEventListener("beforeunload", main.autosave);

		e.Settings.current.updateCheck) {
			eHandler = setInterval(main.checkForUpdate, 300000);
		

		on("click", (event) => {
			< 100 && event.clientY > 150 && event.clientY < 200) {
				sList.add("radical");
			
		

		me.persistentFlags.dialSetting) SharkGame.persistentFlags.dialSetting = 1;

		e.persistentFlags.pause) {
			
				
			
			Needed();
			s.needOfflineProgress && SharkGame.Settings.current.truePause) {
				s.currentPausedTime += SharkGame.flags.needOfflineProgress * 1000;
				ineProgress = 0;
			
		

		e.flags.needOfflineProgress && SharkGame.Settings.current.offlineModeActive && !SharkGame.gameOver) {
			ed = SharkGame.flags.needOfflineProgress;

			ings.current.idleEnabled) {
				teHand();
				uteHand(secondsElapsed * 1000);
				ertime.level) {
					d(secondsElapsed * 200 * SharkGame.Aspects.overtime.level);
					condsElapsed * 200 * SharkGame.Aspects.overtime.level);
				
			
				ndsElapsed / SharkGame.persistentFlags.dialSetting, true);
			

			g time gaps
			essages some time later)
			 > 3600) {
				ome back! It's been ";
				oor(secondsElapsed / 3600);
				
					Hours / 24);
					
						/ 7);
						
							;
							
								
								
									
									
									
									
									
							
								
									
									
									
									
									
							
						
							
								 week" + sharktext.plural(numWeeks) + ", you were gone a while!";
						
					
						
							 sharktext.plural(numDays) + ", and look at all the stuff you have now!";
					
				
					1 ? "an" : numHours) + " hour" + sharktext.plural(numHours) + " since you were seen around here!";
				
				ion);
			
			edOfflineProgress = 0;
		

		b after load
		bHandler.setUpTab();
	

	ame() {
		 all the containers!
		.empty();
		sages();
		).empty();
	

	me() {
		s("overscroll-behavior-x", "unset");
		e.gameOver) {
			ntFlags.totalPausedTime = 0;
			ntFlags.currentPausedTime = 0;

			ata object
			";
			
				ON,
				
				ldType },
				
			

			esourceCategories.special.resources, (resourceName) => {
				rceName] = {
					ceName),
					rce(resourceName),
				
			

			spects, ({ level }, aspectId) => {
				cts[aspectId] = level;
			

			= _.cloneDeep(SharkGame.Settings.current);

			Worlds = _.cloneDeep(SharkGame.Gateway.completedWorlds);
			tFlags = _.cloneDeep(SharkGame.persistentFlags);
			l = _.cloneDeep(gateway.planetPool);

			
			LastSave = _.now();
			GameStart = SharkGame.timestampGameStart;
			RunStart = _.now();
			RunEnd = SharkGame.timestampRunEnd;

			= _.cloneDeep(SharkGame.Keybinds.keybinds);

			on = SharkGame.Save.saveUpdaters.length - 1;
			85.encode(pako.deflate(JSON.stringify(saveData), { to: "string" }));

			ortData(saveString);

			lyHourHand();
			eRequestedTime();

			
				);
				ed.");
			
				
			
		
	

	 {
		) {
			
		

		_.now();
		dTime = now - SharkGame.before;

		e) {
			ings.current.truePause) {
				s.currentPausedTime += elapsedTime;
			
				tFlags.everIdled) {
					();
				
				uteHand(elapsedTime * (1 + SharkGame.Aspects.overtime.level * 0.2));
				ime(elapsedTime * SharkGame.Aspects.overtime.level * 0.2);
			
			 now;
			vity = now;
			Tabs.current) {
				
					en(), (_index, button) => {
						
					
					
				
					en(), (_index, button) => {
						
					
					
				
					dren(), (_index, button) => {
						
					
					ldren(), (_index, button) => {
						
					
					
				
					current].code.update();
			
			sTable();
			
		

		me.gameOver) {
			dler.handleEventTick("beforeTick");

			istentFlags.currentPausedTime) {
				s.totalPausedTime += SharkGame.persistentFlags.currentPausedTime;
				s.currentPausedTime = 0;
			

			lier < 1) {
				lapsedTime);
			

			stuff
			e.lastActivity > SharkGame.IDLE_THRESHOLD && res.idleMultiplier === 1 && SharkGame.Settings.current.idleEnabled) {
				sedTime);
			

			.active) {
				uteHand(elapsedTime);
			me.Aspects.overtime.level) {
				uteHand(elapsedTime * 0.2 * SharkGame.Aspects.overtime.level);
				ime(elapsedTime * 0.2 * SharkGame.Aspects.overtime.level);
			

			debar needs to come back
			barHidden) {
				();
			

			SharkGame.INTERVAL) {
				ime.
				kGame.dt * (elapsedTime / SharkGame.INTERVAL));
			
				kGame.dt);
			

			sTable();

			arkGame.Tabs[SharkGame.Tabs.current].code;
			

			er.checkTabUnlocks();

			 now;

			dler.handleEventTick("afterTick");
		
			vity = _.now();
		

		source table tooltip needs updating
		.getElementById("tooltipbox").className.split(" ").includes("forIncomeTable")) {
			ementById("tooltipbox").attributes.current) {
				 document.getElementById("tooltipbox").attributes.current.value);
			
		
	

	dle(now, elapsedTime) {
		erlay = $("#idle-overlay");
		addClass("pointy").removeClass("click-passthrough");
		on("click", main.endIdle);
		lay.is(":hidden")) {
			v").addClass("front");
			.css("opacity", 0).animate({ opacity: 0.8 }, SharkGame.IDLE_FADE_TIME);
		
		nd.toggleOff();
		vedMouseActivity = SharkGame.lastActivity;
		eIdle(now, elapsedTime);
	

	ueIdle(now, elapsedTime) {
		atio = Math.min((now - SharkGame.savedMouseActivity - SharkGame.IDLE_THRESHOLD) / SharkGame.IDLE_FADE_TIME, 1);
		iplier = 1 - speedRatio;

		io > 0.8 && !SharkGame.persistentFlags.everIdled) {
			owMinuteHand();
		
		nd.updateMinuteHand(elapsedTime * speedRatio);
	

	e() {
		erlay = $("#idle-overlay");
		rlay.is(":hidden")) {
			rue).animate({ opacity: 0 }, 800, () => {
				moveClass("front");
				true);
			
		
		removeClass("pointy").addClass("click-passthrough");
		stActivity = _.now();
		iplier = 1;
	

	sSimTime(numberOfSeconds, load = false) {
		lculation
		ncomes(numberOfSeconds, false, load);
	

	ve() {
		
			eGame();
			tosaved.");
		) {
			
		
	

	orUpdate() {
		ttps://api.github.com/repos/Toby222/SharkGame/commits/alpha", (data) => {
			harkGame.COMMIT_SHA) {
				
					
						ds you.<br> On it you can just make out the words <br>"${
							
						
					
					
						
							
							
						
							
							
							 saving.");
						
					
			
		
	

	BuyButtons(customLabel, addToWhere, appendOrPrepend, absoluteOnly) {
		ere) {
			mpted to create buy buttons without specifying what to do with them.");
			
		

		uttons
		List = $("<ul>").attr("id", "buyButtons");
		ndOrPrepend) {
			
				List);
				
			
				nList);
				
			
				to create buy buttons without specifying whether to append or prepend.");
				
		
		Game.Settings.buyAmount.options, (amount) => {
			absoluteOnly) {
				
			

			n = amount === SharkGame.Settings.current.buyAmount;
			
				
					
						 disabled" : ""))
						
				
			
			Label ? customLabel + " " : "buy ";
			
				
					
				{
					
				
					
				
			=== "custom") {
				
			
				ify(amount);
			
			)
				
				llback() {
					
					led")) return;
					custom") {
						false);
					
						true);
					
					Amount = amount === "custom" ? "custom" : parseInt(thisButton.attr("id").slice(4));
					Class("disabled");
					);
				
				{
					} amount of things`);
				
				{
					
				
		
		ppend(
			
				
					
					
					
					
					ttings.current.buyAmount !== "custom"),
			
		
		ElementById("custom-input").addEventListener("input", main.onCustomChange);
		e.Settings.current.customSetting) {
			[0].value = SharkGame.Settings.current.customSetting;
		
	

	omChange() {
		ttings.current.customSetting = $("#custom-input")[0].value;
	

	debarIfNeeded() {
		e any non-zero resources, show sidebar
		e any log entries, show sidebar
		AnyResources()) {
			
			ings.current.showAnimations) {
				);
			
				
			
			 true;
			 shown
			idden = false;
		
	

	e(loadingFromSave) {
		saving
		l(main.autosaveHandler);
		eHandler = -1;

		 as over
		meOver = true;

		game timestamp
		FromSave) {
			pRunEnd = _.now();
		

		 to passage
		rGate(loadingFromSave);
	

	tTime() {
		.worldType === "start" && res.getTotalResource("essence") <= 0;
	

	imers() {
		mestampLastSave = _.now();
		mestampGameStart = _.now();
		mestampRunStart = _.now();
	

	ShowTooltips() {
		sFirstTime() && res.getResource("shark") < 5)) {
			ntFlags.tooltipUnlocked = true;
		
		Game.persistentFlags.tooltipUnlocked;
	

	orCategorizationOversights() {
		Game.ResourceTable, (resourceName, resourceObj) => {
			ryOfResource(resourceName)) {
				${resourceName} does not have a category.`));
			

			esc) {
				${resourceName} does not have a description.`));
			

			ame || !resourceObj.singleName) {
				${resourceName} does not have a name.`));
			
		
		Game.Gateway.allowedWorlds, (worldName) => {
			omeActions[worldName], (actionName) => {
				ory(actionName)) {
					onName} does not have a category.`));
				
			
		
	
};

SharkGame.Button = {
	verscriptButton(id, name, div, handler, hhandler, huhandler) {
		utton>")
			
			
			tton")
			
			er)
			hhandler)
			huhandler);
	

	tton(id, name, div, handler) {
		utton>").html(name).attr("id", id).appendTo(div).on("click", handler);
	
};

SharkGame.Changelog = {
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20250127a": [
		 home message sprite courtesy of <a href='https://github.com/glowkate'>Glowkate</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20241214a": [
		er 2 new sprites courtesy of <a href='https://github.com/glowkate'>Glowkate</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20241128a": [
		er another new sprite courtesy of <a href='https://www.youtube.com/@WorkerDroneMainBattleTrain'>Main Battle Train</a>.",
		er 2 new sprites courtesy of <a href='https://github.com/glowkate'>Glowkate</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20241119a": [
		er new sprite courtesy of <a href='https://www.youtube.com/@WorkerDroneMainBattleTrain'>Main Battle Train</a>.",
		er new sprite courtesy of <a href='https://github.com/glowkate'>Glowkate</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20241106a": [
		 sprite courtesy of <a href='https://www.youtube.com/@WorkerDroneMainBattleTrain'>Main Battle Train</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20240909a": [
		er one new sprite courtesy of <a href='https://github.com/glowkate'>Glowkate</a>!",
		p of new fun facts.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20240906a": [
		er 4 new sprites courtesy of <a href='https://github.com/glowkate'>Glowkate</a>!",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20240819a": [
		er new sprite courtesy of <a href='https://github.com/glowkate'>Glowkate</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20240818a": [
		er new home message image, courtesy of <a href='https://x.com/stormwalker124'>stormwalker</a>.",
		ite for billfish pairs courtesy of <a href='https://github.com/glowkate'>Glowkate</a>.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20240805a": [
		 home message image, courtesy of <a href='https://x.com/stormwalker124'>stormwalker</a>.",
		 where a home message image in Haven wasn't appearing.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20240803a": [
		 upgrade to the starter world: Crystal Scoops, to increase the speed of that world dramatically and make for slightly more interesting crab-to-laser-ray competition.",
		 home message images, courtesy of <a href='https://x.com/stormwalker124'>stormwalker</a>.",
		ed silently in January, but: fixed the negative world time bug.",
		changes to older ones.",
		hrimp home message image not appearing.",
		obster home message image not appearing.",
		ponge filter sprite not appearing.",
		ry sponge sprite disappearing in Volcanic.",
		 home message requirements.",
		home message text at the end of Shrouded and Abandoned.",
		 of the random game tab names.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20230618a": [
		stuous worldtype.",
		message history. You may now freely scroll back and forth between previously seen home messages while in a world.",
		lionth time, attempted to fix negative world time bugs (and failed).",
		rites.",
		ts.",
		s with uncategorized home actions.",
		 with verbose token displaying internal names.",
		 where disabling offline progress did absolutely nothing.",
		related to pausing and the recycler UI.",
		nch of text.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20220712a": [
		 minute hand can now persist between worlds, with a few caveats.",
		 aspects that complement the changes to minute hand time.",
		 pricing and location of aspects on the tree.",
		dle time accruing in the minute hand no longer completely removes it from the UI.",
		ice to use SI units.",
		 where tooltips would persist when changing tabs via hotkey.",
		 where the game throws errors when trying to disable buttons while paused.",
		roved aspect tree on touchscreen devices.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20220630a": [
		ting to disable idle time from the pause button.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20220629a": [
		 with a certain sponge button not appearing.",
		 with pressing buttons that don't exist anymore.",
		 pause button, which now activates idle mode at will.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20220625a": [
		nic worldtype.",
		ACTS! Press to receive a random fun fact! You get different ones based on where you are and what you own!",
		doesn't increase when you are offline or idle. That time is added only if you use it through the minute hand (time from the hour hand aspect is excluded).",
		 tooltips now show how a resource slows or speeds up others.",
		g placeholder art to temporarily supplement actually completed art.",
		ha notice.",
		k to the hub on the titlebar.",
		 (see bottom of page).",
		ch of miscellaneous bugs.",
		ssorted tasks.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> patch 20220603a": [
		e worldtype.",
		riptions are now much more vague until you've visited them.",
		esight greatly decreases vagueness of planet descriptions now.",
		 order of some aspects on the tree.",
		 ending of the Abandoned world.",
		s of the Shrouded world's story.",
		orld gives one bonus essence, bumping its scouting reward to 5 and non-scouting reward to 3.",
		demand, added auto-transmuter to Shrouded.",
		miscellaneous bugs.",
		aked text visibility system",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20220125a": [
		nds. You can now bind a large array of actions to different key combinations.",
		p saves. You can now back up your saves as you wish, with three slots!",
		species/family names when recruiting urchins and squid, instead of weird placeholder messages.",
		unlocking cheats at 1000 lifetime essence, a special backup is automatically created.",
		e for cheats; you don't have to see them if you don't want to.",
		ore UI changes.",
		ect: Anything and Everything",
		ed issues with gateway time spent in last world",
		pped minute hand slider from flopping around",
		ed touchscreen support for the aspect tree",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20211201a": [
		hing special at 1000 total essence.",
		 aspect tree UI to remove unnecessary buttons from below the tree.",
		bugs related to the patience and gumption aspects.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20211109a": [
		p of the aspect tree. Not the final addition to it, though.",
		mode. The game will pause and accumulate idle time after 2 minutes of inactivity.",
		hand now stores offline progress and idle time. You can use your stored time in the form of a multiplier.",
		 playstyle choice because the new idle system does its job better.",
		 scouting. You get more essence when you first play a world, but SOME aspects can't be used.",
		 par times. If you beat a world faster than par, you get extra essence. Go even faster for even more.",
		hanged sprites.",
		",
		out-of-place flavor text.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210814a": [
		ded worldtype.",
		ven worldtype.",
		 aspect tree and its aspects significantly. All aspects must be refunded because of this. Sorry!",
		 a basic 'playstyle' choice. The game will adjust pacing to suit your choice.",
		source table tooltips.",
		 access the options menu in the gateway. (this took a surprising amount of work)",
		 now doesn't reset any settings. Added a separate button to reset settings.",
		es.",
		roved game stability when dealing with large numbers (above a quadrillion).",
		with save wiping and resetting.",
		with grotto.",
		with tooltips in the aspect tree.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210728a": [
		 now be in one of 3 spots. Change which one in options. Default is now right side.",
		rce Affect tooltips; mouse over the multipliers in the R column in the advanced grotto table and you can see what is causing them.",
		in-progress (but functional) aspect table as an alternative to the tree, specifically for accessibility.",
		ction team sprite.",
		rian sprite; decided to repurpose the old philosopher sprite from OG shark game.",
		ltip formatting.",
		ycler UI to eliminate quirkiness.",
		 where costs disappear in no-icons mode.",
		rect description of an aspect.",
		with importing saves.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210713a": [
		ow you how much you already own of what you're buying. Can be turned off in options.",
		ve their numbers scale based on how much of something you're buying. Can be turned off in options.",
		 advanced mode grotto has been enhanced.",
		ven't visited yet will glow. This is on a per-world basis.",
		 bars to some stuff.",
		 order of categories in the resource table to make more sense.",
		se windows by clicking outside of them.",
		u is less wordy.",
		 bunch of upgrade effect descriptions.",
		xes.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210709a": [
		rigid worldtype.",
		e Artifacts system with the Aspects system.",
		en.",
		colors.",
		shows how the world affects resources.",
		ements around to make the game not freak out on smaller screens.",
		mount buttons closer to the places you'll need them, they're not in the tab list anymore!",
		ht' text color mode, screws up some colors but makes colored text easier to read.",
		color-visibility adjuster. Tries to change the color of text if it would be hard to read on a certain background.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210610a": [
		here haven had no essence. Oops.",
		e messages a little.",
		ome previous patch notes.",
		e for octopus investigator.",
		uff.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210515a": ["Added missing flavor text.", "Internal stuff."],
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210422a": [
		 reworked gameplay for the Haven worldtype.",
		ng changes to the UI.",
		otto formatting.",
		 colors for Haven worlds.",
		to, amounts for each producer now update live.",
		of tooltips update live.",
		n tell you more things: for example, it now says how much science you get from sea apples.",
		ized titlebar. You can switch it back to the old one in the options menu.",
		ories to options menu. Now it's readable!",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210314a": [
		elated to how artifacts display in the grotto.",
		elated to artifact affects not applying properly.",
		here the grotto would show an upgrade multiplier for everything, even if it was x1.",
		here artifact effects would not reset when importing.",
		ME PER' statistic to Simple grotto. Shows absolutely how much of a resource you get per generator.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 patch 20210312a": [
		ified grotto.",
		 way easier to understand.",
		ips to income table.",
		l rework of the multiplier system, created the modifier system.",
	
	ef='https://github.com/Toby222/SharkGame'>New Frontiers</a> 0.2 - New Perspectives (2021/??/??)": [
		aotic worldtype. Completely.",
		 gameplay for 1 out of 7 necessary planet reworks.",
		 new assets.",
	
	ef='https://github.com/spencers145/SharkGame'>New Frontiers</a> 0.11 - New Foundations (2021/1/27)": [
		y improved UI for everything.",
		stuff.",
		 themes, so the page now changes color depending on what world you're in.",
		/FPS setting, to make the game smoother and nicer to look at, or chunkier and easier on performance.",
		hase amounts.",
		ace period'. Ice doesn't build up if you have no income for anything.",
		scriptions and distant foresight planet properties are useful.",
		act choices instead of 3. On that note, buffed base essence to 4 per world.",
	
	ef='https://github.com/spencers145/SharkGame'>New Frontiers</a> 0.1 - New is Old (2021/1/7)": [
		TES! More are coming but we couldn't finish all the sprites in time!",
		E PROGRESS! Days are compressed to mere seconds with RK4 calculation.",
		o rebalance worlds, especially frigid and abandoned, by making hazardous materials more threatening and meaningful.",
		effectiveness of the 3 basic shark machines (except sand digger, which is 2/3 as productive), but added a new upgrade to counterbalance it.",
		ler efficiency system. The more you recycle at once, the more you lose in the process. Added an upgrade which makes the mechanic less harsh.",
		I elements to the Recycler to make it less of a guessing game and more of a cost-benefit analysis.",
		he effectiveness of many machines.",
		roved number formatting.",
		r has been disabled because it will probably break plans for future game balance.",
		esight now has a max level of 5, and reveals 20% of world properties per level, up to 100% at level 5.",
		its, bugs, and buggy exploits and exploitable bugs. No more crystals -> clams & sponges -> science & clams -> crystals loop.",
		ence from sponges.",
		lyfish from a bunch of worlds where the resource was a dead end.",
	
	(2014/12/20)": [
		ntroduced and fixed a whole bunch of horrible game breaking bugs. If your save was lost, I'm sorry.",
		cycler stop lying about what could be made.",
		cycler not pay out so much for animals.",
		 no longer reset after completing a run for real this time.",
		eaked gate costs.",
		hine, and one new job.",
		t-chasm-exploration technologies to invest copious amounts of science into.",
	
	 Stranger Oceans (2014/12/19)": [
		 OF NEW STUFF ADDED.",
		stem slightly restructured for something in the future.",
		with some slight changes to availabilities, gate demands, and some other stuff.",
		added to Home Sea tab for the benefit of trying to make sense of all the buttons.",
		 actions show up in highlights for your convenience.",
		gress continues beyond the gate is now... a little tweaked.",
		 no longer reset after completing a run.",
		xist.",
		a work in progress. Apologies for the placeholder graphics in these trying times.",
		duction when there's insufficient resources for things that take costs. Enjoy watching your incomes slow to a trickle!",
	
	(2014/12/12)": [
		ity resource requirement for gate.",
		o fix resource table breaking in some browsers for some sidebar widths.",
	
	(2014/12/12)": [
		ories for buttons in the home sea, because there are going to be so many buttons.",
		us shuffling of files.",
		work laid for v0.7, which will be the actual official release.",
	
	 Return of Shark (2014/12/8)": [
		ical update!",
		s graphics sort of!",
		rrangements:" +
			d techs now show in lab instead of grotto.</li>" +
			 now on right of grotto instead of left.</li>" +
			pace in grotto right column reserved for future use!</li></ul>",
		ersion subtitle!",
		='medDesc'>Added a donate link. Hey, sharks gotta eat.</span>",
	
	(2014/09/30)": [
		all fixes and tweaks!",
		time now shown at the end of a run.",
		 fixes for issues only found in IE11.",
		 that could let people buy hundreds of things for cheap by overwhelming the game's capacity for input. Hopefully fixed, anyway.",
		l media share menu shoehorned in below the game title. Enjoy!",
	
	 (2014/08/20)": [
		apples from the recycler because the feedback loop is actually far more crazy powerful than I was expecting. Whoops!",
	
	(2014/08/18)": ["Changed Recycler so that residue into new machines is linear, but into new resources is constant."],
	(2014/08/18)": [
		ug-fixes.",
		emble residue into new things is now LINEAR (gets more expensive as you have more things) instead of CONSTANT.",
	
	(2014/08/18)": [
		wording of import/export saving.",
		e recycling less HORRIBLY BROKEN in terms of how much a machine is worth.",
	
	2014/08/18)": [
		rotto - a way to better understand what you've accomplished so far.",
		ecycler. Enjoy discovering its function!",
		machines for more machine sand goodness.",
		lation/flickering of resources when at zero with anything providing a negative income.",
		ort' for people stumbling across the page with scripts turned off.",
		ate kelp requirement by 10x, due to request.",
		tracking. Enjoy seeing how much of your life you've invested in this game.",
		ing for displaying resources on the left.",
		help and action descriptions.",
		text to the home tab to let people have an idea of where they should be heading in the very early game.",
		ssistance from others, the saves are now much, much smaller than before.",
		roods less ridiculously explosive.",
		me resource colours.",
		icon, probably.",
		='medDesc'>Added an overdue copyright notice I guess.</span>",
	
	(2014/08-ish)": [
		ow compressed both in local storage and in exported strings.",
		ignificantly reduced.",
		 1/3 max and Buy 1/2 max buttons added.",
		pact now displayed on research buttons.",
		fectiveness multipliers now displayed in table." +
			 not multipliers for how much of that resource you are getting.</li></ul>",
		ehind the scenes things to make the code look nicer.",
		changelog!",
		rades list on the left. It'll come back in a future version.",
		nd crab generating resources, and unlocking techs.",
	
	(2014/08-ish)": ["Bulk of game content added.", "Last update for Seamergency 2014!"],
	2014/08-ish)": ["Added Laboratory tab.", "Added the end of the game tab."],
	2014/08-ish)": ["Added description to options.", "Added save import/export.", "Added the ending panel."],
	(2014/08-ish)": ["Added autosave.", "Income system overhauled.", "Added options panel."],
	(2014/08-ish)": [
		e added. Resources will increase even with the game off!",
		ncome not guaranteed to be 100% accurate.)",
	
	(2014/08-ish)": ["Save and load added."],
	 (2014/08-ish)": ["A whole bunch of stuff.", "Resource table, log, initial buttons, the works."],
};

$(() => {
	me").show();
	nit();
});
