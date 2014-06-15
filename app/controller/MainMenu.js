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
            },
            "aboutgame button[action=betNowAboutGame]": {
            	tap: "onBetNowBtnTap"
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
		aboutgame.setGameEventRecord(record);
		mainPanel.animateActiveItem(aboutgame, {type: "slide", duration: 450});
    },
    
    onBetNowBtnTap: function(btn){
		var viewport = Ext.Viewport,
			aboutGame = btn.up("aboutgame"),
			mainPanel = viewport.down("#mainviewport");
		var betpage = mainPanel.down("betpage");
		if(!betpage){
			betpage = mainPanel.add({
				xtype: "betpage"
			});
		}
		var rec = aboutGame.getGameEventRecord();
		betpage.setGameEventRecord(rec);
		mainPanel.animateActiveItem(betpage, {type: "slide", duration: 450});
    }
});
