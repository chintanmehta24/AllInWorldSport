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
							 "<span>{FullName}</span>" ,
							 "<span>{Balance.BetBalance.WinLossRatio}</span>" ,
							 "<span>{Balance.BetBalance.NumberOfWins}</span>" ,
							 "<span>{Balance.BetBalance.NumberOfBetsCreated}</span>" ,
							 "<span>{Balance.CreditBalance}</span>" ,
							 "<span>{Balance.TicketBalance}</span>", 
						"</div>"].join(""),
			store : 'LeaderBoardTopFivePlayers',
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
							 "<span>{FullName}</span>" ,
							 "<span>{Balance.BetBalance.WinLossRatio}</span>" ,
							 "<span>{Balance.BetBalance.NumberOfWins}</span>" ,
							 "<span>{Balance.BetBalance.NumberOfBetsCreated}</span>" ,
							 "<span>{Balance.CreditBalance}</span>" ,
							 "<span>{Balance.TicketBalance}</span>", 
						"</div>"].join(""),
			store : 'Friends',
			listeners: [{
				event: "painted",
				single: true,
				fn: "onPainted"
			}],
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
		var currentUser = Ext.decode(localStorage.CURRENT_LOGIN_USER);
		me.down("#myScoreBoard").setData({
						"PlayerName": "Player 4",
						"BestWin": currentUser.MemberBalance.BetBalance.WinLossRatio,
						"MostWin": currentUser.MemberBalance.BetBalance.NumberOfWins,
						"MostBetCreated": currentUser.MemberBalance.BetBalance.NumberOfBetsCreated,
						"HeighestBalance": currentUser.MemberBalance.CreditBalance,
						"Tickets": currentUser.MemberBalance.TicketBalance
		});
		
	}
});