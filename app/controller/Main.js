Ext.define('AllInOneWorldSport.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            "main button[action=toggleNavigationPanel]":{
                tap: "toggleNavigationPanel"
            },
            "login button[action=doLogin]": {
            	tap: "doLogin"
            },
            "login button[action=doRegister]": {
            	tap: "doRegister"
            },
			"login button[action=facebookLogin]":{
				tap : "registerWithFacebook"
			},
			"login button[action=forgetPassword]":{
				tap : "doForgetPassword"
			}
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        this.createSession();
    },
	doRegister : function(btn) {
		var form = btn.up("login"),
			values = form.getValues(),
			GLOBAL = AllInOneWorldSport.Global,
		data = {
			"Member" : {
				"DisplayName" : values.DisplayName,
				// "FirstName" : values.FirstName,
				"FirstName" : values.DisplayName,
				"LastName" : "",//values.LastName,
				"EmailAddress" : "",//values.EmailAddress,
				"LoginName" : values.LoginName,
				"Password" : values.Password,

				"BusinessType" : "Member",
				"MemberType" : "Person",
				"SecretAnswer" : "",
				"TaxId" : "",
				"SecretQuestion" : "",
				"PrimaryPhone" : "",
				"Notes" : "",
				"WebURL" : "",
				"ImageURL" : "",
				"IPAddress" : "",
				"Title" : "",
				"MiddleName" : "",
				"HomePhone" : "",
				"MobilePhone" : "",
				"Gender" : "",
				"CivilStatus" : "",
				"LegalId" : "",
				"BusinessTitle" : "",
				"FaxPhone" : "",
				"OrgName" : "",
			},
			"token" : GLOBAL.getAccessToken()
		};
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : GLOBAL.SERVER_URL + "/RegisterMember",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			xhr2 : true,
			disableCaching : false,
			jsonData : data,
			success : function(responce) {
				var viewport = Ext.Viewport,
					mainPanel = viewport.down("#mainviewport");
				viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
				localStorage.setItem("CURRENT_USER_LOGINNAME",values.LoginName);
				localStorage.setItem("CURRENT_USER_LOGINPASSWORD",values.Password);
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				var mainMenu = mainPanel.down("mainmenu");
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", duration: 450});
				
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},
	doLogin : function(btn) {
		var form = btn.up("login"),
			values = form.getValues(),
			GLOBAL = AllInOneWorldSport.Global,
			currentUser = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
		data = {
			"LoginName" : values.LoginName,
			"Password" : values.Password,
			"token" : GLOBAL.getAccessToken()
		};
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : GLOBAL.SERVER_URL + "/Login",
			method : "POST",
			disableCaching : false,
			jsonData : data,
			success : function(responce) {
				var viewport = Ext.Viewport,
					mainPanel = viewport.down("#mainviewport");
				viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Function.defer(function(){
						Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					},100);
					return;
				}
				localStorage.setItem("CURRENT_USER_LOGINNAME",values.LoginName);
				localStorage.setItem("CURRENT_USER_LOGINPASSWORD",values.Password);
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				var mainMenu = mainPanel.down("mainmenu");
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", duration: 450});
				
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},

	createSession : function() {
		var me = this;
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : "http://home.terrificsoftware.com:8085/powerPlayService/CreateSession",
			//url : "http://service.allinworldsportsapp.com/PowerPlayService/CreateSession",
			method : "GET",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				AllInOneWorldSport.Global.SESSION = data; 
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},
    
	toggleNavigationPanel : function() {
		var viewport = Ext.Viewport, xPos = viewport.element.getX();
		viewport.translate( xPos ? 0 : 320, 0, {
			duration : 250
		});
	},
	
	registerWithFacebook: function(){
		var me = this,
			FB_CONFIG = {
				APP_ID: '739948199396979',
	            REDIRECT_URI: 'http://home.terrificsoftware.com/PowerPlay/',
	            PERMISSIONS: "user_friends,user_events,email,public_profile",
	            AUTH_URL: ""
			},
			outh_url = "https://www.facebook.com/dialog/oauth?" + "client_id=" + FB_CONFIG.APP_ID + 
						"&redirect_uri=" + FB_CONFIG.REDIRECT_URI + 
						"&scope=" + FB_CONFIG.PERMISSIONS + 
						"&response_type=token" + "&display=touch";
			// From Mobile device login using InAppBrowser cordova Plugin
			var windowObj = window.open(outh_url, '_blank', 'location=no'),
                callbackHandler = function(event) {
                    var windowURL = event.url,
                        fbRawResponse = '';
                    if (windowURL.indexOf('access_token') != -1) {
                        fbRawResponse = windowURL.substring(windowURL.indexOf('#') + 1).split('&');
                        windowObj.close();
                        var accessToken = fbRawResponse[0].split('=')[1],
                        	expiresIn = fbRawResponse[1].split('=')[1];
                    	me.getFacebookUserDetail(accessToken);
                    }
                };
            windowObj.addEventListener('loadstart', callbackHandler);
			me.getFacebookUserDetail("CAAKgZBp2TxnMBAAChY7oCWk99AytBnrnkDdFHpIh47oUqn6tKIlfQTrj4gCSSEGQRqkFk1E6VSrzyyglmRZAu7jrEOycsU9M20vz6GuG5iRwW4eeGVXZCRHvs3IZAgwOWl4Mkj5tQBbNUoYZBAnxXZBgFML7OVj7pThx0yvxwZBluYGKM8uyPyRUhkZCbDErQNB4I30Iw88htCQ5DGiZB782FXOno9jIAE0sZD");
	},
	
	getFacebookUserDetail: function(accessToken){
		Ext.Ajax.request({
			url: "https://graph.facebook.com/v2.0/me",
			params: {
				"access_token": accessToken,	// "CAAKgZBp2TxnMBAAChY7oCWk99AytBnrnkDdFHpIh47oUqn6tKIlfQTrj4gCSSEGQRqkFk1E6VSrzyyglmRZAu7jrEOycsU9M20vz6GuG5iRwW4eeGVXZCRHvs3IZAgwOWl4Mkj5tQBbNUoYZBAnxXZBgFML7OVj7pThx0yvxwZBluYGKM8uyPyRUhkZCbDErQNB4I30Iw88htCQ5DGiZB782FXOno9jIAE0sZD",
			},
			method: "GET",
			success: function(response, opts){
				var obj = Ext.decode(response.responseText);
        		console.log(obj);
			},
			failure: function(){
			}
		});
	},
	
	doForgetPassword: function(btn){
		Ext.Msg.prompt(
			'ALL IN',
			'ForgetPasswords?',
			function(btn,text){
				if(btn == 'ok')
				{
					var GLOBAL = AllInOneWorldSport.Global;
					var data = {
						"LoginName" : text,
						"token" : GLOBAL.getAccessToken()
					};
					
					Ext.Viewport.setMasked({
						xtype : "loadmask",
						message : "Please wait"
					});
					Ext.Ajax.request({
						url : GLOBAL.SERVER_URL + "/ResetMemberPassword",
						method : "POST",
						disableCaching : false,
						jsonData : data,
						success : function(responce) {
							var viewport = Ext.Viewport,
								mainPanel = viewport.down("#mainviewport");
							viewport.setMasked(false);
							var data = Ext.decode(responce.responseText);
							console.log(data);
							if(data.errorReason && data.errorReason.ReasonCode){
								Ext.Function.defer(function(){
									Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
								},100);
								return;
							}
							Ext.Function.defer(function(){
								Ext.Msg.alert('New Password',data.NewPassword);
							},100);
							
						},
						failure : function(responce) {
							Ext.Viewport.setMasked(false);
							Ext.Function.defer(function(){
								Ext.Msg.alert('Communication Error');
							},100);
							console.log(responce);
						}
					});
				}
			},
			null,
			false, // false, default (single line)
			null,
			{placeHolder : 'LoginName'}
		);
	}
});
