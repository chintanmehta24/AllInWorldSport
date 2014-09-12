Ext.define("AllInOneWorldSport.view.MyBet", {
	extend : "Ext.Panel",
	xtype : "mybet",
	config : {
		scrollable: true,
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
					text: "Enemies",
					action: "ListMyBets"
				},{
					text: "Celebrities",
					action: "ListMyBets"
				},{
					text: "ALL IN",
					action: "ListMyBets"
				},{
					text: "Accepted",
				},{
					text: " - Friends",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "AcceptedFriendsBets",
					action: "ListMyBets"
				},{
					text: " - Enemies",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "AcceptedEnemiesBets",
					action: "ListMyBets"
				},{
					text: " - Celebrities",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "AcceptedCelebritiesBets",
					action: "ListMyBets"
				},{
					text: " - ALL IN",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "AcceptedALLINBets",
					action: "ListMyBets"
				},{
					text: "Expired",
				},{
					text: " - Friends",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "ExpiredFriendsBets",
					action: "ListMyBets"
				},{
					text: " - Enemies",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "ExpiredEnemiesBets",
					action: "ListMyBets"
				},{
					text: " - Celebrities",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "ExpiredCelebritiesBets",
					action: "ListMyBets"
				},{
					text: " - ALL IN",
					cls: ["my-bet-btn-cls", "left-padded-cls"],
					name : "ExpiredALLINBets",
					action: "ListMyBets"
				},
				
			]
		}]
	}
});