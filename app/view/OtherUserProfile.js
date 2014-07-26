Ext.define('AllInOneWorldSport.view.OtherUserProfile', {
    extend: 'Ext.form.Panel',
    xtype: 'otherUserProfile', 
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
    			name: "FullName",
    			label: "name",
				placeHolder : "FullName",
				readOnly:true
			}, {
    			name: "EmailAddress",
    			label: "e-mail",
				placeHolder : "Email",
				readOnly:true
			}, {
    			name: "Notes",
    			label: "about me",
    			xtype: "textareafield",
				placeHolder : "About Me",
				readOnly:true
			}, {
    			name: "ProfileStatus",
    			label: "status",
				placeHolder : "Profile Status",
				readOnly:true
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
    				/*items: [{
    					text: "upload"
    				}, {
    					text: "delete"
    				}]*/
    			}]
    		}, {
    			
    			label: "teams",
    			name: "Participant1",
				id:"Participant1ID",
				placeHolder: "Team1",
				
    		}, {
    			
    			label: "&nbsp;",
    			name: "Participant2",
				id:"Participant2ID",
				placeHolder: "Team2",
				
    		}]
    	}/*,{
    		xtype: "container",
    		layout: "hbox",
    		defaults: {
    			xtype: "button",
    			flex: 1,
    			cls: "profile-action-btn"
    		},
    		items: [{
    			text: "buy coins",
    			action: "buyIcons"
    		},{
    			text: "my friends",
    			action: "showMyfriends"
    		},{
    			text: "account settings",
				action: "gotoAccountSettings"
    		}]
    	}, {
    		xtype: "button",
    		text: "Save Changes",
    		cls: "profile-save-btn",
			action: "saveProfile",
    	}*/
		],
    	
    },
	setProfileData:function(ProfileData){
		var me = this;
		me.setValues(ProfileData);
		
		var teamsAraay = Ext.Array.filter(ProfileData.Teams , function(obj){if(obj.Status == "Favorite") return true;});
		var Participant1 = me.down("[name:Participant1]");
		Participant1.setValue(teamsAraay.Name)
		
		
	}
});