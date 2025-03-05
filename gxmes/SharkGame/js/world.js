"use strict";
SharkGame.World = {
	Type: "start",
	rldType() {
		_worldType;
	
	rldType(worldType) {
		 document.querySelector("body");
		st.remove(this._worldType);
		st.add(worldType);
		ype = worldType;
	
	esources: new Map(),
	estrictedCombinations: new Map(),

	 {
		orldProperties();
		ype = "start";
	

	) {
		rce("world", 1);
		Resource("world", 1);
		);
		rce("specialResourceOne", 1);
		Resource("specialResourceOne", 1);
		rce("specialResourceTwo", 1);
		Resource("specialResourceTwo", 1);
	

	) {
		orldProperties();
		ateCosts();
	

	orldProperties() {
		esources = world.worldResources;
		estrictedCombinations.clear();

		faults
		sourceMap.forEach((_resourceData, resourceName) => {
			(resourceName, {});
			(resourceName).exists = true;
		
	

	orldProperties() {
		esources = world.worldResources;
		nfo = SharkGame.WorldTypes[world.worldType];

		sources allowed on the planet
		o.includedResources) {
			Map.forEach((_resourceData, resourceName) => {
				rceName).exists = false;
			
			ncludedResources, (group) => {
				rnalCategories, group)) {
					ories[group].resources, (resource) => {
						= true;
					
				
					ts = true;
				
			
		

		esources not allowed on planet
		Info.absentResources, (absentResource) => {
			(absentResource).exists = false;
		

		ld modifiers
		Info.modifiers, (modifierData) => {
			modifierData.modifier, modifierData.resource, modifierData.amount);
		
		omeNetwork();
	

	ateCosts() {
		nfo = SharkGame.WorldTypes[world.worldType];

		te.createSlots(worldInfo.gateRequirements);
	

	ldEntryMessage() {
		Game.WorldTypes[world.worldType].entry;
	

	sourceExist(resourceName) {
		.worldResources.get(resourceName).exists;
	

	xistence(resourceName) {
		esources.get(resourceName).exists = true;
	

	tingMission() {
		e.flags.scouting) {
			
		

		s NOT marked as a scouting mission, make sure that's accurate
		t IS marked as a scouting mission, we don't care if that's accurate, just blindly accept)
		.completedWorlds.includes(world.worldType)) {
			a scouting mission
			outing = true;
		
		Game.flags.scouting;
	
};
