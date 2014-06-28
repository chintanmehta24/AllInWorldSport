Ext.define("AllInOneWorldSport.view.ManageFriendList", {
	extend : "Ext.dataview.DataView",
	xtype : "managefriendlist",
	config : {
		autoDestory: true,
		hideOnMaskTap: true,
		modal: true,
		centered: true,
		width: "90%",
		height: "80%",
		items: [{
			xtype: "label",
			cls: "overlay-title-cls",
			docked: "top",
			html: "manage friends"
		}],
		itemCls: "friend-cls",
		cls: "friends-list-cls",
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
				Status: "disable",
				Name: "Friend Name 3"
			}, {
				Url: "resources/images/person.png",
				Status: "enable",
				Name: "Friend Name 4"
			}, {
				Url: "resources/images/person.png",
				Status: "enable",
				Name: "Friend Name 5"
			}, {
				Url: "resources/images/person.png",
				Status: "disable",
				Name: "Friend Name 6"
			}]
		}
	}
});