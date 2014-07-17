Ext.define("AllInOneWorldSport.view.MyBet", {
	extend : "Ext.Panel",
	xtype : "mybet",
	config : {
		cls: "my-bet-cls",
		items: [{
			xtype: "navbar",
			docked: "top"
		},
		{
			
			xtype: "fieldset",
			title: "MY BETS",
			cls : "my-bet-title",
			defaults: {
				xtype: "button",
				cls: "my-bet-btn-cls",
				ui: "plain"
			},
			items: [{
					text: "Friends",
					action: "ListMyBets"
				},{
					text: "Celebrities",
				},{
					text: "Enemies",
				},{
					text: "ALL IN",
				},{
					text: "Accepted",
				},{
					text: " - This Week",
					cls: ["my-bet-btn-cls", "left-padded-cls"]
				},{
					text: " - Last Week",
					cls: ["my-bet-btn-cls", "left-padded-cls"]
				},{
					text: " - Date Range",
					cls: ["my-bet-btn-cls", "left-padded-cls"]
				},{
					text: "Expired",
				},{
					text: "Rejected",
				}
			]
		}]
	}
});