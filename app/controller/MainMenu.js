Ext.define('AllInOneWorldSport.controller.MainMenu', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            "mainmenu button[action=playBtnMainMenu]":{
            	tap: "onPlayBtnTap"
            },
            "gameslist":{
            	itemtap : "onGameEventSelected"
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },
    
    onPlayBtnTap: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		var gameList = mainPanel.down("gameslist");
		if(!gameList){
			gameList = mainPanel.add({
				xtype: "gameslist"
			});
		}
		mainPanel.animateActiveItem(gameList, {type: "slide", duration: 450});
    },
    
    onGameEventSelected: function(list, index, target, record, e, eObj){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		var aboutgame = mainPanel.down("aboutgame");
		if(!aboutgame){
			aboutgame = mainPanel.add({
				xtype: "aboutgame"
			});
		}
		mainPanel.animateActiveItem(aboutgame, {type: "slide", duration: 450});
    }
});
