Ext.define('AllInOneWorldSport.controller.Navigation', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"button[action=backNavigation]":{
				tap : "backNavigation"
			},
			"button[action=homeNavigation]":{
				tap : "homeNavigation"
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
	}
	
});