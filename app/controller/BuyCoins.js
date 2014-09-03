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
	
	buyCoins:function(btn){
		var me = this;
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		if(typeof window.storekit !== "undefined" && Ext.os.is.iOS){
			if(btn.getItemId() == "Allin500Coins")
				window.storekit.purchase("Allin500Coins", 1);
			else if(btn.getItemId() == "Allin1500Coins")
				window.storekit.purchase("Allin1500Coins", 1);
			else if(btn.getItemId() == "Allin5000Coins")
				window.storekit.purchase("Allin5000Coins", 1);
			else if(btn.getItemId() == "Allin10000Coins")
				window.storekit.purchase("Allin10000Coins", 1);
			else if(btn.getItemId() == "Allin20000Coins")
				window.storekit.purchase("Allin20000Coins", 1);
		}else if(Ext.os.is.Android){
		
			//get Product ID for android "Add Product Id in name Field"
			var ProductID = btn.getInitialConfig('name');
			
			inappbilling.buy(function(successMsg){
				console.log("Message "+successMsg.orderId);
				me.getCoins(message.orderId,successMsg.productId); // Add the Coins In All In
				
				//need to consume
                inappbilling.consumePurchase(function(){
					Ext.Viewport.setMasked(false);
				}, function(err){
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert("Error", ""+err);
				}, ProductID);
				
			},function(err){
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert("Error", ""+err);
				
				// In case Buy items and Not Consumed Products so we can handle in Error
				inappbilling.consumePurchase(function(){
				}, function(err){
				}, ProductID);
				
			}, ProductID);
		}
	},
	
	getCoins:function(transactionId, productId){
		
		var Credits = 0,
			Amount = 0;
		if(Ext.os.is.Android){
			if(productId == "allin500_coins"){
				Credits = 500;
				Amount = 0.99;
			}
			else if(productId == "allin1500coins"){
				Credits = 1500;
				Amount = 1.99;
			}
			else if(productId == "allin5000coins"){
				Credits = 5000;
				Amount = 4.99;
			}
			else if(productId == "allin10000coins"){
				Credits = 10000;
				Amount = 9.99;
			}
			else if(productId == "allin20000coins"){
				Credits = 20000;
				Amount = 19.99;
			}
		}
		else 
		{
			// For IOS
			if(productId == "Allin500Coins"){
				Credits = 500;
				Amount = 0.99
			}
			else if(productId == "Allin1500Coins"){
				Credits = 1500;
				Amount = 1.99
			}
			else if(productId == "Allin5000Coins"){
				Credits = 5000;
				Amount = 4.99
			}
			else if(productId == "Allin10000Coins"){
				Credits = 10000;
				Amount = 9.99
			}
			else if(productId == "Allin20000Coins"){
				Credits = 20000;
				Amount = 19.99
			}
		}
		
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
					Amount: Amount,
					Credits: Credits, //Number of Coins Purchased
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
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(data.MemberBalance));
				
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
