Ext.define("AllInOneWorldSport.view.ManageFriendList", {
	extend : "Ext.dataview.DataView",
	xtype : "managefriendlist",
	config : {
		listType: "Friends", //"Enemies", "Celebrities", "Friends"
		hideToolbar: false,
		autoDestory: true,
		hideOnMaskTap: true,
		modal: true,
		centered: true,
		width: "90%",
		height: "80%",
		items: [{
			xtype: "label",
			itemId: "titleId",
			cls: "overlay-title-cls",
			docked: "top",
			tpl: "{type}"
		}, {
			xtype: "container",
			itemId: "topToolbar",
			layout: {
				type: "hbox",
				pack: "end"
			},
			docked: "top",
			defaults: {
				xtype: "button",
				ui: "plain",
				iconMask: true
			},
			items: [
				{
					iconCls: "lock_open"
				},
				{
					iconCls: "lock_closed"
				},
				{
					iconCls: "add"
				},
				{
					iconCls: "delete"
				},
				{
					iconCls: "team"
				}
			]
		}],
		itemCls: "friend-cls",
		cls: "friends-list-cls",
		itemTpl: "<div class='thumb' style='background-image: url(\"{Url}\")'></div><div class='status <tpl if=\"Status\">active<tpl else>inactive</tpl>'></div><div class='title'>{Name}</div>",
		store: {
			fields: ["Url", "Status", "Name"],
			data: [{
				Url: "resources/images/person.png",
				Status: true,
				Name: "Friend Name 1"
			}, {
				Url: "resources/images/person.png",
				Status: true,
				Name: "Friend Name 2"
			}, {
				Url: "resources/images/person.png",
				Status: true,
				Name: "Friend Name 3"
			}, {
				Url: "resources/images/person.png",
				Status: false,
				Name: "Friend Name 4"
			}, {
				Url: "resources/images/person.png",
				Status: true,
				Name: "Friend Name 5"
			}, {
				Url: "resources/images/person.png",
				Status: false,
				Name: "Friend Name 6"
			}]
		},
		listeners: [{
			event: "painted",
			single: true,
			fn: "onPainted"
		}]
	},
	
	onPainted: function(){
		var me = this;
		me.on("hide", function(){
			var _this = this;
				_this.destroy();
		}, me);
	},
	
	initialize: function(){
		var me = this,
			listType = me.getListType(),
			titleCmp = me.down("#titleId"),
			toolbar = me.down("#topToolbar");
		me.callParent(arguments);
		titleCmp.setData({type: listType});
		toolbar.setHidden(me.getHideToolbar());
		switch(listType){
			case "Enemies":
				me.addCls("enemy-cls");
				break;
			case "Celebrities":
				me.addCls("celeberity-cls");
				break;
			case "Friends":
			default:
				me.addCls("friend-cls");
				break;
		}
	}
});