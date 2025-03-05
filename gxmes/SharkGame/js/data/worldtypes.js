"use strict";
SharkGame.WorldTypes = {
	t: {
		"Test",
		"You REALLY shouldn't be seeing this.",
		esc: "testing",
		 "You enter a debug ocean.",
		 "default",
		Resources: [],
		ers: [],
		quirements: {
			
				
				
				,
				
				3,
				1e3,
			
		
	
	rt: {
		"Home",
		"...",
		esc: "strange blue",
		ght: {
			 "...Home.",
			[],
			[],
			",
		
		 "You enter a familiar blue sea, all your previous knowledge a dim memory.",
		 "default",
		edResources: ["basics", "sharks", "rays", "crabs", "basicmaterials", "kelpstuff", "sharkmachines"],
		ers: [],
		tial gate cost, scaled by planetary level
		quirements: {
			
				
				
				,
				
				5,
				8e5,
			
		
	
	ine: {
		"Marine",
		esc: "Feels familiar.",
		"A serene, blue marble.",
		esc: "strange blue",
		ght: {
			Desc: "This place is so familiar.",
			 "A vast, blue ocean, swarming with fish.",
			["laser"],
			["clam", "lobster"],
			
		
		 "You enter a serene blue sea, all your previous knowledge a dim memory.",
		 "default",
		edResources: [
			
			
			
			
			",
			erials",
			f",
			hines",
			
			achines",
		
		Resources: ["laser"],
		ers: [{ type: "multiplier", modifier: "planetaryResourceBoost", resource: "fish", amount: 2 }],
		quirements: {
			
				
				
				1,
				
				e10,
				1e10,
			
		
		5,
	
	en: {
		"Haven",
		esc: "Feels lively.",
		"An aquamarine world of plenty. So beautiful, yet so vulnerable.",
		esc: "thriving aquamarine",
		ght: {
			Desc: "You can sense a lot of activity in this world.",
			 "The water is clear, the sand is clean, and the fish are plenty. A paradise in every way.",
			["laser", "sharkonium"],
			["coral", "dolphin", "whale"],
			 abudance of resources might may your stay here shorter than others.",
		
		 "Remembering nothing, you find yourself in a beautiful atoll. Life will be good here.",
		 "haven",
		edResources: [
			
			
			
			
			",
			
			erials",
			f",
			achines",
			
			
		
		Resources: ["laser"],
		ers: [
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "breeders", amount: 1 },
			multiplier", modifier: "planetaryResourceBoost", resource: "fish", amount: 1 },
		
		quirements: { resources: { chorus: 1 } },
		5,
	
	pestuous: {
		"Tempestuous",
		"A swirling maelstrom where nothing rests.",
		esc: "Feels turbulent.",
		esc: "swirling grey",
		ght: {
			Desc: "It's hard to feel out this place. Everything's constantly moving.",
			
				storm has taken up residence here. It's hard to think, much less get anything done, with all the strong currents whipping stuff around.",
			["kelp", "seaApple", "crystalMiner"],
			["billfish", "seagrass"],
		
		 "You recall nothing and know only the storms. The unrelenting, restless storms scattering your possessions and allies.",
		 "tempestuous",
		edResources: [
			
			
			
			
			r",
			es", // gramatically awful but thats just how it is
			hines",
			erials",
			",
			
			
		
		Resources: ["planter", "crystalMiner"],
		ers: [{ type: "multiplier", modifier: "planetaryIncomeMultiplier", resource: "sandDigger", amount: 24 }],
		quirements: { upgrades: ["cumulusControl"] },
		5,
	
	canic: {
		"Volcanic",
		esc: "Feels hot.",
		"An ocean close to boiling and choking under sulphuric fumes.",
		esc: "searing red",
		ght: {
			Desc: "Horrible heat sears your mind from afar.",
			 "Despite its seemingly inhospitable atmosphere, this world is teeming with life.",
			["crystal", "shark", "kelp"],
			["coral", "sponge", "algae", "shrimp"],
		
		 "The burning waters sear the last traces of your past experiences from you. From beneath, the vents spew forth a heavy cloud of smoke.",
		 "volcanic",
		edResources: [
			
			
			",
			
			rab",
			er",
			,
			rm",
			m",
			erials",
			
			
			
			
		
		Resources: ["crystal", "laser", "planter"],
		ers: [{ type: "multiplier", modifier: "planetaryFishMultiplier", resource: "ray", amount: 15 }],
		quirements: { upgrades: ["apologeticAmnesty"] },
		5,
	
	ndoned: {
		"Abandoned",
		esc: "Feels grimy.",
		"A dying world filled with machinery.",
		esc: "murky dark green",
		ght: {
			Desc: "This world has an aura of death and apathy.",
			esc() {
				
					 is dank and tinted green by " +
					dBeaten("abandoned")
						ourceName("tar", undefined, undefined, sharkcolor.getElementColor("pane")) + "."
						le substance.") +
					inery litter the ocean floor."
				
			
			["seaApple", "kelp"],
			["octopus", "sponge", "clam", "tar"],
			 {
				
					polluted with " +
					dBeaten("abandoned")
						ourceName("tar", undefined, undefined, sharkcolor.getElementColor("pane"))
						le substance" + ". It is only harmful when machines produce it.")
				
			
		
		 "The water is tainted. The pungent smell snaps you awake to the lifeless landscape. You do not know who left this world so torn and empty.",
		 "abandoned",
		 1,
		edResources: [
			,
			
			
			
			s",
			erials",
			hines",
			achines",
			
			
			r",
			
			
			art",
			
			fect",
		
		Resources: ["kelp", "seaApple", "planter"],
		ers: [{ type: "multiplier", modifier: "planetaryIncome", resource: "tar", amount: -0.02 }],
		quirements: { upgrades: ["artifactAssembly"] },
		5,
	
	ouded: {
		"Shrouded",
		esc: "Feels mysterious.",
		"A dark, murky ocean of secrecy.",
		ght: {
			Desc: "You feel a strange power radiating from this world.",
			esc() {
				 place is completely shrouded in darkness. Glowing ${sharktext.getResourceName(
					
					
					
					lementColor("pane"),
				e water and strange figures lurk among the endless shadows.`;
			
			["kelp", "crab", "laser"],
			["jellyfish", "chimaera", "eel"],
		
		esc: "dark mysterious",
		 "Blackness. You know only blindness in these dark forsaken waters. Foggy memory leads you to follow a stream of crystals.",
		 "shrouded",
		edResources: [
			,
			
			
			
			
			s",
			erials",
			hines",
			
			,
			h",
			e",
			fect",
		
		Resources: ["laser"],
		ers: [{ type: "multiplier", modifier: "planetaryIncomeReciprocalMultiplier", resource: "scientist", amount: 1 }],
		quirements: {
			 ["arcaneActivation"],
		
		0,
	
	gid: {
		"Frigid",
		esc: "Feels chilly.",
		"An arctic ocean dangling on the edge of frozen doom.",
		esc: "freezing white",
		ght: {
			Desc: "Bitter cold stings your mind from afar.",
			 "The world is mostly frozen, but a small pocket of warmer water seems to preserve what little chance life has here.",
			["seaApple", "ray"],
			["squid", "urchin"],
			 {
				
					 " +
					sourceName("ice", undefined, undefined, sharkcolor.getElementColor("pane")) +
					
					sourceName("ice", undefined, undefined, sharkcolor.getElementColor("pane")) +
					e of the frenzy, and will be present from the start."
				
			
		
		 "The arctic water freezes away whatever thoughts you may have had. So cold.",
		 "frigid",
		edResources: [
			
			
			
			,
			erials",
			
			hines",
			
			
			,
			
			fect",
		
		ers: [
			
				plier",
				lanetaryIncome",
				ce",
				
			
		
		quirements: {
			
				
				,
				
				
				1e6,
				
			
		
		5,
	
	plate: {
		"",
		"description in gateway",
		esc: "status",
		 "enter world",
		 "default",
		Resources: ["knowledge", "tar", "ice", "heater", "chimaera"],
		ers: [{ type: "multiplier", modifier: "planetaryResourceBoost", resource: "fish", amount: 1.5 }],
		pe: "slots",
		sts: {
			
			
			1,
			
			 1,
			m: 1,
		
	
	ne: {
		"Stone",
		"A world unweathered by ocean currents. It has no natural sand.",
		esc: "rock-bottom",
		 "As you enter, the usual shades of green and yellow are nowhere to be found. You look down, and there's no sand: just cold, hard slate.",
		 "default",
		Resources: [
			e",
			
			
			
			",
			,
			
			
			
			er",
			r",
			her",
			h",
		
		ers: [
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "sponge", amount: 0.5 },
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "shrimp", amount: 0.5 },
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "clamCollector", amount: 0.5 },
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "eggBrooder", amount: 0.5 },
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "sprongeSmelter", amount: 0.5 },
			multiplier", modifier: "planetaryIncomeMultiplier", resource: "ray", amount: 5 },
			restriction", modifier: "planetaryGeneratorRestriction", resource: "ray", amount: "sand" },
			
				iction",
				lanetaryGeneratorRestriction",
				obster",
				d",
			
			
				iction",
				lanetaryGeneratorRestriction",
				cavenger",
				d",
			
		
		pe: "slots",
		sts: {
			e9,
			,
			1e8,
			r: 2,
			e9,
			,
		
	
};
