Ext.define('AllInOneWorldSport.view.Profile', {
    extend: 'Ext.form.Panel',
    xtype: 'profile', 
    config: {
    	cls: "profile-cls",
    	items: [{
    		xtype: "fieldset",
    		title: "Profile",
    		defaults: {
    			labelAlign: "left",
    			labelWidth: "5em",
    			xtype: "textfield"
    		},
    		items: [{
    			name: "FirstName",
    			label: "name"
    		}, {
    			name: "Email",
    			label: "e-mail"
    		}, {
    			name: "AboutMe",
    			label: "about me",
    			xtype: "textareafield"
    		}, {
    			name: "Status",
    			label: "status"
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
    			name: "Participant1",
    			options: [{
    				text: "team1",
    				value: "value1"
    			}, {
    				text: "team2",
    				value: "value2"
    			}]
    		}, {
    			xtype: "selectfield",
    			label: "&nbsp;",
    			name: "Participant2",
    			options: [{
    				text: "team1",
    				value: "value1"
    			}, {
    				text: "team2",
    				value: "value2"
    			}]
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
    			text: "my friends"
    		},{
    			text: "account settings"
    		}]
    	}, {
    		xtype: "button",
    		text: "Save Changes",
    		cls: "profile-save-btn"
    	}]
    }
});