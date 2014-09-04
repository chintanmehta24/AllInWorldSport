Ext.define("AllInOneWorldSport.view.BuyCoins", {
	extend : "Ext.Panel",
	xtype : "buycoins",
	config : {
		scrollable: true,
		cls: "profile-buy-coins-cls",
		layout: "vbox",
		items:[{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "fieldset",
			title: "store",
			defaults: {
				xtype: "button",
				cls: "buy-coins-btn-cls"
			},
			items: [/*{
				text: "coin doubler",
				icon:  "resources/images/buy_coins_1.png",
				action : "buyCoins",
				badgeText: "$4.99"
			},*/{
				text: "500 coin pack",
				icon:  "resources/images/buy_coins_2.png",
				itemId : "Allin500Coins", // InApp Purchase Product Id for IOS and Android
				action : "buyCoins",
				badgeText: "$0.99"
			},{
				text: "1,500 coin pack",
				icon:  "resources/images/buy_coins_3.png",
				itemId : "Allin1500Coins",// InApp Purchase Product Id for IOS and Android
				action : "buyCoins",
				badgeText: "$1.99"
			},{
				text: "5,000 coin pack",
				icon:  "resources/images/buy_coins_4.png",
				itemId : "Allin5000Coins",// InApp Purchase Product Id for IOS and Android
				action : "buyCoins",
				badgeText: "$4.99"
			},{
				text: "10,000 coin pack",
				icon:  "resources/images/buy_coins_5.png",
				itemId : "Allin10000Coins",// InApp Purchase Product Id for IOS and Android
				action : "buyCoins",
				badgeText: "$9.99"
			},{
				text: "20,000 coin pack",
				icon:  "resources/images/buy_coins_5.png",
				itemId : "Allin20000Coins",// InApp Purchase Product Id for IOS and Android
				action : "buyCoins",
				badgeText: "$19.99"
			}]
		}]
	}
});