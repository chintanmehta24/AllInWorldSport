Ext.define("AllInOneWorldSport.view.PhoneContactList", {
	extend : "Ext.dataview.DataView",
	xtype : "phonebookcontactlist",
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
			html: "Phonebook Contacts<span class='action-btn acceptList'></span><span class='action-btn closeList'></span>"
		}],
		itemCls: "friend-cls",
		cls: "friends-list-cls friend-cls",
		itemTpl: ["<div class='row-cls' style='line-height: 2;'>","<div class='title'>{displayName}</div><div style='padding-right: 2em'>{phoneNumbers}</div>","</div>",
				"<div class='row-cls' style='line-height: 2;'>","<div class='title'>{emails}</div>","</div>"].join(""),
		store: "PhoneContacts",
		mode: "MULTI",
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
	},
	
	initialize: function(){
		this.callParent(arguments);
		var me = this,
			options      = new ContactFindOptions(),
			fields       = ["displayName", "name", "phoneNumbers", "emails"];
		options.filter   = "";
		options.multiple = true;
		me.setMasked({xtype: "loadmask"});
		navigator.contacts.find(fields, function(contacts){
			var store = Ext.getStore("PhoneContacts");
			var arrayPhone = [];
			Ext.Array.forEach(contacts, function(c){
				var obj = {
					id: c.id,
					rawId: c.rawId,
					displayName: c.displayName,
					phoneNumbers: c.phoneNumbers ? c.phoneNumbers[0].value: "",
					emails: c.emails ? c.emails[0].value : ""
				};
				//	console.log(Ext.encode(obj));
				arrayPhone.push(obj);
			});
			store.add(arrayPhone);
			me.setMasked(false);
		}, function(){
			me.setMasked({xtype: "loadmask"});
			alert("Error");
		}, options);		
	},
	saveFriendList: function(){
		var me = this;
		participantID = []; //Avinash
		var record = me.getSelection(); 
		for(var i = 0 ; i < me.getSelectionCount() ; i++){
		}
	}
});