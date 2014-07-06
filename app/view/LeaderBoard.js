Ext.define("AllInOneWorldSport.view.LeaderBoard", {
	extend : "Ext.Panel",
	xtype : "leaderboard",
	config : {
		cls: "leader-board-cls",
		scrollable: "vertical",
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "label",
			cls: ["lead-player-cls", "lead-title-cls"],
			html : [ "<div class='row-cls'>",
							 "<span></span>" ,
							 "<span>Best Win / Loss Ratio</span>" ,
							 "<span>Most Wins</span>" ,
							 "<span>Most Bets Created</span>" ,
							 "<span>Heighest Balance</span>" ,
							 "<span>Tickets</span>", 
						"</div>"].join("")
			
		},{
			xtype: "label",
			cls: ["lead-player-cls", "my-lead-cls"],
			itemId: "myScoreBoard",
			tpl : [ "<div class='row-cls'>",
							 "<span>ME</span>" ,
							 "<span>{BestWin}</span>" ,
							 "<span>{MostWin}</span>" ,
							 "<span>{MostBetCreated}</span>" ,
							 "<span>{HeighestBalance}</span>" ,
							 "<span>{Tickets}</span>", 
						"</div>"].join("")
		},{
			scrollable: null,
			xtype: "dataview",
			itemCls: "lead-player-cls",
			itemTpl : [ "<div class='row-cls'>",
							 "<span>{PlayerName}</span>" ,
							 "<span>{BestWin}</span>" ,
							 "<span>{MostWin}</span>" ,
							 "<span>{MostBetCreated}</span>" ,
							 "<span>{HeighestBalance}</span>" ,
							 "<span>{Tickets}</span>", 
						"</div>"].join(""),
			store : {
				fields: [
					 "PlayerName" ,
					 "BestWin" ,
					 "MostWin" ,
					 "MostBetCreated" ,
					 "HeighestBalance" ,
					 "Tickets", 
				],
				data : [
					{
						"PlayerName": "Player 1" ,
						"BestWin": 25 ,
						"MostWin": 25 ,
						"MostBetCreated": 25 ,
						"HeighestBalance": 25 ,
						"Tickets": 25 
					}, {
						"PlayerName": "Player 2" ,
						"BestWin": 25 ,
						"MostWin": 25 ,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25 
					}, {
						"PlayerName": "Player 3" ,
						"BestWin": 25,
						"MostWin": 25,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25
					}, {
						"PlayerName": "Player 4",
						"BestWin": 25,
						"MostWin": 25,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25
					}
				]
			},
			items: [{
				xtype: "label",
				cls: "leaderlist-title-cls",
				html: "top 5 overall players",
				docked: "top"
			}]
		},{
			scrollable: null,
			xtype: "dataview",
			itemCls: "lead-player-cls",
			itemTpl : [ "<div class='row-cls'>",
							 "<span>{PlayerName}</span>" ,
							 "<span>{BestWin}</span>" ,
							 "<span>{MostWin}</span>" ,
							 "<span>{MostBetCreated}</span>" ,
							 "<span>{HeighestBalance}</span>" ,
							 "<span>{Tickets}</span>", 
						"</div>"].join(""),
			store : {
				fields: [
					 "PlayerName" ,
					 "BestWin" ,
					 "MostWin" ,
					 "MostBetCreated" ,
					 "HeighestBalance" ,
					 "Tickets", 
				],
				data : [
					{
						"PlayerName": "Player 1" ,
						"BestWin": 25 ,
						"MostWin": 25 ,
						"MostBetCreated": 25 ,
						"HeighestBalance": 25 ,
						"Tickets": 25 
					}, {
						"PlayerName": "Player 2" ,
						"BestWin": 25 ,
						"MostWin": 25 ,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25 
					}, {
						"PlayerName": "Player 3" ,
						"BestWin": 25,
						"MostWin": 25,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25
					}, {
						"PlayerName": "Player 4",
						"BestWin": 25,
						"MostWin": 25,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25
					}
				]
			},
			items: [{
				xtype: "label",
				cls: "leaderlist-title-cls",
				html: "top 5 friends",
				docked: "top"
			}]
		}]
	},
	initialize: function(){
		var me = this;
		me.down("#myScoreBoard").setData({
						"PlayerName": "Player 4",
						"BestWin": 25,
						"MostWin": 25,
						"MostBetCreated": 25,
						"HeighestBalance": 25,
						"Tickets": 25
		});
	}
});