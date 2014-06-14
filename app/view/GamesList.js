Ext.define("AllInOneWorldSport.view.GamesList",{
	extend: "Ext.dataview.DataView",
	xtype: "gameslist",
	config:{
		cls: "games-list-cls",
		store: "GameLists",
		itemCls: "game-event-cls",
		itemTpl: ["<div class='headerdetail'>",
					"<div class='date'>{StartDate}</div>",
					"<div class='eventname'>{EventName}</div>",
				  "</div>",					
				  "<div class='participats'><tpl for='EventParticipants'>",
					"<div>{FirstName} {LastName}<span class='thumb' style='background-image:url(\"{ImageURL}\")'></span></div>",
				  "</tpl></div>"],
		items: [{
			xtype: "searchfield",
			label: "Team:",
			cls: 'search-field-cls',
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
