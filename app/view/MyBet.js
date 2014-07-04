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
				style : 'background: transparent;border: 0;'
			},
			items: [{
				text: "Friends",
				action: "friendListMyBets"
				},{
					text: "Celebrities",
				},{
					text: "Enemies",
				},{
					text: "ALL IN",
				},{
					text: "Accepted",
				},{
					text: "-This Week",
					style : 'marginTop:-0.5em;marginLeft:1em;background: transparent;border: 0;'
				},{
					text: "-Last Week",
					style : 'marginTop:-0.5em;marginLeft:1em;background: transparent;border: 0;'
				},{
					text: "-Date Range",
					style : 'marginTop:-0.5em;marginLeft:1em;background: transparent;border: 0;'
				},{
					text: "Expired",
				},{
					text: "Rejected",
				}
				
			],
			
			
		},
		]
	}
});