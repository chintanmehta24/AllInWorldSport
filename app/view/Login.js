/**
 * @author chintan mehta
 */
Ext.define("AllInOneWorldSport.view.Login", {
	extend : "Ext.form.Panel",
	xtype : "login",
	config : {
		cls : "login-cls",
		layout : "vbox",
		items : [{
			xtype : "image",
			src : "resources/images/logo.png",
			cls : "logo-cls"
		}, {
			xtype : "textfield",
			hidden: true,
			name : "name",
			placeHolder : "Name",
			cls : "field-cls"
		}, {
			xtype : "emailfield",
			name : "username",
			placeHolder : "User Name",
			cls : "field-cls"
		}, {
			xtype : "passwordfield",
			name : "password",
			placeHolder : "Password",
			cls : "field-cls"
		}, {
			xtype : "container",
			itemId: "loginBtnContainer",
			layout : {
				type : 'hbox',
				align : "center"
			},
			items : [{
				xtype : "container",
				layout : "vbox",
				defaults : {
					xtype : 'button',
					ui : "plain",
					cls : "forgot-btn-cls"
				},
				items : [{
					text : "Forgot Password?"
				}, {
					text : "Register",
					action: "switchLoginView"
				}]
			}, {
				xtype : "spacer"
			}, {
				xtype : "button",
				cls : "login-btn-cls",
				text : "LOGIN"
			}]
		}, {
			xtype : "container",
			itemId: "registerBtnContainer",
			hidden: true,
			layout : {
				type : 'hbox',
				align : "center"
			},
			items : [{
				xtype : "container",
				layout : "vbox",
				defaults : {
					xtype : 'button',
					ui : "plain",
					cls : "forgot-btn-cls"
				},
				items : [{
					text : "Login",
					action: "switchLoginView"
				}]
			}, {
				xtype : "spacer"
			}, {
				xtype : "button",
				cls : "login-btn-cls",
				text : "REGISTER"
			}]
		}, {
			xtype : "label",
			cls : "separator-cls",
			html : "Or"
		}, {
			xtype : "label",
			cls : "login-info",
			html : "LOGIN USING YOUR FACEBOOK OR TWITTER ACCOUNT"
		}, {
			xtype : "container",
			layout : {
				type : "hbox",
				align : "center",
				pack : "center"
			},
			cls : "twitter-facebook-btn-cls",
			defaults : {
				xtype : "button",
				iconAlign : "left"
			},
			items : [{
				text : "FACEBOOK",
				cls : "facebook-btn-cls",
				iconCls : "facebook",
			}, {
				text : "TWITTER",
				cls : "twitter-btn-cls",
				iconCls : "twitter"
			}]
		}],
		listeners: [{
			delegate: "button[action=switchLoginView]",
			event: "tap",
			fn: "switchLoginView"
		}]
	},
	switchLoginView: function(btn){
		var me = this,
			loginContainer = me.down("#loginBtnContainer"),
			registerContainer = me.down("#registerBtnContainer"),
			nameField = me.down("textfield[name=name]");
		if(loginContainer.isHidden()){
			loginContainer.show();
			nameField.hide();
			registerContainer.hide();
		}else{
			loginContainer.hide();
			nameField.show();
			registerContainer.show();
		}
	}
});
