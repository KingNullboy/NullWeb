"use strict";
SharkGame.Log = {
	ed: false,
	 [],
	t: 0,

	
		
		true;

		ze", _.debounce(this.changeHeight, 300));
		);
	

	 {
		;
		<div id='log'></div>");

		Settings.current.logLocation) {
			
				<h3>Log<h3/>").append($("<ul id='messageList'></ul>").addClass("forLeftSide")));
				ive");
				opLogActive");
				;
				
			
				
				
					close-button'>⯆</button>").on("click", log.toggleExtendedLog))
					
				");
				ogActive");
				;
				
			
				v.append("<h3>Log<h3/>").append($("<ul id='messageList'></ul>").addClass("forRightSide")));
				ive");
				opLogActive");
				n", "static").css("top", $("#rightLogContainer").offset().top).css("position", "sticky");
				h();
				
		

		 = _.cloneDeep(log.messages);
		
		s, (message) => {
			very")) {
				
			("error")) {
				
			
				
			
		
	

	ght() {
		ings.current.logLocation !== "left" && SharkGame.Settings.current.logLocation !== "top") {
			
				nt.getElementById("messageList").getBoundingClientRect().top - $("#copyright").height() - 10;
			height", maxHeight + "px");
		
	

	sageEven() {
		ount % 2 === 1;
	

	e(message, sanitizeHtml = false) {
		SharkGame.Settings.current.showAnimations;

		ed) {
			
		
		= $("<li>");
		{
			
		
			
		

		ageEven()) {
			essage");
		

		t, position) {
			
				
				dingClientRect().y : 0) -
				top
			
		

		= document.querySelector("#messageList");
		messageItem);

		rollTop !== 0) {
			sageList");
			
			ength - 1; i > 0; i--) {
				om") > 0) {
					
					
				
			

			essages[_.clamp(highestVisible + 1, log.messages.length - 1)][0];
			ist.scrollTop + height(desiredTopElt, "top");
			rollTop: desiredTop + "px" }, 50, "linear");
		ms) {
			city", 0).prependTo("#messageList").slideDown(50).animate({ opacity: 1.0 }, 100);
		
			sageList");
		

		th();

		 1;

		;
	

	message) {
		ceof Error) {
			
			
		
		= log.addMessage("Error: " + message, true);
		ss("error");
		;
	

	ery(message) {
		= log.addMessage(message);
		ss("discovery");
		;
	

	gLength() {
		SharkGame.Settings.current.showAnimations;
		rkGame.Settings.current.logMessageMax;

		ength >= logMax) {
			> logMax) {
				];
				
				
					"swing", () => {
						
					
				
					
				

				
				
			
		
	

	ages(logThing = true) {
		ment from page
		s, (message) => {
			
		
		
		
		addMessage("Log cleared.");
	

	endedLog() {
		title");
		= $("#messageList");
		sClass("scrollable")) {
			tleDiv");
			rollable");
			
		
			Div");
			lable");
			
		
	

	ssages() {
		s.length > 0;
	
};
