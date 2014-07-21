Ext.define('AllInOneWorldSport.controller.AccountSetting', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"accountsetting button[action=saveAccountSetting]": {
				tap: "saveAccountSetting"
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
	
});
