SharkGame.Keybinds = {
	tBinds: {
		d home ocean button",
		se current pane",
		
		l buying buttons",
		ost upgrade",
		ll tokens",
		 "switch to home tab",
		 "switch to lab tab",
		 "switch to grotto tab",
		 "switch to recycler tab",
		 "switch to gate tab",
		 "switch to reflection tab",
		 "switch to buy 1",
		 "switch to buy 10",
		 "switch to buy 100",
		 "switch to buy 1/3 max",
		 "switch to buy 1/2 max",
		 "switch to buy max",
		 "switch to buy custom",
		": "open options",
		": "save",
	
	ds: {},

	s: [
		
		cean button",
		nt pane",
		uying buttons",
		 upgrade",
		tokens",
		 time use",
		
		
		,
		,
		s",
		ome tab",
		ab tab",
		rotto tab",
		ecycler tab",
		ate tab",
		eflection tab",
		 button tab left",
		 button tab right",
		uy 1",
		uy 10",
		uy 100",
		uy 1/3 max",
		uy 1/2 max",
		uy max",
		uy custom",
	

	erKeys: {
		,
		0,
		
		
		 0,
		: 0,
	

	 {
		yObject(this.keybinds)) {
			ToDefault();
		
		e = false;
		eLock = false;
		Key = false;
		Action = undefined;
		Key = undefined;
	

	) {},

	eybindsToDefault() {
		s = _.cloneDeep(this.defaultBinds);
	

	ssKeyID(keyID) {
		D.replace(/ /gi, "").replace("+", "-");
		;
	

	ctionID(actionID) {
		tions.includes(actionID)) {
			Actions.getActionTable()[actionID]) {
				ppens to have a name in this world
				eActions.getActionData(SharkGame.HomeActions.getActionTable(), actionID).name;
			
				ch to find the name of this action
				ions, (homeActionsObject) => {
					== "object" && homeActionsObject[actionID]) {
						D].name;
						
					
				
			
		

		nID;
	

	es IDs human-readable
	D(keyID) {
		D
			"")
			)
			", "Caps Lock")
			, "Num Lock")
			ck", "Scroll Lock")
			enu", "Context Menu");
		t", "Right", "Up", "Down", "Numpad"], (direction) => {
			(direction)) {
				+ keyID.replace(direction, "");
			
		
		D.replace("Up Page", "Page Up").replace("Down Page", "Page Down");
		;
	

	eKeys(keyID) {
		ft", "Alt", "Control"], (modifier) => {
			(modifier)) return;
			eys[modifier + "Left"] || this.modifierKeys[modifier + "Right"]) {
				 + keyID;
			
		

		;
	

	KeyUp(keyID) {
		ersEntry = this.modifierKeys[keyID];
		efined(modifiersEntry)) {
			keyID] = 0;
		

		.cleanID(keyID);
		.composeKeys(keyID);

		ction = this.keybinds[keyID];
		dMode && boundAction !== "bind home ocean button") {
			modifiersEntry)) {
				
				();
			
		oundAction) {
			UpBind(boundAction);
		
	

	KeyDown(keyID) {
		ersEntry = this.modifierKeys[keyID];
		fier = !_.isUndefined(modifiersEntry);
		er) {
			keyID] = 1;
		

		.cleanID(keyID);
		.composeKeys(keyID);

		ction = this.keybinds[keyID];
		dMode && boundAction !== "bind home ocean button") {
			
				
				();
			
		his.waitForKey && !boundAction && !$.isEmptyObject($("#new-bind-button")) && !isModifier) {
			nd(keyID);
			
		oundAction) {
			DownBind(boundAction);
		
	

	UpBind(actionType) {
		mpDisableBind) {
			) {
				
					
						SharkGame.HomeActions.getActionTable(), actionType) &&
						utton-pressed")
					
						p-button-pressed");
						
					
						
					
			
			
		
	

	DownBind(actionType) {
		 to remember to search all homeaction worlds in order when
		or the data associated with it
		mpDisableBind && actionType) {
			) {
				
					
				
					
					pose
					
				tton":
					
						
					
					
				":
					Pane();
					
				
					on.level && !SharkGame.gameOver) {
						
					
					
				":
					itchTab("home");
					
				:
					itchTab("lab");
					
				ab":
					itchTab("stats");
					
				 tab":
					itchTab("recycler");
					
				":
					itchTab("gate");
					
				on tab":
					itchTab("reflection");
					
				 tab left":
					 "home") {
						sButtonTab());
					
					
				 tab right":
					 "home") {
						tonTab());
					
					
				
					abled")) {
						 = 1;
						true);
						"disabled");
						
					
					
				
					sabled")) {
						 = 10;
						true);
						"disabled");
						
					
					
				:
					isabled")) {
						 = 100;
						true);
						"disabled");
						
					
					
				max":
					sabled")) {
						 = -3;
						true);
						"disabled");
						
					
					
				max":
					sabled")) {
						 = -2;
						true);
						"disabled");
						
					
					
				:
					sabled")) {
						 = -1;
						true);
						"disabled");
						
					
					
				om":
					("disabled")) {
						 = "custom";
						false);
						"disabled");
						);
					
					
				
					aneAlreadyUp("Options")) {
						
					
					
				
					
					d game.");
					
				
					
						);
					
					
				se":
					everIdled && !SharkGame.gameOver) {
						
					
					
				:
					) => {
						e, token);
					
					
				e":
					
						Lab.findAllAffordableUpgrades()[0]);
					
					
				uttons":
					lButtonsThisTick) {
						Name, actionData) => {
							 because
							riable in the switch statement
							
							onData(SharkGame.HomeActions.getActionTable(), actionName);
							onData) && home.shouldHomeButtonBeUsable(actionData) && !actionData.isRemoved) {
								
							
						
						sTick = true;
					
					
				
					n()) {
						
					
					
				
					ctionData(SharkGame.HomeActions.getActionTable(), actionType)) {
						utton-pressed");
					
						
					
			
			
		
		;
	

	bind(keyID, actionType) {
		s[keyID] = actionType;
	

	nuNewBind(keyID) {
		Key = false;
		ind(keyID, "nothing");
		ke the whole pane
		neHandler.nextPaneInStack();
		neHandler.showKeybinds();
	

	BindModeOverlay(toggledByKey) {
		dMode) {
			rlayHandler.isOverlayShown()) {
				.revealOverlay(250, 0.8);
			

			hildren().addClass("front");

			r = $("<div>").attr("id", "keybind-overlay-container");
			"width", SharkGame.Settings.current.sidebarWidth);

			y();

			nd($("<h1>").html("ACTION BIND MODE"));
			this.settingAction) && _.isUndefined(this.settingKey)) {
				<p>").html("<strong>Click the button you want to bind, then press a key to bind it to.</strong>"));
			defined(this.settingAction) && _.isUndefined(this.settingKey)) {
				<p>").html(`<strong>Press a key to bind to ${this.cleanActionID(this.settingAction)}.</strong>`));
			efined(this.settingAction) && !_.isUndefined(this.settingKey)) {
				<p>").html(`<strong>Click a button to bind to ${this.settingKey}.</strong>`));
			
				<p>").html(`<strong>Bound ${this.settingKey} to ${this.cleanActionID(this.settingAction)}.</strong>`));
			

			nd(textConatiner);
			
				
					
				
				);
		
			"cursor", "");
			= true;
			{
				.hideOverlay(250, () => {
					moveClass("front");
					
					
					
				
			
				
					verlay(250, () => {
						ass("front");
						
						
						
					
				
			
		
	

	BindModeState(toggledByKey) {
		indModeOverlay(toggledByKey);
		ckForBindModeCombo()) {
			is.composeKeys(this.settingKey), this.settingAction);
			e();
		
	

	orBindModeCombo() {
		settingAction && this.settingKey;
	

	BindMode(toggledByKey) {
		nd mode:
		ttingaction and settingkey to undefined
		le the bindmode property in sharkgame.keybinds
		it was just turned on, pop up an overlay window if not in the gate
		e to turn off overlay in keybinds init)
		 just turned off, remove the overlay
		
		 don't accept input from the bind mode toggle key
		n test to see if its the bindmode key and turn off bindmode if it is
		n test to see if it's not a modifier key
		ot a modifier key, set the overlay to display the key on it,
		he settingkey property in sharkgame.keybinds
		 to see if we have a settingaction
		 bind it and toggle bind mode
		
		utton press, check for bindmode
		de, set settingaction, update the overlay, and run checkForCombo

		Key = undefined;
		Action = undefined;

		e.PaneHandler.isStackClosable() && SharkGame.Tabs.current === "home") {
			 {
				
			
				
				yWipeStack();
			

			eState(toggledByKey);
		
	
};
