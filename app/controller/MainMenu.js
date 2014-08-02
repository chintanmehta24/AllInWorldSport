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
            "mainmenu button[action=gotoLeaderBoard]":{
            	tap: "goToLeaderBoard"
            	// tap: "goToWinnerCircle"
            },
			"mainmenu button[action=gotoTicketRules]":{
            	tap: "gotoTicketRules"
            },
			"mainmenu button[action=gotoFreeStuff]":{
            	tap: "gotoNextDrawing"
            },
            "button[action=inviteFriendsThroughFacebook]": {
            	tap: "inviteFriendsThroughFacebook"
            },
			// "mainmenu button[action=popupWonWindow]":{
            	// tap: "popupWonWindow"
            // },
			"mainmenu button[action=showMyBets]":{
            	tap: "showMyBets"
            },
			"mainmenu button[action=gotoAccountSettings]":{
				tap: "gotoAccountSettings"
			},
			"mainmenu button[action=gotoBuyCoins]":{
				tap: "buyCoins"
			},
            "gameslist":{
            	itemtap : function(ths, index, target, record){
            		//ths.down("button[action=betBtnGameList]").setDisabled(false);
					this.onGameEventSelected(record)
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
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(gameList, {type: "slide", duration: 450});
		Ext.getStore('GameLists').removeAll();
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
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(profile, {type: "slide", duration: 450});
		this.getListParticipant();
    },
    
    onGameEventSelected: function(record){
    	/*var list = btn.up("gameslist"),
    		selectedRec = list.getSelection();
		if(!selectedRec.length){
			return;
		}*/
		//var record = selectedRec[0],
		var record = record,
			viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		var betpage = mainPanel.down("betpage");
		if(!betpage){
			betpage = mainPanel.add({
				xtype: "betpage"
			});
		}
		betpage.setGameEventRecord(record);
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
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
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
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
		AllInOneWorldSport.Global.NavigationStack.pop();
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
		betdetail.down("#teamToBet").setHtml(selectedTeam.FirstName + " " + selectedTeam.LastName); 
		//"<div class='infotext'>To Win by <span style='font-wieght: bold'>OR</span> No Point Spread</div>");
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
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
				AllInOneWorldSport.Global.NavigationStack = [];
    		}
    	});
    },
		
    doConfirmBet: function(btn){
		/******Avinash********/
		var BetCode="";
		if(getButtonClicked == "")
		{
			Ext.Msg.alert('Error', "Please select atleast one option");
			return;
		}
		else if(getButtonClicked == "ALLIN")
			BetCode = 4;
		else
		{
			if(participantID.length == 0){
				Ext.Msg.alert('Error', "Please select atleast 1 user");
				return;
			}
			else{
				if(getButtonClicked == "Friends")
					BetCode = 0;
				else if(getButtonClicked == "Enemies")
					BetCode = 1;
			}
		}
		
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		/*************/
	
	
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
				Amount: values.Amount,
	            BetCode: BetCode,
	            EventId: record.get("EventId"),
	            EventParticipantId: values.EventParticipantId,
	            Friends: participantID, //["1627aea5-8e0a-4371-9022-9b504344e724"], //Avinash
	            MemberId: currentUser.MemberId,
	            Odds: 0,
	            Spread: values.Spread,
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false); //Avinash
				participantID = []; //Avinash
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
				
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(data.MemberBalance));
				
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", direction: "right", out: true, duration: 450});
				Ext.Function.defer(function(){
			    	Ext.Msg.alert("Success", "BET created successfully.", function(btn){});
				},100);
				AllInOneWorldSport.Global.NavigationStack = [];
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false); //Avinash
				participantID = []; //Avinash
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
    },
	
	getListParticipant:function(){
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		var participantStore_1 = Ext.getStore("ListParticipants1"),
			participantStore_2 = Ext.getStore("ListParticipants2"),
			callbackFn = function(records, operation, success){
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(operation.getResponse().responseText);
				if(data && data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
			};
		participantStore_1.load({
			callback: function(records, operation, success){
				if(!success){
					callbackFn.apply(this, arguments);
				}else{
					participantStore_2.load({
						callback: function(records, operation, success){
							Ext.Viewport.setMasked(false);
							if(!success){
								callbackFn.apply(this, arguments);
							}
							var teams = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).Member.Teams;
							for(var i = 0;i<teams.length;i++){
								if(teams[i].Status == "Favorite")
								{
									if(teams[i].LeagueName == "NFL"){
										if(Ext.getCmp('Participant1ID')!=null)
											Ext.getCmp('Participant1ID').setValue(teams[i].ParticipantId);
										
									}
									else if(teams[i].LeagueName == "NCAA"){
										if(Ext.getCmp('Participant2ID')!=null)
										Ext.getCmp('Participant2ID').setValue(teams[i].ParticipantId);
									}
								}
							}
						}
					});
				}
			}
		});
	},
	
	goToWinnerCircle: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			winnercircle = mainPanel.down("winnercircle");
		if(!winnercircle){
			winnercircle = mainPanel.add({xtype: "winnercircle"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(winnercircle, {type: "slide", direction: "left", duration: 450});
		
	},
	
	goToLeaderBoard: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			leaderboard = mainPanel.down("leaderboard");
		if(!leaderboard){
			leaderboard = mainPanel.add({xtype: "leaderboard"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(leaderboard, {type: "slide", direction: "left", duration: 450});
		this.getListOfTopPlayers();
		
	},
	
	getListOfTopPlayers:function(){
		
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		
		var topFivePlayers = Ext.getStore("LeaderBoardTopFivePlayers"),
		callbackFn = function(records, operation, success){
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(operation.getResponse().responseText);
				if(data && data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
		};
		topFivePlayers.load({
					callback: function(records, operation, success){
						//Ext.Viewport.setMasked(false);
						if(!success){
							callbackFn.apply(this, arguments);
						}
						/*Ext.Viewport.setMasked({
							xtype : "loadmask",
							message : "Please wait"
						});*/
					}
				});
				
		
		var friendStore = Ext.getStore('Friends'),
		callbackFn = function(records, operation, success){
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(operation.getResponse().responseText);
				if(data && data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
		};
		friendStore.load({
					callback: function(records, operation, success){
						Ext.Viewport.setMasked(false);
						if(!success){
							callbackFn.apply(this, arguments);
						}
						var cnt = 0;
						friendStore.clearFilter(true);
						friendStore.filter(function(rec){
							if(cnt<5){
								cnt++;
								return true;
							}
							return false;
						});
					}
				});
	},
	
	
	gotoTicketRules: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			ticketrules = mainPanel.down("ticketrules");
		if(!ticketrules){
			ticketrules = mainPanel.add({xtype: "ticketrules"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(ticketrules, {type: "slide", direction: "left", duration: 450});
	},
	
	gotoNextDrawing: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			nextdrawing = mainPanel.down("nextdrawing");
		if(!nextdrawing){
			nextdrawing = mainPanel.add({xtype: "nextdrawing"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(nextdrawing, {type: "slide", direction: "left", duration: 450});
	}, 
	
	popupWonWindow: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			wonpopup = mainPanel.down("wonpopup");
		if(!wonpopup){
			wonpopup = mainPanel.add({xtype: "wonpopup"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(wonpopup, {type: "slide", direction: "left", duration: 450});
	},
	
	showMyBets: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			mybet = mainPanel.down("mybet");
		if(!mybet){
			mybet = mainPanel.add({xtype: "mybet"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(mybet, {type: "slide", direction: "left", duration: 450});
	},
	
	gotoAccountSettings: function(){
	
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			accountsettings = mainPanel.down("accountsetting");
		if(!accountsettings){
			accountsettings = mainPanel.add({xtype: "accountsetting"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(accountsettings, {type: "slide", direction: "left", duration: 450});
		
	},
	
	buyCoins: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			buycoins = mainPanel.down("buycoins");
		if(!buycoins){
			buycoins = mainPanel.add({xtype: "buycoins"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(buycoins, {type: "slide", direction: "left", duration: 450});
		
	},
	
	inviteFriendsThroughFacebook: function(){
    	var facebookData = Ext.decode(localStorage.getItem("FACEBOOK_DATA"));
    	if(!facebookData){
    		Ext.Msg.alert("Facebook", "No Facebook account attached");
    		return;
    	}
    	Ext.Viewport.setMasked({xtype: "loadmask"});
		Ext.Ajax.request({
			url: "https://graph.facebook.com/v2.0/me/friends",
			params: {
				"access_token": facebookData.access_token,
				"limit": 5000
			},
			method: "GET",
			success: function(response, opts){
		    	Ext.Viewport.setMasked(false);
				var obj = Ext.decode(response.responseText);
        		var friendsList = obj.data,
        			friendDataView = Ext.Viewport.add({
	        			xtype: "facebookfriendlist"
	        		}).show(),
	        		friendDataViewStore = friendDataView.getStore();
        		friendDataViewStore.removeAll();
        		friendDataViewStore.add(friendsList);
			},
			failure: function(){
		    	Ext.Viewport.setMasked(false);
				alert("Error Facebook Friend List");
			}
		});
	}
});
