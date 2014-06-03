/**
 * @author chintan mehta
 */
Ext.define("AllInOneWorldSport.view.Login",{
	extend: "Ext.form.Panel",
	xtype: "login",
	config: {
		cls: "login-cls",
		layout: "vbox",
		items: [{
			// xtype: "toolbar",
			// cls: "top-toolbar-cls",
			// title: "ALL IN - LOGIN",
			// docked: "top"
		// },{
			xtype: "image",
			src: "resources/images/logo.png",
			cls: "logo-cls"
		},{
			xtype: "emailfield",
			name: "username",
			placeHolder: "User Name",
			cls: "field-cls"
		},{
			xtype: "passwordfield",
			name: "password",
			placeHolder: "Password",
			cls: "field-cls"
		},{
			xtype: "container",
			layout:{ 
				type: 'hbox',
				align: "center"
			},
			items: [{
				xtype : "container",
				layout: "vbox",
				defaults: {
					xtype: 'button',
					ui: "plain",
					cls: "forgot-btn-cls"
				},
				items:[{
					text: "Forgot Password?"
				},{
					text: "Register"
				}]
			},{
				xtype: "spacer"
			},{
				xtype: "button",
				cls: "login-btn-cls",
				text: "LOGIN"
			}]
		},{
			xtype: "image",
			cls: "separator-cls"
		},{
			xtype: "label",
			cls: "login-info",
			html: "LOGIN USING YOUR FACEBOOK OR TWITTER ACCOUNT"
		},{
			xtype: "container",
			layout: {
				type: "hbox",
				align: "center",
				pack: "center"
			},
			defaults:{
				xtype: "button",
				iconAlign: "left"
			},
			items: [
				{
					text: "FACEBOOK",
					cls: "facebook-btn-cls",
					iconCls: "facebook",
				},{
					text: "TWITTER",
					cls: "twitter-btn-cls",
					iconCls: "twitter"
				}
			]
		}]
	}
});
