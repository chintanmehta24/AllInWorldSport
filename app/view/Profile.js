Ext.define('AllInOneWorldSport.view.Profile', {
    extend: 'Ext.form.Panel',
    xtype: 'profile', 
    config: {
    	cls: "profile-cls",
    	items: [{
			xtype: "navbar",
			docked: "top"
		},{
    		xtype: "fieldset",
    		title: "Profile",
    		defaults: {
    			labelAlign: "left",
    			labelWidth: "5em",
    			xtype: "textfield"
    		},
    		items: [{
    			name: "FirstName",
    			label: "name",
			}, {
    			name: "Email",
    			label: "e-mail",
			}, {
    			name: "AboutMe",
    			label: "about me",
    			xtype: "textareafield",
			}, {
    			name: "Status",
    			label: "status",
			}, {
    			xtype: "container",
    			layout: {
    				type: "hbox",
    			},
    			cls: "x-field",
    			items: [{
    				xtype: "label",
    				html: "photo",
    				cls: "x-form-label"
    			},{
    				xtype: "img",
    				cls: "photo-preview-cls"
    			},{
    				xtype: "container",
    				layout: {
    					type:"vbox",
    					pack: "justify"
    				},
    				defaults: {
    					xtype: "button",
    					cls: "photo-action-btn"
    				},
    				items: [{
    					text: "upload"
    				}, {
    					text: "delete"
    				}]
    			}]
    		}, {
    			xtype: "selectfield",
    			label: "teams",
    			name: "Participant",
				id:"Participant1ID",
				autoSelect: false,
				placeHolder: "Select Team",
				store: Ext.create("AllInOneWorldSport.store.ListParticipants",{
					storeId: "ListParticipants1"
				}),
				displayField: "Name",
				valueField: "ParticipantId"
    		}, {
    			xtype: "selectfield",
    			label: "&nbsp;",
    			name: "Participant",
				 id:"Participant2ID",
				autoSelect: false,
				placeHolder: "Select Team",
				store:  Ext.create("AllInOneWorldSport.store.ListParticipants",{
					storeId: "ListParticipants2"
				}),
				displayField: "Name",
				valueField: "ParticipantId"
    		}]
    	},{
    		xtype: "container",
    		layout: "hbox",
    		defaults: {
    			xtype: "button",
    			flex: 1,
    			cls: "profile-action-btn"
    		},
    		items: [{
    			text: "buy coins"
    		},{
    			text: "my friends",
    			action: "showMyfriends"
    		},{
    			text: "account settings"
    		}]
    	}, {
    		xtype: "button",
    		text: "Save Changes",
    		cls: "profile-save-btn",
			action: "saveProfile",
    	}],
    	listeners: {
			painted: function (element, options) {
				var me = this,
					current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
				if(current_user){
					me.setValues({
						FirstName: current_user.Member.FirstName,
						Email: current_user.Member.EmailAddress,
						AboutMe: current_user.Member.Notes,
						Status: current_user.Member.ProfileStatus,
					});
				}
			}
		}
    }
});