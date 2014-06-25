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
		Ext.getStore("ListParticipants").load({
			jsonData: {
				League:"NFL",
				GroupType: "Conference"
			},
			callback: function(records, operation, success){
				Ext.Viewport.setMasked(false);
				if(!success){
					var data = Ext.decode(operation.getResponse().responseText);
					if(data && data.errorReason && data.errorReason.ReasonCode){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
						return;
					}
				}
			}
		});
	},
	
	saveProfile:function(btn){
		var me = this,
			formPanel = btn.up("profile"),
			values = formPanel.getValues(),
			ParticipantTeams = formPanel.query("[name=Participant]");
			
		if(values.Participant.length !== 2 && Ext.isEmpty(values.Participant[0]) && Ext.isEmpty(values.Participant[1])){
			Ext.Msg.alert("Error", "Please select the team");
			return;
		}
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		
		var Participants = [];
		var participate1 = ParticipantTeams[0].getRecord(),
			participate2 = ParticipantTeams[1].getRecord();
		Participants = [{
			ParticipantId : participate1.get("ParticipantId"),
			TypeCode : participate1.get("TypeCode")
		}, {
			ParticipantId : participate2.get("ParticipantId"),
			TypeCode : participate2.get("TypeCode")
		}];
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
			loginName = localStorage.getItem("CURRENT_USER_LOGINNAME");
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/UpdateProfile",
			method : "POST",
			disableCaching : false,
			jsonData : {
				MemberId: current_user.MemberId,
				Member: {
					DisplayName: current_user.Member.FirstName,
	                FirstName: values.FirstName,
	                LastName: current_user.Member.LastName,
	                LoginName: loginName,//current_user,
	                EmailAddress: values.Email,
	                PrimaryPhone: current_user.Member.PrimaryPhone,
	                MemberId: current_user.MemberId
				},//Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).Member,
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
