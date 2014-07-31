Ext.define("AllInOneWorldSport.view.FacebookFriendList", {
	extend : "Ext.dataview.DataView",
	xtype : "facebookfriendlist",
	config : {
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
			html: "Facebook Friends<span class='action-btn acceptList'></span><span class='action-btn closeList'></span>"
		}],
		itemCls: "friend-cls",
		cls: "friends-list-cls friend-cls",
		itemTpl: ["<div class='row-cls' style='line-height: 2;'>",
					"<div class='title'>{name}</div>",
					"</div>"].join(""),
		store: {
			fields: ["name", "id"],
		},
		mode: "MULTI",
		listeners: [{
			event: "painted",
			single: true,
			fn: "onPainted"
		}]
	},
	
	onPainted: function(){
		Main = this;
		var me = this;
		me.on("hide", function(){
			var _this = this;
				_this.destroy();
		}, me);
		me.down("#titleId").on("tap", function(target){
			if(target.getTarget(".action-btn")){
				if(target.getTarget(".acceptList")){
					this.inviteFriends();
				}else
					this.hide();
			}
		}, me, {element: "element"});
	},
	
	inviteFriends: function(){
		var me = this,
			records = Ext.clone(me.getSelection());
		me.setMasked({xtype: 'loadmask'});
		me.inviteFacebookFriend.call(me, records);
	},
	
	inviteFacebookFriend: function(records){
		var me = this,
			global = AllInOneWorldSport.Global,
			logged_In_User = Ext.decode(localStorage.CURRENT_LOGIN_USER);
		if(records.length == 0){
			me.hide();
			return;
		}
		var rec = records.pop();
		Ext.Ajax.request({
			url: global.SERVER_URL + "/TellaFriendReferMember",
			jsonData: {
				token: global.getAccessToken(),
				FacebookId: rec.get('id'),
				FirstName: rec.get('name'),
				Message: "Invite Message",
		        SponsorMemberid: logged_In_User.MemberId
			},
			method: "POST",
			success: function(response, opts){
				var obj = Ext.decode(response.responseText);
				me.inviteFacebookFriend.call(me, records);
			},
			failure: function(){
				alert("Error Facebook Friend List");
			}
		});
	}
});