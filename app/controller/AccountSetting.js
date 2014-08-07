Ext.define('AllInOneWorldSport.controller.AccountSetting', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"accountsetting button[action=saveAccountSetting]": {
				tap: "saveAccountSetting"
			},
			"accountsetting button[action=facebookLogin]":{
				tap : "registerWithFacebook"
			},
			/*"profile button[action=buyIcons]": {
				tap : "buyIcons"
			},
			"profile button[action=saveProfile]":{
				tap : "saveProfile"
			},
			"profile button[action=sshowFriends]":{
				tap : "sshowFriends"
			}*/
			"accountsetting button[action=showMyfriends]": {
				tap: "showMyFriends"
			},
			"accountsetting button[action=addFriendFromContactList]": {
				tap: "addFriendFromContactList"
			},
			
		}
	},
	
	saveAccountSetting: function(btn){
		var me = this;
		var password = Ext.getCmp('id_Password').getValue();
		var confirmPassword = Ext.getCmp('id_ConfirmPassword').getValue();
		if(password!="" && confirmPassword!=""){
			if(password != confirmPassword){
				Ext.Msg.alert("Password not match...");
			}
			else if(password!="" && confirmPassword!="")
			{
				me.savePassword(password,btn);
			}
		}
		else
			me.saveProfile(btn);
	},
	
	savePassword:function(newPassword,btn)
	{
		var me = this;
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});

		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/UpdateMemberPassword",
			method : "POST",
			disableCaching : false,
			jsonData : {
				MemberId: current_user.MemberId,
				OldPassword: localStorage.getItem("CURRENT_USER_LOGINPASSWORD"),
				Password: newPassword,
				requestChange: false,
				token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				if(data.errorReason && data.errorReason.ReasonCode){
				Ext.Function.defer(function(){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
				},100);
					return;
				}
				localStorage.setItem("CURRENT_USER_LOGINPASSWORD",newPassword);
				//Ext.Msg.alert("Setting Change");
				me.saveProfile(btn);
				
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
	
	
	saveProfile:function(btn){
		var me = this,
			AccountSetting = btn.up("accountsetting"),
			ParticipantTeams = AccountSetting.query("[name=Participant]"),
			LoginName = AccountSetting.query("[name=LoginName]"),
			ChangeStatus = AccountSetting.query("[name=ChangeStatus]"); 
			
		/*if(!values.Participant || values.Participant.length !== 2 && Ext.isEmpty(values.Participant[0]) && Ext.isEmpty(values.Participant[1])){
			Ext.Function.defer(function(){
				Ext.Msg.alert("Error", "Please select the team");
			},100);
			return;
		}*/
		
		var Participants = [];
		var participate1 = ParticipantTeams[0].getRecord(),
			participate2 = ParticipantTeams[1].getRecord();
		Participants.push(participate1.getData());
		Participants.push(participate2.getData());
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
			//loginName = localStorage.getItem("CURRENT_USER_LOGINNAME");
		
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : AllInOneWorldSport.Global.SERVER_URL + "/UpdateProfile",
			method : "POST",
			disableCaching : false,
			jsonData : {
				MemberId: current_user.MemberId,
				Member: {
					DisplayName: current_user.Member.FirstName,
	                FirstName: current_user.Member.FirstName,
	                LastName: current_user.Member.LastName,
					EmailAddress: current_user.Member.EmailAddress,
					PrimaryPhone: current_user.Member.PrimaryPhone,
					Notes:current_user.Member.Notes,
	                LoginName: LoginName[0].getValue(),//current_user,
	                MemberId: current_user.MemberId,
					WebURL:ChangeStatus[0].getValue(),
				},
				Participants : Participants,
	            token: AllInOneWorldSport.Global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				if(data.errorReason && data.errorReason.ReasonCode){
				Ext.Function.defer(function(){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
				},100);
					return;
				}
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				localStorage.setItem("CURRENT_USER_LOGINNAME",LoginName[0].getValue());
				
				var View = AllInOneWorldSport.Global.NavigationStack.pop();
				var viewport = Ext.Viewport,
					mainPanel = viewport.down("#mainviewport");
				mainPanel.animateActiveItem(View, {type: "slide",direction: "right", duration: 450});
		
				Ext.Function.defer(function(){
					Ext.Msg.alert('Message','Account Setting Change Successfully');
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
	},
	sshowFriends: function(){
		var View = AllInOneWorldSport.Global.NavigationStack.pop();
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport");
		
		mainPanel.animateActiveItem(View, {type: "slide",direction: "right", duration: 450});
	},
	
	registerWithFacebook: function(){
		var me = this,
			FB_CONFIG = {
				APP_ID: '739948199396979',
	            REDIRECT_URI: 'http://goo.gl/Limtf',	//'http://home.terrificsoftware.com/PowerPlay/',
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
                    	me.getFacebookUserDetail(accessToken, true);
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
				me.doFacebookRegistration(obj);
				
			},
			failure: function(){
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
			}
		});
	},
	
	doFacebookRegistration:function(FacebookObject){
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
				ImageURL: "",
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
		}
		
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
				Ext.Function.defer(function(){
						Ext.Msg.alert('Message', "Connected to facebook scucessfully.");
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
	},
	
	showMyFriends: function(btn){
		Ext.Viewport.add({
			xtype: "managefriendlist",
			listType: "Friends"
		}).show();
	},
	
	addFriendFromContactList : function(){
		Ext.Viewport.add({
			xtype: "phonebookcontactlist"}
		).show();
	}
	
});
