Ext.define("AllInOneWorldSport.view.GamesList",{
	extend: "Ext.dataview.DataView",
	xtype: "gameslist",
	config:{
		cls: "games-list-cls",
		store: "GameLists",
		itemCls: "game-event-cls",
		itemTpl: ["<div>", 
					"<div><span>{StartDate}</span> <span>{EventName}</span></div>",					
					"<div><tpl for='EventParticipants'>",
						"<div>{FirstName} {LastName}<span class='thumb' style='background-image:url(\"{ImageURL}\")'></span></div>",
					"</tpl></div>",
				"</div>"],
		items: [{
			xtype: "searchfield",
			label: "Team:",
			labelWidth: "auto",
			docked: "top",
			clearIcon: false
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
