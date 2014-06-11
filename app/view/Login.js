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
			name : "DisplayName",
			placeHolder : "Display Name",
			cls : "field-cls"
		}, {
			xtype : "textfield",
			hidden: true,
			name : "FirstName",
			placeHolder : "First Name",
			cls : "field-cls"
		}, {
			xtype : "textfield",
			hidden: true,
			name : "LastName",
			placeHolder : "Last Name",
			cls : "field-cls"
		}, {
			xtype : "emailfield",
			hidden: true,
			name : "EmailAddress",
			placeHolder : "Email Address",
			cls : "field-cls"
		}, {
			xtype : "emailfield",
			name : "LoginName",
			placeHolder : "User Name",
			cls : "field-cls"
		}, {
			xtype : "passwordfield",
			name : "Password",
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
				text : "LOGIN",
				action: "doLogin"
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
				text : "REGISTER",
				action: "doRegister"
			}]
		}, {
			xtype : "label",
			cls : "separator-cls",
			html : "OR"
		}, {
			xtype : "label",
			cls : "login-info",
			html : "REGISTER USING YOUR FACEBOOK OR TWITTER ACCOUNT"
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
			DisplayName = me.down("textfield[name=DisplayName]"),
			FirstName = me.down("textfield[name=FirstName]"),
			LastName = me.down("textfield[name=LastName]"),
			EmailAddress = me.down("emailfield[name=EmailAddress]");
		if(loginContainer.isHidden()){
			loginContainer.show();
			registerContainer.hide();

			DisplayName.hide();
			FirstName.hide();
			LastName.hide();
			EmailAddress.hide();
		}else{
			loginContainer.hide();
			registerContainer.show();

			DisplayName.show();
			FirstName.show();
			LastName.show();
			EmailAddress.show();
		}
	}
});
