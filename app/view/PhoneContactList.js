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
		},
		/*{
			xtype : "panel",
			itemId: "sharingPanelId",
			
			layout:'vbox',
			centered:true,
			 // Make it modal so you can click the mask to hide the overlay
			 modal: true,
			 hideOnMaskTap: false,
			 style : "margin-top: 0.8em;",
			 // Make it hidden by default
			 hidden: true,
			items : [
				{
					xtype : "button",
					text : "Send SMS"
				}
			]
		}*/
		
		],
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
		Main = this;
		var me = this;
		me.on("hide", function(){
			var _this = this;
				_this.destroy();
		}, me);
		me.down("#titleId").on("tap", function(target){
			if(target.getTarget(".action-btn")){
				if(target.getTarget(".acceptList")){
					this.saveFriendList();
					if(Ext.getCmp('sharingPanel'))
						Ext.getCmp('sharingPanel').showBy(me.down("#titleId"))
					else{
						me.createSharingPanel();
						Ext.Viewport.add(Ext.getCmp('sharingPanel'));
						Ext.getCmp('sharingPanel').showBy(me.down("#titleId"))
					}
					
					
				}
				//this.hide();
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
		ContactData = []; //Avinash
		var record = me.getSelection(); 
		for(var i = 0 ; i < me.getSelectionCount() ; i++){
			ContactData[i]= record[i]; 
		}
	},
	createSharingPanel:function(){
		var me = this;
		var sharingPanel = new Ext.Panel({
			 id : 'sharingPanel',
			 layout:'vbox',
			 centered:false,
			 style : "background: transparent;",
			 // Make it modal so you can click the mask to hide the overlay
			 modal: true,
			 hideOnMaskTap: true,
			 // Make it hidden by default
			 hidden: true,
			 items : [
				{
					xtype:"button",
					text:"Send SMS",
					margin:'10',
					style : "background: transparent;",
					handler : function(){
						Main.hide();
						Ext.getCmp('sharingPanel').hide();
						var PhoneNumber = "";
						for(var i = 0 ; i < ContactData.length;i++){
							
							if(i == 0)
								PhoneNumber = ContactData[i].phoneNumbers;
							else
								PhoneNumber = ContactData[i].phoneNumbers + "," + PhoneNumber
						}
						var msg = {
							body : "Hi,Install the amzing app"
						};
						console.log(PhoneNumber);
						window.location = "sms:"+PhoneNumber+"?" + Ext.urlEncode(msg);
					}
				},
				{
					xtype:"button",
					text:"Send Email",
					margin:'0 10 10 10',
					style : "background: transparent;",
					handler : function(){
						Main.hide();
						Ext.getCmp('sharingPanel').hide();
						var msg = {
							subject : 'ALL IN',
							body : 'Hi,Install the amzing app'
						};
						var Emails = "";
						for(var i = 0 ; i < ContactData.length;i++){
							if(i == 0)
								Emails = ContactData[i].emails;
							else
								Emails = ContactData[i].emails + "," + Emails
						}
						console.log(Emails);
						window.location = "mailto:"+Emails+"?" + Ext.urlEncode(msg);
					}
				}
			 ]
		});
		
	}
});