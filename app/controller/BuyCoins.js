Ext.define('AllInOneWorldSport.controller.BuyCoins', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			/*"buycoins button[action=buyCoins]": {
				tap: "buyCoinsInAppPurchases"
			},*/
			"buycoins button[action=buyCoins]": {
				tap: "buyCoins"
			},
			"buycoins button[action=saveInAppDetail]" : {
				tap: "SaveInAppDetail"
			},
			"inappdetail button[action=saveDetail]": {
				tap: "SaveInappDetail"
			},
			
		}
	},
	
	
	
	buyCoinsInAppPurchases:function(btn)
	{
		var me = this;
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			inappdetail = mainPanel.down("inappdetail");
		if(!inappdetail){
			inappdetail = mainPanel.add({xtype: "inappdetail"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(inappdetail, {type: "slide", direction: "left", duration: 450});
		//Ext.Viewport.down("#InAppDetailView").setHidden(false);
		//window.storekit.purchase("Allin100Coins", 1);
		
		
	},
	
	
	SaveInappDetail:function(btn)
	{
		var me = this;
		var View = AllInOneWorldSport.Global.NavigationStack.pop();
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		
		mainPanel.animateActiveItem(View, {type: "slide",direction: "right", duration: 450});
		
		var formPanel = btn.up("inappdetail"),
			values = formPanel.getValues();
		
		if(values.FirstName == "" || values.LastName == "" || values.Address == ""|| values.City == "" || values.State== "" || values.PostalCode == "" || values.Country == "")
		{
			Ext.Msg.alert("Message","Required field are empty")
		}
		else
		{
			InAppDetails = values;
			me.buyCoins();
		}
			
		
	},
	
	buyCoins:function(){
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		window.storekit.purchase("Allin100Coins", 1);
	},
	
	getCoins:function(transactionId, productId){
		Ext.Msg.alert("getCoins","getCoins");
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/Purchase",
			method : "POST",
			disableCaching : false,
			jsonData : {
				
					MemberId: current_user.MemberId,
					FundType: "InAppPurchase",
					Amount: 0.99,
					Credits: 100, //Number of Coins Purchased
					RefNum: transactionId, //Possibly the Receipt we need to discuss this
					FirstName: current_user.Member.FirstName,
					LastName: current_user.Member.LastName,
					Address: "",
					City: "",
					StateOrProvince: "",
					PostalCode: "",
					Country: "",
					EmailAddress :current_user.Member.EmailAddress,
					ProductMessage : "All In Purchase Coins",
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
						Ext.Msg.alert('Message', "Added Coins Successfully");
				},100);
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	}
	
	
});
