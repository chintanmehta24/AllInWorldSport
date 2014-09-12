Ext.define('AllInOneWorldSport.controller.Profile', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"profile button[action=showMyfriends]": {
				tap: "showMyFriends"
			},
			"profile button[action=buyIcons]": {
				tap : "buyIcons"
			},
			"profile button[action=saveProfile]":{
				tap : "saveProfile"
			},
			"profile button[action=sshowFriends]":{
				tap : "sshowFriends"
			},
			"profile button[action=gotoAccountSettings]":{
				tap: "gotoAccountSettings"
			},
			"profile button[action=takeProfilePhoto]": {
				tap: "takeProfilePhoto"
			},
			"profile button[action=uploadProfilePhoto]": {
				tap: "uploadProfilePhoto"
			},
			"profile button[action=deleteProfilePhoto]": {
				tap: "deleteProfilePhoto"
			}
		}
	},
	
	showMyFriends: function(btn){
		Ext.Viewport.add({
			xtype: "managefriendlist",
			listType: "Friends"
		}).show();
	},
	
	buyIcons: function(){
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			buycoins = mainPanel.down("buycoins");
		if(!buycoins){
			buycoins = mainPanel.add({xtype: "buycoins"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(buycoins, {type: "slide", direction: "left", duration: 450});
		
	},
	
	saveProfile:function(btn){
		var me = this,
			formPanel = btn.up("profile"),
			values = formPanel.getValues(),
			ParticipantTeams = formPanel.query("[name=Participant]");
			
		if(!values.Participant || values.Participant.length !== 2 && Ext.isEmpty(values.Participant[0]) && Ext.isEmpty(values.Participant[1])){
			Ext.Function.defer(function(){
				Ext.Msg.alert("Error", "Please select the team");
			},100);
			return;
		}
		
		var Participants = [];
		var participate1 = ParticipantTeams[0].getRecord(),
			participate2 = ParticipantTeams[1].getRecord();
		Participants.push(participate1.getData());
		Participants.push(participate2.getData());
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
			loginName = localStorage.getItem("CURRENT_USER_LOGINNAME");
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
	                FirstName: values.FirstName,
	                LastName: current_user.Member.LastName,
	                LoginName: loginName,//current_user,
	                EmailAddress: values.Email,
	                PrimaryPhone: current_user.Member.PrimaryPhone,
	                MemberId: current_user.MemberId,
					WebURL:values.Status,
					Notes:values.AboutMe,
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
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(data.MemberBalance));
				
				var viewport = Ext.Viewport,
					mainPanel = viewport.down("#mainviewport"),
					mainMenu = mainPanel.down("mainmenu");
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", direction: "right", out: true, duration: 450});
				AllInOneWorldSport.Global.NavigationStack = [];
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
	gotoAccountSettings: function(){
	
		var viewport = Ext.Viewport,
			mainPanel = viewport.down("#mainviewport"),
			accountsettings = mainPanel.down("accountsetting");
		if(!accountsettings){
			accountsettings = mainPanel.add({xtype: "accountsetting"});
		}
		AllInOneWorldSport.Global.NavigationStack.push(mainPanel.getActiveItem());
		mainPanel.animateActiveItem(accountsettings, {type: "slide", direction: "left", duration: 450});
		
	},
	
	getPhoneContactList: function(){
		// find all contacts with '' in any name field
		var options      = new ContactFindOptions();
		options.filter   = "";
		options.multiple = true;
		var fields       = ["displayName", "name", "phoneNumbers", "emails"];
		Ext.Viewport.add({
			xtype: "list",
			itemTpl: "<div>{displayName}</div><div>{emails}</div>",
			store: "PhoneContacts",
			height: 400,
			width: 300
		}).show();
		navigator.contacts.find(fields, function(contacts){
			var store = Ext.getStore("PhoneContacts");
			var arrayPhone = [];
			Ext.Array.forEach(contacts, function(c){
				var obj = {
					id: c.id,
					rawId: c.rawId,
					displayName: c.displayName,
					phoneNumbers: c.phoneNumbers ? c.phoneNumbers[0].value: "",
					emails: c.emails ? c.emails[0].value : ""
				};
				console.log(Ext.encode(obj));
				arrayPhone.push(obj);
			});
			store.add(arrayPhone);
		}, function(){alert("Error");}, options);		
	},
	
	takeProfilePhoto: function(btnCmp){
		var me = this;
		Ext.Msg.show({
			title: "Profile Image", 
			message: "Select an option",
			buttons: [{
				itemId: "0",
				text: "Gallery", 
				ui:"action"
			},{
				itemId:"1",
				text:"Camera", 
				ui:"action"
			}, {
				itemId: "cancel",
				text: "Cancel",
				ui: "decline"
			}],
			promptConfig: false,
			scope: me,
			fn: function(btn){
				if(btn == "cancel"){
					return;
				}
				this.openCordovaPicker.call(this, btnCmp, Number(btn));
			}
		});
	},
	
	openCordovaPicker: function(component, sourceType){
		var me = this,
			width = (Ext.getBody().getWidth() * 2 * sourceType),
			height = (Ext.getBody().getHeight() * 2 * sourceType);
		navigator.camera.getPicture(function(fileURL){
			component.element.setStyle("backgroundImage", 'url("' + fileURL + '")');
			component.up('profile').setProfilePickImageUrl(fileURL);
		}, function(error){
			console.log(Ext.encode(error));
			Ext.Msg.alert("Error", Ext.encode(error));
			// alert("Fail " + Ext.encode(error));
		}, {
			quality : 50,
			destinationType : 1,
			/*  DATA_URL : 0,      // Return image as base64-encoded string
			    FILE_URI : 1,      // Return image file URI
			    NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)	*/
			sourceType : sourceType,	//	0,
			/*	PHOTOLIBRARY : 0,
			    CAMERA : 1,
			    SAVEDPHOTOALBUM : 2	*/
			//allowEdit : true,
			//correctOrientation: true,
			targetWidth: width ,
			targetHeight: height ,
			encodingType: 1,
			/* JPEG : 0,               // Return JPEG encoded image
			    PNG : 1	*/
			saveToPhotoAlbum: true,
			mediaType: 0
		});
	},
	
	uploadProfilePhoto: function(btn){
		var me = this,
			formPanel = btn.up("profile"),
			fileURL = formPanel.getProfilePickImageUrl();
		if(Ext.isEmpty(fileURL))
			return;
		var options = new FileUploadOptions(),
			viewport = Ext.Viewport;
		options.fileKey = "files[]";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "image/png";

		var params = {};			
		options.params = params;

		var ft = new FileTransfer(),
			viewport = Ext.Viewport,
			ftURL = "http://fileupload.allinworldsportsapp.com/FileTransferHandler.ashx";
		ft.onprogress = function(progressEvent) {
			if (progressEvent.lengthComputable) {
				var mask = viewport.getMasked();
			  mask.setMessage("Uploading..." + Ext.Number.toFixed((progressEvent.loaded / progressEvent.total),2) + "%");
			}
		};				
		viewport.setMasked({
			xtype: "loadmask",
			message: "Uploading..."
		});
		ft.upload(fileURL, encodeURI(ftURL), function(obj){
			viewport.setMasked(false);
			console.log("Success: "+ Ext.encode(obj));
			var response = Ext.decode(obj.response),
				data = Ext.isArray(response) ? response[0]: response,
				url = data && data.name; 
			formPanel.getProfilePickImageUrl(null);
			me.updateProfilePicture("http://images.allinworldsportsapp.com/"+url);
			// component.element.setStyle("backgroundImage", 'url("http://images.allinworldsportsapp.com/' + url + '")');
		}, function(obj){
			viewport.setMasked(false);
			console.log("Fail: "+ Ext.encode(obj));
			Ext.Msg.alert("Error", "Image upload failed");
		}, options);
	},
	
	updateProfilePicture: function(imageUrl){
		var current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
			loginName = localStorage.getItem("CURRENT_USER_LOGINNAME");
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
	                LoginName: loginName,//current_user,
	                EmailAddress: current_user.Member.EmailAddress,
	                PrimaryPhone: current_user.Member.PrimaryPhone,
	                MemberId: current_user.MemberId,
					WebURL: current_user.Member.WebURL,
					Notes: current_user.Member.Notes,
					ProfileStatus: current_user.Member.ProfileStatus,
					PhotoUrl: imageUrl
				},
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
				localStorage.setItem("CURRENT_USER_MEMBERBALANCE",Ext.encode(data.MemberBalance));
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
			}
		});
	},
	
	deleteProfilePhoto: function(btn){
		// http://fileupload.allinworldsportsapp.com/FileTransferHandler.ashx?f=Ace-of-Spades-icon.png
		var me = this,
			current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER")),
			member = current_user.Member,
			photoUrl = member.WebURL,
			isUrlOnAllInWorld = photoUrl.indexOf("http://images.allinworldsportsapp.com") >= 0,
			fileName = photoUrl.substr(photoUrl.lastIndexOf("/") + 1),
			successFn = function(){
					me.updateProfilePicture("");
			};
		if(isUrlOnAllInWorld){
			Ext.Ajax.request({
				url : "http://fileupload.allinworldsportsapp.com/FileTransferHandler.ashx",
				method : "DELETE",
				disableCaching : false,
				params: {
					"f": fileName
				},
				success: function(){
					successFn();
				},
				failure: function(){
					
				}
			});
		}else{
			successFn();
		}
	}
});
