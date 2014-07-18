Ext.define('AllInOneWorldSport.controller.Navigation', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"button[action=backNavigation]":{
				tap : "backNavigation"
			},
			"button[action=homeNavigation]":{
				tap : "homeNavigation"
			},
			"button[action=myBetNavigation]":{
				tap : "myBetNavigation"
			},		
			"button[action=ticketRulesNavigation]":{
				tap : "gotoTicketRules"
			},	
			"button[action=buyCoinsNavigation]":{
				tap : "buyCoins"
			},			
		}
	},
	
	backNavigation:function(){
		var View = AllInOneWorldSport.Global.NavigationStack.pop();
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		
		mainPanel.animateActiveItem(View, {type: "slide",direction: "right", duration: 450});
		
	},
	homeNavigation:function(){
		AllInOneWorldSport.Global.NavigationStack = [];
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		var mainMenu = mainPanel.down("mainmenu");
		if(!mainMenu){
			mainMenu = mainPanel.add({xtype: "mainmenu"});
		}
		mainPanel.animateActiveItem(mainMenu, {type: "slide",direction: "right", duration: 450});
	},
	myBetNavigation:function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			mybet = mainPanel.down("mybet");
		if(!mybet){
			mybet = mainPanel.add({xtype: "mybet"});
		}
		if(mybet != mainPanel.getActiveItem()){
			AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
			mainPanel.animateActiveItem(mybet, {type: "slide", direction: "left", duration: 450});
		
		}
	},
	
	gotoTicketRules: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			ticketrules = mainPanel.down("ticketrules");
		if(!ticketrules){
			ticketrules = mainPanel.add({xtype: "ticketrules"});
		}
		if(ticketrules != mainPanel.getActiveItem()){
			AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
			mainPanel.animateActiveItem(ticketrules, {type: "slide", direction: "left", duration: 450});
		}
	},
	
	buyCoins: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			buycoins = mainPanel.down("buycoins");
		if(!buycoins){
			buycoins = mainPanel.add({xtype: "buycoins"});
		}
		if(buycoins != mainPanel.getActiveItem()){
			AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
			mainPanel.animateActiveItem(buycoins, {type: "slide", direction: "left", duration: 450});
		}
	},
	
});