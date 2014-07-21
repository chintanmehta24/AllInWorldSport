Ext.define('AllInOneWorldSport.controller.MyBets', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"mybet button[action=ListMyBets]":{
				tap:"showBetList"
			},
			"myBetfromfriends dataview": {
				itemtap: "onBetFriendListSelect"
			}
		}
	},
	
	showBetList: function(btn){
		
		var BetCode = 0;
		var BetStatus = "Pending"
		if(btn.getText() == "Friend" || btn.name == "AcceptedFriendsBets" || btn.name == "ExpiredFriendsBets" ){
			BetCode = 0;
			if(btn.name == "AcceptedFriendsBets")
				BetStatus = "Accepted"
			else if(btn.name == "ExpiredFriendsBets")
				BetStatus = "Expired"
		}
		else if(btn.getText() == "Enemies" || btn.name == "AcceptedEnemiesBets" || btn.name == "ExpiredEnemiesBets"){
			BetCode = 1;
			if(btn.name == "AcceptedEnemiesBets")
				BetStatus = "Accepted"
			else if(btn.name == "ExpiredEnemiesBets")
				BetStatus = "Expired"
		}
		else if(btn.getText() == "ALL IN" || btn.name == "AcceptedALLINBets" || btn.name == "ExpiredALLINBets"){
			BetCode = 4;
			if(btn.name == "AcceptedALLINBets")
				BetStatus = "Accepted"
			else if(btn.name == "ExpiredALLINBets")
				BetStatus = "Expired"
		}
		
		this.getBetList(BetCode,BetStatus);
		
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			mybetfromfriend = mainPanel.down("myBetfromfriends");
		if(!mybetfromfriend){
			mybetfromfriend = mainPanel.add({xtype: "myBetfromfriends"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(mybetfromfriend, {type: "slide", direction: "left", duration: 450});
		
		var BetFrom = Ext.getCmp('myBetFrom');
		if(BetCode == 0)
			BetFrom.setHtml("BETS FROM FRIENDS");
		else if(BetCode == 1)
			BetFrom.setHtml("BETS FROM ENEMIES");
		else if(BetCode == 4)
			BetFrom.setHtml("BETS FROM ALL IN")
		
		
	},
	
	getBetList:function(BetCode,BetStatus){
		
		/*var store = Ext.getStore('MyBets');
		store.load({
			jsonData: {
				MemberId: Ext.decode(localStorage.CURRENT_LOGIN_USER).MemberId,
				BetCode: BetCode,
			}
		});*/
	
		var me = this;
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
		var store = Ext.getStore('MyBets');
		store.removeAll();
		
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/ListBetEntries",
			method : "POST",
			disableCaching : false,
			jsonData : {
				MemberId: current_user.MemberId,
				BetCode: BetCode,
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
				var store = Ext.getStore('MyBets');
				store.setData(data);
				store.sync();
				store.load();
				
				store.clearFilter(true);
				store.filter(function(rec){
					var data = rec.getData();
					
					if(data.Bet.Status == BetStatus && data.MyBet == true){
						return true;
						
					}
					return false;
				});
				
				if(store.data.length <= 0){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Message', "No Bets Available");
					},100);
				}
				
				
				
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},
	
	AcceptList:function(BetEntryID,index){
		var me = this;
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
		
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/AcceptBet",
			method : "POST",
			disableCaching : false,
			jsonData : {
				MemberId: current_user.MemberId,
				BetEntryId: BetEntryID,
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
				Ext.Function.defer(function(){
						Ext.Msg.alert('Message', "Bet Accepted Successfully");
					},100);
				var store = Ext.getStore("MyBets");
				store.removeAt(index);
				
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},
	
	onBetFriendListSelect: function(ths, index, record, e, eOpts){
		var me = this;
		if(eOpts.getTarget(".action-btns")){
			if(eOpts.getTarget(".accept-btn")){
				//Ext.Msg.alert("Bet Accepted");
				var store = Ext.getStore("MyBets");
				var BetEntryID = store.getAt(index).data.Bet.BetEntryId;
				me.AcceptList(BetEntryID,index);
			}
			if(eOpts.getTarget(".reject-btn")){
				Ext.Msg.alert("Bet Rejected");
			}
		}
	}
});
