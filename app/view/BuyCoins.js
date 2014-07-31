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
			items: [{
				text: "coin doubler",
				icon:  "resources/images/buy_coins_1.png",
				action : "buyCoins",
				badgeText: "$4.99"
			},{
				text: "5,000 coin pack",
				icon:  "resources/images/buy_coins_2.png",
				badgeText: "$0.99"
			},{
				text: "50,000 coin pack",
				icon:  "resources/images/buy_coins_3.png",
				badgeText: "$4.99"
			},{
				text: "150,000 coin pack",
				icon:  "resources/images/buy_coins_4.png",
				badgeText: "$9.99"
			},{
				text: "400,000 coin pack",
				icon:  "resources/images/buy_coins_5.png",
				badgeText: "$9.99"
			}]
		}]
	}
});