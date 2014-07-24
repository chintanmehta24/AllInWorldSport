Ext.define("AllInOneWorldSport.view.MyBetFromFriends", {
	extend : "Ext.Panel",
	xtype : "myBetfromfriends",
	config : {
		cls: "my-bet-cls",
		// tabBarPosition: "top",
		// tabBar: {
			// layout: {
				// type: "hbox",
				// pack: "center"
			// },
		// },
		// items: [{
			// xtype: "navbar",
			// docked: "top"
		// },{
			// xtype: "panel",
			// title: "BETS FROM FRIENDS",
			// //iconCls: "pending",
			// style : "margin:0em 1em 1em 1em;",
			scrollable: "vertical",
			items: [{
				xtype: "navbar",
				docked: "top"
			},{
					xtype: "dataview",
				cls: "friends-list-cls",
				style : "margin:1em;",
				itemCls: "friend-cls",
				scrollable: null,
				items: [{
					xtype: "label",
					id : "myBetFrom", //Avinash
					cls: "title-cls",
					html: "BETS FROM FRIENDS",
					docked: "top",
				}],
				itemTpl: ["<div class='row-cls'>",
							"<div class='thumb' style='background-image: url(\"{PhotoUrl}\")'></div>",
							"<div class='status <tpl if=\"Profile.IsOnline\">active<tpl else>inactive</tpl>'></div>",
							"<div class='title'>{Profile.FullName}</div>",
							"<span class='title'>Amount: {Bet.Amount}</span>",
						"</div>",
						"<div class='row-cls' style='font-size:0.7em;'>",
							"<tpl for='Event.EventParticipants'>",
								'<tpl if="xindex &gt; 1">',
									'<div class="title" style="text-align:center;">Vs</div>',
								'</tpl>',
								"<div>{FirstName} {LastName}</div>",
							"</tpl>",
						"</div>",
						"<tpl if='Bet.Status==\"Pending\"'><div class='row-cls action-btns'>",
							"<div class='accept-btn'>Accept</div>",
							"<div class='spacer-cls'></div>",
							"<div class='reject-btn'>Reject</div>",
						"</div></tpl>"].join(""),
				// itemTpl: "<div class='thumb' style='background-image: url(resources/images/person.png);'></div>",
							//"<div class='status {IsOnline}'></div>,",
							//"<div class='title'>{Profile.FullName}</div>",
				store : 'MyBets',
				/*store: {
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
				}*/
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
		// }]
	}
});