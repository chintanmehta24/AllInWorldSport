Ext.define("AllInOneWorldSport.view.BetPage",{
	extend: "Ext.Panel",
	xtype: "betpage",
	config: {
		cls: "bet-page-cls",
		gameEventRecord: null,
		layout: {
			type: "vbox",
			// align: "center",
			pack: "center"
		},
		items: [{
			xtype: "fieldset",
			title: "WHO WILL WIN",
			cls: "bet-container-cls",
			defaults: {
				xtype: "container",
				layout: {
					type: "hbox",
					align: "center",
					pack: 'center'
				},
				cls: "team-detail-cls",
				items: [{
					xtype: "label",
					flex: 1
				},{
					xtype: "button",
					action: "doBetNow",
					text: "Bet"
				}]
			},
			items: [{
				itemId: "firstTeamAction"
			},{
				itemId: "secondTeamAction"
			}]
		}, {
			xtype: "button",
			text: "ABOUT THE GAME",
			action: "showAboutBetBtn",
			cls: "about-btn-cls"
		}],
		listeners:[{
			event: "activate",
			fn: "onPageActivate"
		}]
	},
	onPageActivate: function(){
		var me = this,
			record = me.getGameEventRecord();
		if(record){
			var data = record.getData(),
				team1 = data.EventParticipants[0],
				team2 = data.EventParticipants[1];
			me.down("#firstTeamAction label").setHtml(team1.FirstName + " " + team1.LastName);
			me.down("#secondTeamAction label").setHtml(team2.FirstName + " " + team2.LastName);
		}
	}
});
