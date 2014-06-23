Ext.define('AllInOneWorldSport.controller.MainMenu', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            "mainmenu button[action=playBtnMainMenu]":{
            	tap: "onPlayBtnTap"
            },
            "mainmenu button[action=viewprofile]":{
            	tap: "onProfileBtnTap"
            },
            "gameslist":{
            	itemtap : function(ths, index, target, record){
            		ths.down("button[action=betBtnGameList]").setDisabled(false);
            	}
            },
            "gameslist button[action=betBtnGameList]":{
            	tap: "onGameEventSelected"
            },
            "betpage button[action=showAboutBetBtn]": {
            	tap: "onShowAboutGame"
            },
            "betpage button[action=doBetNow]": {
            	tap: "doBetNow"
            },
            "aboutgame button[action=betNowAboutGame]": {
            	tap: "backToBetNow"
            },
            "betdetail button[action=cancelBet]": {
            	tap: "doCancelBet"
            },
            "betdetail button[action=finalizeBet]": {
            	tap: "doConfirmBet"
            },
			"profile button[action=saveProfile]":{
				tap : "saveProfile"
			},
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
    
    onProfileBtnTap: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		var profile = mainPanel.down("profile");
		if(!profile){
			profile = mainPanel.add({
				xtype: "profile"
			});
		}
		mainPanel.animateActiveItem(profile, {type: "slide", duration: 450});
		this.getListParticipant();
    },
    
    onGameEventSelected: function(btn){
    	var list = btn.up("gameslist"),
    		selectedRec = list.getSelection();
		if(!selectedRec.length){
			return;
		}
		var record = selectedRec[0],
			viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		var betpage = mainPanel.down("betpage");
		if(!betpage){
			betpage = mainPanel.add({
				xtype: "betpage"
			});
		}
		betpage.setGameEventRecord(record);
		mainPanel.animateActiveItem(betpage, {type: "slide", duration: 450});
    },
    
    onShowAboutGame: function(btn){
		var viewport = Ext.Viewport,
			aboutGame = btn.up("betpage"),
			mainPanel = viewport.down("#mainviewport");
		var betpage = mainPanel.down("aboutgame");
		if(!betpage){
			betpage = mainPanel.add({
				xtype: "aboutgame"
			});
		}
		var rec = aboutGame.getGameEventRecord();
		betpage.setGameEventRecord(rec);
		mainPanel.animateActiveItem(betpage, {type: "slide", duration: 450});
    },
    
    backToBetNow: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			betpage = mainPanel.down("betpage");
		if(!betpage){
			betpage = mainPanel.add({
				xtype: "betpage"
			});
		}
		mainPanel.animateActiveItem(betpage, {type: "slide",direction: "right", out: true, duration: 450});
    },
    
    doBetNow: function(btn){
    	var container = btn.up("container"),
    		mainPage = container.up("betpage"),
    		record = mainPage.getGameEventRecord(),
    		selectedTeam = null;
		switch(container.getItemId()){
			case "firstTeamAction": 
				selectedTeam = record.get("EventParticipants")[0];
				break;
			case "secondTeamAction":
				selectedTeam = record.get("EventParticipants")[1];
				break;
		}

		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			betdetail = mainPanel.down("betdetail");
		if(!betdetail){
			betdetail = mainPanel.add({
				xtype: "betdetail",
				gameEventRecord: record
			});
		}
		betdetail.down("[name=EventParticipantId]").setValue(selectedTeam.EventParticipantId);
		betdetail.down("#teamToBet").setHtml(selectedTeam.FirstName + " " + selectedTeam.LastName + 
											"<div class='infotext'>To Win by <span style='font-wieght: bold'>OR</span> No Point Spread</div>");
		mainPanel.animateActiveItem(betdetail, {type: "slide", duration: 450});
    },
    
    doCancelBet: function(){
    	Ext.Msg.confirm("Confirmation", "Are you sure you want to cancel bet?", function(btn){
    		if(btn == "yes"){
				var viewport = Ext.Viewport,
					mainPanel = viewport.down("#mainviewport"),
					mainMenu = mainPanel.down("mainmenu");
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", direction: "right", out: true, duration: 450});
    		}
    	});
    },
		
    doConfirmBet: function(btn){
		var me = this,
			betdetailForm = btn.up("betdetail"),
			values = betdetailForm.getValues(),
			record = betdetailForm.getGameEventRecord(),
			viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			mainMenu = mainPanel.down("mainmenu"),
			currentUser = Ext.decode(localStorage.CURRENT_LOGIN_USER);
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/BET",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			xhr2 : true,
			disableCaching : false,
			jsonData : {
				Amount: 0,
	            BetCode: 4,
	            EventId: record.get("EventId"),
	            EventParticipantId: values.EventParticipantId,
	            Friends: [], //["1627aea5-8e0a-4371-9022-9b504344e724"],
	            MemberId: currentUser.MemberId,
	            Odds: 0,
	            Spread: values.Spread,
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", direction: "right", out: true, duration: 450});
		    	Ext.Msg.alert("Success", "BET created successfully.", function(btn){});
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Communication Error');
				console.log(responce);
			}
		});
    },
	
	getListParticipant:function(){
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/ListParticipants",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			xhr2 : true,
			disableCaching : false,
			jsonData : {
				League:"NFL",
				GroupType: "Conference",
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				Ext.getStore("ListParticipants").setData(data);
				var options = [];
				options[0] = {
						text:"Select Team",
						value:""
				}
				for(var i=0;i<data.length;i++){
					options[i+1] = {
						text:data[i].Name,
						value:i
					}
				}
				
				Ext.getCmp("Participant1ID").setOptions(options);
				Ext.getCmp("Participant2ID").setOptions(options)
				
				
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Communication Error');
				console.log(responce);
			}
		});
	},
	
	saveProfile:function(){
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		
		var particpantValue1 = Ext.getCmp("Participant1ID").getValue();
		var particpantValue2 = Ext.getCmp("Participant2ID").getValue();
		var Participants = [];
		var participantStore = Ext.getStore("ListParticipants");
		if(particpantValue1 == ""){
		}
		else{
			Participants[0]={
				ParticipantId : participantStore.getAt(particpantValue1).data.ParticipantId,
				TypeCode : participantStore.getAt(particpantValue1).data.TypeCode
			}
		}
		
		if(particpantValue2 == ""){
		}
		else{
			Participants[1]={
				ParticipantId : participantStore.getAt(particpantValue2).data.ParticipantId,
				TypeCode : participantStore.getAt(particpantValue2).data.TypeCode
			}
		}
		
		
		
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/UpdateProfile",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			xhr2 : true,
			disableCaching : false,
			jsonData : {
				Member:Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).Member,
				Participants : Participants,
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", direction: "right", out: true, duration: 450});
				
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Communication Error');
				console.log(responce);
			}
		});
	},
	
});
