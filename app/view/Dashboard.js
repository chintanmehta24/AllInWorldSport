Ext.define("AllInOneWorldSport.view.Dashboard",{
	extend: "Ext.Panel",
	xtype: "dashboard",
	config:{
		layout: "vbox",
		cls: "dashboard-cls",
		defaults: {
			xtype: "button",
			iconAlign: "top",
			cls: "dashboard-btn-cls",
			flex: 1
		},
		items: [{
			text: "Pick a Bet"
		}, {
			text: "Custom Bet"
		}, {
			text: "Locker Rooms"
		}, {
			xtype: "container",
			layout: "hbox",
			cls: "",
			defaults: {
				xtype: "button",
				iconAlign: "top",
				cls: "dashboard-btn-cls",
				flex: 1
			},
			items: [{
				text: "Jumbotron"
			}, {
				text: "Profile"
			}]
		}]
	}
});
