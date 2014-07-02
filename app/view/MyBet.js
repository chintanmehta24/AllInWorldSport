Ext.define("AllInOneWorldSport.view.MyBet", {
	extend : "Ext.tab.Panel",
	xtype : "mybet",
	config : {
		cls: "my-bet-cls",
		tabBarPosition: "top",
		tabBar: {
			layout: {
				type: "hbox",
				pack: "center"
			}
		},
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "panel",
			title: "",
			iconCls: "pending",
			scrollable: "vertical",
			items: [{
				xtype: "dataview",
				cls: "friends-list-cls",
				itemCls: "friend-cls",
				scrollable: null,
				items: [{
					xtype: "label",
					cls: "title-cls",
					docked: "top",
					html: "to me"
				}],
				itemTpl: "<div class='thumb' style='background-image: url(\"{Url}\")'></div><div class='status {Status}'></div><div class='title'>{Name}</div>",
				store: {
					fields: ["Url", "Status", "Name"],
					data: [{
						Url: "resources/images/person.png",
						Status: "disable",
						Name: "Friend Name 1"
					}, {
						Url: "resources/images/person.png",
						Status: "enable",
						Name: "Friend Name 2"
					}, {
						Url: "resources/images/person.png",
						Status: "celebrity",
						Name: "Friend Name 3"
					}]
				}
			},{
				xtype: "dataview",
				cls: "friends-list-cls",
				itemCls: "friend-cls",
				scrollable: null,
				items: [{
					xtype: "label",
					cls: "title-cls",
					docked: "top",
					html: "by me"
				}],
				itemTpl: "<div class='thumb' style='background-image: url(\"{Url}\")'></div><div class='status {Status}'></div><div class='title'>{Name}</div>",
				store: {
					fields: ["Url", "Status", "Name"],
					data: [{
						Url: "resources/images/person.png",
						Status: "disable",
						Name: "Friend Name 1"
					}, {
						Url: "resources/images/person.png",
						Status: "enable",
						Name: "Friend Name 2"
					}, {
						Url: "resources/images/person.png",
						Status: "celebrity",
						Name: "Friend Name 3"
					}]
				}
			}]
		},{
			xtype: "panel",
			title: "",
			iconCls: "accepted"
		},{
			xtype: "panel",
			title: "",
			iconCls: "rejected"
		},{
			xtype: "panel",
			title: "",
			iconCls: "completed"
		},{
			xtype: "panel",
			title: "",
			iconCls: "expired"
		}]
	}
});