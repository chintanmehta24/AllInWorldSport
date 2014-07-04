Ext.define("AllInOneWorldSport.view.MyBetFromFriends", {
	extend : "Ext.tab.Panel",
	xtype : "myBetfromfriends",
	config : {
		cls: "my-bet-cls",
		tabBarPosition: "top",
		tabBar: {
			layout: {
				type: "hbox",
				pack: "center"
			},
		},
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "panel",
			title: "BETS FROM FRIENDS",
			//iconCls: "pending",
			style : "margin:0em 1em 1em 1em;",
			scrollable: "vertical",
			items: [{
				xtype: "dataview",
				cls: "friends-list-cls",
				style : "margin:1em;",
				itemCls: "friend-cls",
				scrollable: null,
				items: [/*{
					xtype: "label",
					cls: "title-cls",
					docked: "top",
					html: "to me"
				}*/],
				itemTpl: "<div class='thumb' style='background-image: url(\"{Url}\");background-color:red;background-size:85%'></div><div class='status {Status}'></div><div class='title'>{Name}</div>",
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
					},
					{
						Url: "resources/images/person.png",
						Status: "disable",
						Name: "Friend Name 4"
					}, {
						Url: "resources/images/person.png",
						Status: "enable",
						Name: "Friend Name 5"
					}, {
						Url: "resources/images/person.png",
						Status: "celebrity",
						Name: "Friend Name 6"
					}]
				}
			},/*{
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
			}*/]
		}]
	}
});