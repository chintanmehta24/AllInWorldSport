Ext.define("AllInOneWorldSport.view.AccountSetting", {
	extend : "Ext.Panel",
	xtype : "accountsetting",
	config : {
		cls : "account-setting-cls",
		scrollable: "vertical",
		items: [
			{
				xtype: "navbar",
				docked: "top"
			},
			{
				xtype : "container",
				layout: {
					type: "hbox",
					align: "start"
				},
				padding: "0.5em 0.5em 0",
				items: [{
					xtype: "button",
					text: "Change Photo",
					ui: "plain",
					cls: "profile-photobtn-cls",
					//cls: "photo-preview-cls",
					iconAlign: "top",
					action: "takeProfilePhoto",
					itemId : "accountSettingProfilePicture",
					icon: "resources/images/person.png"
				}, {
					xtype: "togglefield",
					cls: "sound-toggle-cls",
					label: "Sound",
					labelAlign: "top"
				}, {
					xtype: "sliderfield",
					cls: "volume-slider-cls",
					itemId: "volumnSlider",
					labelAlign: "top",
					label: "Volume",
					minValue: 0,
					maxValue: 100,
					flex: 1
				}]
			},
			{
				xtype : "container",
				layout: {
					type: "hbox",
					align: "start"
				},
				padding: "0.5em 0.7em 0",
				items : [
					{
						xtype :"label",
						cls: "field-label-cls",
						style : 'font-size: 0.80em;',
						html: "",
						name: "Level",
						flex : 1,
					},
					{
						xtype : "container",
						layout: {
							type: "vbox",
							pack: "center"
						},
						flex: 1,
						margin: '-1.5em 0 0 0',
						items : [
							{
								xtype :"label",
								cls: "field-label-cls",
								html: "COIN BALANCE",
							},
							{
								xtype: "button",
								text: "0",
								name : 'CoinBalance',
								cls: 'balance-btn-cls'
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "vbox",
							pack: "center"
						},
						margin: '-1.5em 0 0 0',
						flex: 1,
						items : [
							{
								xtype :"label",
								cls: "field-label-cls",
								html: "TICKET BALANCE",
								
							},
							{
								xtype: "button",
								text: "0",
								name : 'TicketBalance',
								cls: 'balance-btn-cls'
							}
						]
					}
				]
			},
			{
				xtype : "container",
				layout: {
					type: "vbox",
					pack: "center"
				},
				items : [
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype : "button",
								text : "CONNECT TO<br>FACEBOOK",
								cls: "action-btn-cls",
								action : "facebookLogin",
								flex: 1,
							},
							/*{
								xtype : "button",
								text : "CONNECT TO<br>TWITTER",
								cls: "action-btn-cls",
								flex: 1,
							}*/
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype : "button",
								text : "ADD FRIENDS FROM<br>CONTACT LIST",
								cls: "action-btn-cls",
								flex: 1,
								action : "addFriendFromContactList"
							},
							{
								xtype : "button",
								text : "MANAGE<br>FRIENDS",
								cls: "action-btn-cls",
								flex: 1,
								action: "showMyfriends"
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype:"container",
								style : "margin: 0 0 0.75em 0.75em;",
								flex : 1,
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE SAYING",
										
									},
									{
										xtype:'textfield',
										name : "ChangeStatus",
										
									}
								]
							},
							{
								xtype:"container",
								flex : 1,
								style : "margin: 0 0.75em 0 0.75em;",
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE PROFILE NAME",
										
									},
									{
										xtype:'textfield',
										name: "LoginName",
									}
								]
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype:"container",
								style : "margin: 0 0 0.75em 0.75em;",
								flex : 1,
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE TEAM I FOLLOW"
									},
									{
										xtype :"selectfield",
										cls : "selectfield-cls",
										autoSelect: false,
										usePicker: true,
										defaultTabletPickerConfig: {
											height: 320
										},
						    			name: "Participant",
										store:  "ListParticipants1",
										displayField: "Name",
										valueField: "ParticipantId"
									},
								]
							},
							{
								xtype:"container",
								flex : 1,
								style : "margin: 0.83em 0.75em 0 0.75em;",
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: " "
									},
									{
										xtype :"selectfield",
										cls : "selectfield-cls",
										autoSelect: false,
										usePicker: true,
										defaultTabletPickerConfig: {
											height: 320
										},
						    			name: "Participant",
										store:  "ListParticipants2",
										displayField: "Name",
										valueField: "ParticipantId"
									}
								]
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype:"container",
								style : "margin: 0 0 0.75em 0.75em;",
								flex : 1,
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE PASSWORD"
									},
									{
										xtype:'passwordfield',
										id : 'id_Password',
										name:'Password'
									}
								]
							},
							{
								xtype:"container",
								flex : 1,
								style : "margin: 0 0.75em 0 0.75em;",
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CONFIRM PASSWORD"
									},
									{
										xtype:'passwordfield',
										id : 'id_ConfirmPassword',
									}
								]
							}
						]
					}
				]
			},
			{
				xtype: "button",
				text: "CHANGE",
				cls: "accountsetting-save-btn",
				action: "saveAccountSetting",
			}
		],
		listeners: [{
			delegate: "#volumnSlider",
			event: "change",
			fn: "onVolumnChange"
		},{
			delegate: "#volumnSlider",
			event: "drag",
			fn: "onVolumnChange"
		},{
			event: "painted",
			fn: function (element, options) {
				var password = Ext.getCmp('id_Password').setValue("");
				var confirmPassword = Ext.getCmp('id_ConfirmPassword').setValue("");
				
				var me = this,
				current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
				memberBalance = Ext.decode(localStorage.getItem("CURRENT_USER_MEMBERBALANCE"));
				
				if(current_user){
					var LoginName = me.query("[name=LoginName]");
					var ChangeStatus = me.query("[name=ChangeStatus]"); 
					var Level = me.query("[name=Level]");
					LoginName[0].setValue(localStorage.getItem("CURRENT_USER_LOGINNAME"));
					ChangeStatus[0].setValue(current_user.Member.ProfileStatus);
					
					var CoinBalance = me.query("[name=CoinBalance]");
					var TicketBalance = me.query("[name=TicketBalance]");
					
					CoinBalance[0].setText(""+memberBalance.CreditBalance);
					TicketBalance[0].setText(""+memberBalance.TicketBalance);
					Level[0].setHtml(memberBalance.ExperiencePoint.LevelDescription);
					
				}
			}
		}]
	},
	initialize: function(){
		var me = this;
		me.on("painted", me.onPainted, me);
	},
	
	onPainted: function(){
		var me = this,
			participantStore_1 = Ext.getStore("ListParticipants1"),
			participantStore_2 = Ext.getStore("ListParticipants2"),
			callbackFn = function(records, operation, success){
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(operation.getResponse().responseText);
				if(data && data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
			};
		participantStore_1.load({
			scope: me,
			callback: function(records, operation, success){
				if(!success){
					callbackFn.apply(this, arguments);
				}else{
					participantStore_2.load({
						scope: this,
						callback: function(records, operation, success){
							Ext.Viewport.setMasked(false);
							if(!success){
								callbackFn.apply(this, arguments);
							}
							var teams = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).Member.Teams,
								participateFields = this.query("[name=Participant]");
							for(var i = 0;i<teams.length;i++){
								if(teams[i].Status == "Favorite")
								{
									if(teams[i].LeagueName == "NFL"){
										participateFields[0].setValue(teams[i].ParticipantId);
									}
									else if(teams[i].LeagueName == "NCAA"){
										participateFields[1].setValue(teams[i].ParticipantId);
									}
								}
							}
						}
					});
				}
			}
		});
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
		if(!Ext.isEmpty(current_user.Member.PhotoUrl)){
			me.down("#accountSettingProfilePicture").setIcon(
			current_user.Member.PhotoUrl);
		}
		
	},
	
	onVolumnChange: function(sliderField, slider){
		var maxValue = sliderField.getMaxValue(),
			minValue = sliderField.getMinValue(),
			newValue = sliderField.getValue(),
			gap = Math.abs(maxValue - minValue),
			percentage = (newValue - minValue) * gap / 100,
			sliderId = slider.getId(),
			sliderBaseCls = slider.getBaseCls(),
			linkId = sliderBaseCls + sliderId,
			linkDom = Ext.get(linkId);
		if(!linkDom){
			var linkDom = document.createElement("style");
			linkDom.id = linkId;
			linkDom.type = "text/css";
			Ext.documentHeadElement.appendChild(linkDom);
			linkDom = Ext.get(linkId);
		}
		linkDom.setHtml("#" + sliderId + "." + sliderBaseCls + ":before{" +
					"background-image: -webkit-linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 
					"background-image: -moz-linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 
					"background-image: -o-linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 
					"background-image: linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 							
							"}");
	}
});