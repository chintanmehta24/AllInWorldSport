Ext.define('AllInOneWorldSport.controller.MyBets', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"mybet button[action=ListMyBets]":{
				tap:"showBetList"
			},
			
		}
	},
	
	showBetList: function(btn){
		
		var BetCode = 0;
		if(btn.getText() == "Friend")
			BetCode = 0;
		else if(btn.getText() == "Enemies")
			BetCode = 1;
		else if(btn.getText() == "ALL IN")
			BetCode = 4;
		
		this.getBetList(BetCode)
		
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			mybetfromfriend = mainPanel.down("myBetfromfriends");
		if(!mybetfromfriend){
			mybetfromfriend = mainPanel.add({xtype: "myBetfromfriends"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(mybetfromfriend, {type: "slide", direction: "left", duration: 450});
		
		var BetFrom = Ext.getCmp('myBetFrom');
		if(BetCode == 1)
			BetFrom.setHtml("BETS FROM ENEMIES");
		else if(BetCode == 4)
			BetFrom.setHtml("BETS FROM ALL IN")
		
		
	},
	
	getBetList:function(BetCode){
		
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
	
	AcceptList:function(){
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
				BetEntryId: "",
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
	
});
