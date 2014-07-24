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
			tpl: "{type}<span class='action-btn acceptList'></span><span class='action-btn closeList'></span>"
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
		itemTpl: ["<div class='row-cls'>",
					"<div class='thumb' style='background-image: url(resources/images/person.png)'></div>",//"<div class='thumb' style='background-image: url(\"{PhotoUrl}\")'></div>",
					"<div class='status <tpl if=\"IsOnline\">active<tpl else>inactive</tpl>'></div>",
					"<div class='title'>{FullName}</div>",
				"</div>"].join(""),
		store: "Friends",
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
		me.down("#titleId").on("tap", function(target){
			if(target.getTarget(".action-btn")){
				if(target.getTarget(".acceptList"))
					this.saveFriendList();
				this.hide();
			}
		}, me, {element: "element"});
		me.getStore().load();
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
	},
	saveFriendList: function(){
		var ListViewManageFriend = this;	//Ext.getCmp('listViewManageFriends'); //Avinash
		participantID = []; //Avinash
		var record = ListViewManageFriend.getSelection(); //Avinash
		for(var i = 0 ; i < ListViewManageFriend.getSelectionCount() ; i++){ //Avinash
			participantID[i]= record[i].data.MemberId; //Avinash
		} //Avinash
	}
});