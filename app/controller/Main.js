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
			session = AllInOneWorldSport.Global.SESSION,
			Utf8 = {
				// public method for url encoding
				encode : function(string) {
					string = string.replace(/\r\n/g, "\n");
					var utftext = "";
					for (var n = 0; n < string.length; n++) {
						var c = string.charCodeAt(n);
						if (c < 128) {
							utftext += String.fromCharCode(c);
						} else if ((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
						} else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
						}
					}
					return utftext;
				},
				decode : function(utftext) {
					var string = "";
					var i = 0;
					var c = c1 = c2 = 0;
					while (i < utftext.length) {
						c = utftext.charCodeAt(i);
						if (c < 128) {
							string += String.fromCharCode(c);
							i++;
						} else if ((c > 191) && (c < 224)) {
							c2 = utftext.charCodeAt(i + 1);
							string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
							i += 2;
						} else {
							c2 = utftext.charCodeAt(i + 1);
							c3 = utftext.charCodeAt(i + 2);
							string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
							i += 3;
						}
					}
					return string;
				}
			};

		var md5key = session.MD5HashKey;
		var sessionkey = session.UniqueID;
		var timestamp = Math.floor(new Date().valueOf() / 1000);
		var sequence = Math.floor(Math.random() * 999999999);
		var hashvalue = this.encodeToHex(Crypto.HMAC(Crypto.SHA256, Utf8.encode(sequence.toString() + "^" + timestamp.toString() + "^" + sessionkey), Utf8.encode(md5key), {
			asBytes : true
		}));
		var a = this.encodeToHex(Crypto.HMAC(Crypto.SHA256, Utf8.encode(Math.floor(Math.random() * 999999999).toString() + "^" + Math.floor(new Date().valueOf() / 1000).toString() + "^" + sessionkey), Utf8.encode(md5key), {
			asBytes : true
		}));
		data = {
			"Member" : {
				"DisplayName" : values.DisplayName,
				"FirstName" : values.FirstName,
				"LastName" : values.LastName,
				"EmailAddress" : values.EmailAddress,
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
			"token" : {
				"AdminSecurityToken" : "",
				"HashValue" : hashvalue,
				"Sequence" : sequence,
				"SessionRowKey" : sessionkey,
				"TimeStamp" : timestamp
			}
		};
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			//url			: "http://home.terrificsoftware.com:8085/powerPlayService/CreateSession",
			url : "http://home.terrificsoftware.com:8085/PowerPlayService/RegisterMember",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			xhr2 : true,
			disableCaching : false,
			jsonData : data,
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				Ext.Msg.alert('Success', "You are successfully register");
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
			session = AllInOneWorldSport.Global.SESSION,
			Utf8 = {
				// public method for url encoding
				encode : function(string) {
					string = string.replace(/\r\n/g, "\n");
					var utftext = "";
					for (var n = 0; n < string.length; n++) {
						var c = string.charCodeAt(n);
						if (c < 128) {
							utftext += String.fromCharCode(c);
						} else if ((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
						} else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
						}
					}
					return utftext;
				},
				decode : function(utftext) {
					var string = "";
					var i = 0;
					var c = c1 = c2 = 0;
					while (i < utftext.length) {
						c = utftext.charCodeAt(i);
						if (c < 128) {
							string += String.fromCharCode(c);
							i++;
						} else if ((c > 191) && (c < 224)) {
							c2 = utftext.charCodeAt(i + 1);
							string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
							i += 2;
						} else {
							c2 = utftext.charCodeAt(i + 1);
							c3 = utftext.charCodeAt(i + 2);
							string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
							i += 3;
						}
					}
					return string;
				}
			};

		var md5key = session.MD5HashKey;
		var sessionkey = session.UniqueID;
		var timestamp = Math.floor(new Date().valueOf() / 1000);
		var sequence = Math.floor(Math.random() * 999999999);
		var hashvalue = this.encodeToHex(Crypto.HMAC(Crypto.SHA256, Utf8.encode(sequence.toString() + "^" + timestamp.toString() + "^" + sessionkey), Utf8.encode(md5key), {
			asBytes : true
		}));
		var a = this.encodeToHex(Crypto.HMAC(Crypto.SHA256, Utf8.encode(Math.floor(Math.random() * 999999999).toString() + "^" + Math.floor(new Date().valueOf() / 1000).toString() + "^" + sessionkey), Utf8.encode(md5key), {
			asBytes : true
		}));
		data = {
			"LoginName" : values.LoginName,
			"Password" : values.Password,
			// "Member" : {
				// "DisplayName" : values.DisplayName,
				// "FirstName" : values.FirstName,
				// "LastName" : values.LastName,
				// "EmailAddress" : values.EmailAddress,
				// "LoginName" : values.LoginName,
				// "Password" : values.Password,
// 
				// "BusinessType" : "Member",
				// "MemberType" : "Person",
				// "SecretAnswer" : "",
				// "TaxId" : "",
				// "SecretQuestion" : "",
				// "PrimaryPhone" : "",
				// "Notes" : "",
				// "WebURL" : "",
				// "ImageURL" : "",
				// "IPAddress" : "",
				// "Title" : "",
				// "MiddleName" : "",
				// "HomePhone" : "",
				// "MobilePhone" : "",
				// "Gender" : "",
				// "CivilStatus" : "",
				// "LegalId" : "",
				// "BusinessTitle" : "",
				// "FaxPhone" : "",
				// "OrgName" : "",
			// },
			"token" : {
				"AdminSecurityToken" : "",
				"HashValue" : hashvalue,
				"Sequence" : sequence,
				"SessionRowKey" : sessionkey,
				"TimeStamp" : timestamp
			}
		};
		Ext.Viewport.setMasked({
			xtype : "loadmask",
			message : "Please wait"
		});
		Ext.Ajax.request({
			url : "http://home.terrificsoftware.com:8085/PowerPlayService/Login",
			method : "POST",
			// dataType : 'json',
			// headers : {
				// 'Content-Type' : 'application/json'
			// },
			// xhr2 : true,
			disableCaching : false,
			jsonData : data,
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data.errorReason && data.errorReason.ReasonCode){
					Ext.Msg.alert('Error', data.errorReason.ReasonDescription);
					return;
				}
				Ext.Msg.alert('Success', "You are successfully login");
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
	},

	getUTF : function() {
		Utf8 = {
			// public method for url encoding
			encode : function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				return utftext;
			},
			decode : function(utftext) {
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;
				while (i < utftext.length) {
					c = utftext.charCodeAt(i);
					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					} else if ((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					} else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
				}
				return string;
			},
		};
	},

	encodeToHex : function(str) {
		HexConverter = {
			hexDigits : '0123456789ABCDEF',

			dec2hex : function(dec) {
				return (this.hexDigits[dec >> 4] + this.hexDigits[dec & 15]);
			},

			hex2dec : function(hex) {
				return (parseInt(hex, 16))
			},
		}
		var r = "";
		var h;
		for (var i = 0; i < str.length; i++) {
			h = HexConverter.dec2hex(str[i]);
			r += h;
		}
		return r;
	},
	decodeFromHex : function(str) {
		HexConverter = {
			hexDigits : '0123456789ABCDEF',

			dec2hex : function(dec) {
				return (this.hexDigits[dec >> 4] + this.hexDigits[dec & 15]);
			},

			hex2dec : function(hex) {
				return (parseInt(hex, 16))
			}
		}
		var r = "";
		var h;
		for (var i = 0; i < str.length; i++) {
			h = HexConverter.hex2dec(str[i]);
			r += h;
		}
		return r;
	}
});
