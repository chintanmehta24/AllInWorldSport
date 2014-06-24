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
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				localStorage.setItem("CURRENT_USER_LOGINNAME",values.LoginName);
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				Ext.Msg.alert('Success', "You are successfully register");
				var mainMenu = mainPanel.down("mainmenu");
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", duration: 450});
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Communication Error');
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
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				localStorage.setItem("CURRENT_USER_LOGINNAME",values.LoginName);
				localStorage.setItem("CURRENT_LOGIN_USER", Ext.encode(data));
				Ext.Msg.alert('Success', "You are successfully login");
				var mainMenu = mainPanel.down("mainmenu");
				if(!mainMenu){
					mainMenu = mainPanel.add({xtype: "mainmenu"});
				}
				mainPanel.animateActiveItem(mainMenu, {type: "slide", duration: 450});
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Communication Error');
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
				Ext.Msg.alert('Communication Error');
				console.log(responce);
			}
		});
	},
    
	toggleNavigationPanel : function() {
		var viewport = Ext.Viewport, xPos = viewport.element.getX();
		viewport.translate( xPos ? 0 : 320, 0, {
			duration : 250
		});
	}
});
