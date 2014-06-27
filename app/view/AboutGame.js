Ext.define("AllInOneWorldSport.view.AboutGame",{
	extend: "Ext.Panel",
	xtype: "aboutgame",
	config: {
		cls: "about-game-cls",
		gameEventRecord: null, 
		layout: {
			type: "vbox",
			pack: "center",
			align: "center"
		},
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype :"label",
			itemId: "firstTeamId",
			cls: "team-name-cls"
		},{
			xtype: "label",
			html :"VS.",
			cls: "vs-text-cls"
		},{
			xtype :"label",
			itemId: "secondTeamId",
			cls: "team-name-cls"
		},{
			xtype: "label",
			cls: "place-detail-cls",
			itemId: "eventPlaceDetail"
		},{
			xtype: "button",
			text: "BET NOW",
			cls: "bet-btn-cls",
			action: "betNowAboutGame"
		}],
		listeners: [{
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
			me.down("#firstTeamId").setHtml(team1.FirstName + " " + team1.LastName);
			me.down("#secondTeamId").setHtml(team2.FirstName + " " + team2.LastName);
			me.down("#eventPlaceDetail").setHtml(data.Location+ "<br>" + 
												Ext.Date.format(new Date(), "l F d, Y") + "<br>" + 
												Ext.Date.format(new Date(), "g:i A T"));
		}
	}
});