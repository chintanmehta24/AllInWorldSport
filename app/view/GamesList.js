Ext.define("AllInOneWorldSport.view.GamesList",{
	extend: "Ext.dataview.List",
	xtype: "gameslist",
	config:{
		cls: "games-list-cls",
		store: "GameLists",
		itemCls: "game-event-cls",
		itemTpl: new Ext.XTemplate([//"<div class='headerdetail'>",
					"<div class='date'>{StartDate:this.getDate}</div>",
					"<div class='eventname'>{EventName}</div>",
				  //"</div>",					
				  "<div class='participats'><tpl for='EventParticipants'>",
					"<div>",
						"<div class='teamname'>{FirstName} {LastName}</div >",
						"<tpl if='xindex=0'>",
							"<div class='thumb' style='background-image:url(\"resources/images/thumb_1.png\")'></div>",
						"<tpl else>", 
							"<div class='thumb' style='background-image:url(\"resources/images/thumb_2.png\")'></div>",						
						"</tpl>",
						// "<div class='thumb' style='background-image:url(\"{ImageURL}\")'></div>",
					"</div>",
				  "</tpl></div>"].join(""), {
				  	getDate: function(date){
						return Ext.Date.format(date, "D, M dS");
				  	}
				  }),
		items: [{
			xtype: "searchfield",
			label: "Team:",
			cls: 'search-field-cls',
			labelWidth: "auto",
			docked: "top",
			clearIcon: false
		},{
			scrollDock: "bottom",
			xtype: "button",
			cls: "betgame-btn-cls",
			text: "TAP GAME TO BET",
			action: "betBtnGameList",
			disabled: true
		}],
		listeners: [{
			delegate: "searchfield",
			event: "keyup",
			fn: "onSearchFieldKeyPress"
		}]
	},
	onSearchFieldKeyPress: function(ths, e){
		var me = this,
			value = ths.getValue(),
			store = me.getStore();
		store.load({
			jsonData: {
				searchString: value
			}
		});
	}
});
