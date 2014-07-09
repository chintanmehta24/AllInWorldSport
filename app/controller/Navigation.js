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
			"button[action=accountSettingNavigation]":{
				tap : "accountSettingNavigation"
			}			
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
	accountSettingNavigation:function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			accountsettings = mainPanel.down("accountsetting");
		if(!accountsettings){
			accountsettings = mainPanel.add({xtype: "accountsetting"});
		}
		if(accountsettings != mainPanel.getActiveItem()){
			AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
			mainPanel.animateActiveItem(accountsettings, {type: "slide", direction: "left", duration: 450});
		
		}
	}
	
});