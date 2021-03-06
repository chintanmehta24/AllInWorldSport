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
		this.loadInAppStore();
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
		
		//validation
		if(values.DisplayName == "" || values.LoginName == "" || values.Password == ""){
			Ext.Function.defer(function(){
				Ext.Msg.alert("Message","Required field is empty");
			},100);
			return;
		}
		
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
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).MemberBalance));
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
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).MemberBalance));
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
		var me = this,
			global = AllInOneWorldSport.Global;
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : global.SERVER_URL + "/CreateSession",
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
				APP_ID: '277412065764445',//'739948199396979',
	            REDIRECT_URI: 'http://allinworldsportsapp.com:8082/',//'http://goo.gl/Limtf',	//'http://home.terrificsoftware.com/PowerPlay/',
	            PERMISSIONS: "user_friends,user_events,email,public_profile,manage_friendlists,read_friendlists",
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
                        var accessToken = fbRawResponse[0].split('=')[1],
                        	expiresIn = fbRawResponse[1].split('=')[1];
                    	localStorage.setItem("FACEBOOK_DATA", Ext.encode({
                    		access_token: accessToken,
                    		expires_in: expiresIn
                    	}));
                    	me.getFacebookUserDetail(accessToken, true);
                        windowObj.close();
                    }
					if(windowURL.indexOf('http://allinworldsportsapp.com:8082/')==0){
						windowObj.close();
					}
					
                };
            windowObj.addEventListener('loadstart', callbackHandler);
			//me.getFacebookUserDetail("CAAKgZBp2TxnMBAAChY7oCWk99AytBnrnkDdFHpIh47oUqn6tKIlfQTrj4gCSSEGQRqkFk1E6VSrzyyglmRZAu7jrEOycsU9M20vz6GuG5iRwW4eeGVXZCRHvs3IZAgwOWl4Mkj5tQBbNUoYZBAnxXZBgFML7OVj7pThx0yvxwZBluYGKM8uyPyRUhkZCbDErQNB4I30Iw88htCQ5DGiZB782FXOno9jIAE0sZD");
	},
	
	getFacebookUserDetail: function(accessToken, status){
		var me = this;
		Ext.Ajax.request({
			url: "https://graph.facebook.com/v2.0/me",
			params: {
				"access_token": accessToken,	// "CAAKgZBp2TxnMBAAChY7oCWk99AytBnrnkDdFHpIh47oUqn6tKIlfQTrj4gCSSEGQRqkFk1E6VSrzyyglmRZAu7jrEOycsU9M20vz6GuG5iRwW4eeGVXZCRHvs3IZAgwOWl4Mkj5tQBbNUoYZBAnxXZBgFML7OVj7pThx0yvxwZBluYGKM8uyPyRUhkZCbDErQNB4I30Iw88htCQ5DGiZB782FXOno9jIAE0sZD",
			},
			method: "GET",
			success: function(response, opts){
				var obj = Ext.decode(response.responseText);
        		console.log(obj);
				
			var loginContainer = Ext.Viewport.down("#loginBtnContainer"),
				registerContainer = Ext.Viewport.down("#registerBtnContainer");
				
        		/*if(loginContainer.isHidden())
					me.doFacebookRegistration(obj);
				else*/
				var PhotoUrl = me.getFacebookUserProfilePicture(accessToken, status);
				me.doFacebookLogin(obj,PhotoUrl);
				
			},
			failure: function(){
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
			}
		});
	},
	
	getFacebookUserProfilePicture: function(accessToken, status){
		var me = this;
		Ext.Ajax.request({
			url: "https://graph.facebook.com/v2.0/me/picture?redirect=0&height=200&type=normal&width=200",
			params: {
				"access_token": accessToken,	// "CAAKgZBp2TxnMBAAChY7oCWk99AytBnrnkDdFHpIh47oUqn6tKIlfQTrj4gCSSEGQRqkFk1E6VSrzyyglmRZAu7jrEOycsU9M20vz6GuG5iRwW4eeGVXZCRHvs3IZAgwOWl4Mkj5tQBbNUoYZBAnxXZBgFML7OVj7pThx0yvxwZBluYGKM8uyPyRUhkZCbDErQNB4I30Iw88htCQ5DGiZB782FXOno9jIAE0sZD",
			},
			method: "GET",
			success: function(response, opts){
				var obj = Ext.decode(response.responseText);
        		console.log(obj);
				return obj.data.url;
				
			},
			failure: function(){
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				return "";
			}
		});
	},
	
	getFacebookFriendsList: function(accessToken){
		Ext.Ajax.request({
			url: "https://graph.facebook.com/v2.0/me/friends",
			params: {
				"access_token": accessToken,	// "CAAKgZBp2TxnMBAAChY7oCWk99AytBnrnkDdFHpIh47oUqn6tKIlfQTrj4gCSSEGQRqkFk1E6VSrzyyglmRZAu7jrEOycsU9M20vz6GuG5iRwW4eeGVXZCRHvs3IZAgwOWl4Mkj5tQBbNUoYZBAnxXZBgFML7OVj7pThx0yvxwZBluYGKM8uyPyRUhkZCbDErQNB4I30Iw88htCQ5DGiZB782FXOno9jIAE0sZD",
				"limit": 5000
			},
			method: "GET",
			success: function(response, opts){
				var obj = Ext.decode(response.responseText);
        		console.log(obj);
			},
			failure: function(){
				alert("Error Facebook Friend List");
			}
		});
	},
	
	doForgetPassword: function(btn){
		Ext.Msg.prompt(
			'ALL IN',
			'Forgot Password?',
			function(btn,text){
				if(btn == 'ok')
				{
					if(text == "" || text == null){
						
						Ext.Function.defer(function(){
							Ext.Msg.alert("Message","Required field is empty");
						},100);
						return;
					}
					else{
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
				}
			},
			null,
			false, // false, default (single line)
			null,
			{placeHolder : 'Login Name'}
		);
	},
	
	doFacebookRegistration:function(FacebookObject,UserPhotoURL){
		var GLOBAL = AllInOneWorldSport.Global;
		var data = {
			"Member" : {
				DisplayName: FacebookObject.id.toString(),
				FirstName: FacebookObject.first_name,
				LastName: FacebookObject.last_name,
				LoginName: FacebookObject.id.toString(),
				Password: "Facebook",
				FacebookUId: FacebookObject.id.toString(),
				SecretAnswer: "",
				EmailAddress: "",
				MemberType: "Person",
				TaxId: "",
				SecretQuestion: "",
				PrimaryPhone: "",
				Notes: "",
				WebURL: "",
				ImageURL: UserPhotoURL,
				IPAddress: "",
				Title: "",
				MiddleName: "",
				HomePhone: "",
				MobilePhone: "",
				Gender: FacebookObject.gender,
				CivilStatus: "",
				LegalId: "",
				BusinessTitle: "",
				FaxPhone: "",
				OrgName: "",
				BusinessType: "Member"
			},
			"token" : GLOBAL.getAccessToken()
		};
		
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : GLOBAL.SERVER_URL + "/RegisterFaceBookMember",
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
				
				localStorage.setItem("CURRENT_USER_LOGINNAME",FacebookObject.id.toString());
				localStorage.setItem("CURRENT_USER_LOGINPASSWORD","Facebook");
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).MemberBalance));
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
	
	doFacebookLogin:function(FacebookObject,UserProfileURL){
		var GLOBAL = AllInOneWorldSport.Global,
			currentUser = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
		data = {
			FacebookUId: FacebookObject.id,
			"token" : GLOBAL.getAccessToken()
		},
		me=this;
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : GLOBAL.SERVER_URL + "/FacebookLogin",
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
					if(data.errorReason.ReasonDescription.indexOf("Member not found")> -1)
						me.doFacebookRegistration(FacebookObject,UserProfileURL);
					else{
						Ext.Function.defer(function(){
							Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
						},100);
						return;
					}
				}
				localStorage.setItem("CURRENT_USER_LOGINNAME",FacebookObject.id);
				localStorage.setItem("CURRENT_USER_LOGINPASSWORD","Facebook");
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")).MemberBalance));
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
	
	loadInAppStore:function(){
		var me = this;
		if(typeof window.storekit !== "undefined" && Ext.os.is.iOS){
			window.storekit.init({
	
				debug: true, /* Because we like to see logs on the console */
	
				purchase: function (transactionId, productId) {
					AllInOneWorldSport.app.getController('BuyCoins').getCoins(transactionId,productId);
					console.log('purchased: ' + productId);
				},
				restore: function (transactionId, productId) {
					console.log('restored: ' + productId);
				},
				restoreCompleted: function () {
				   console.log('all restore complete');
				},
				restoreFailed: function (errCode) {
					console.log('restore failed: ' + errCode);
					Ext.Viewport.setMasked(false);
				},
				error: function (errno, errtext) {
					console.log('Failed: ' + errtext);
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert('Message',''+errtext);
					
				},
				ready: function () {
					var productIds = [
						"Allin500Coins",
						"Allin1500Coins",
						"Allin5000Coins",
						"Allin10000Coins",
						"Allin20000Coins"
						
					];
					window.storekit.load(productIds, function(validProducts, invalidProductIds) {
						$.each(validProducts, function (i, val) {
							console.log("id: " + val.id + " title: " + val.title + " val: " + val.description + " price: " + val.price);
						});
						if(invalidProductIds.length) {
							console.log("Invalid Product IDs: " + JSON.stringify(invalidProductIds));
						}
					});
				}
			});
		}else if(Ext.os.is.Android){
			inappbilling.init(function(){
				inappbilling.getPurchases(function(list){
					//alert(typeof list == "string" ? list : Ext.encode(list));
					inappbilling.getAvailableProducts(function(list){
						//alert(typeof list == "string" ? list : Ext.encode(list));
						// allin10000coins
						inappbilling.getProductDetails(function(){
							//alert(typeof list == "string" ? list : Ext.encode(list));
						},function(){
							//Ext.Msg.alert("Message", "Android - inaapbilling - init -- getPurchases - getProductDetails");
						}, ["allin10000coins","allin1500coins","allin20000coins","allin500coins","allin5000coins"]);
					},function(){
					});
				}, function(){
					//Ext.Msg.alert("failure", "Android - inaapbilling - init -- getPurchases");
				});
			}, function(){
				Ext.Msg.alert("Message", "Android store not load");
			}, {
				showLog: true
			}, ["allin10000coins","allin1500coins","allin20000coins","allin500coins","allin5000coins"]);
		}
	}
	
});
