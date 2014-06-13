Ext.define('AllInOneWorldSport.Global',{
	singleton: true,
	SESSION: null,
	CURRENT_LOGIN_USER: null,
	SERVER_URL: "http://home.terrificsoftware.com:8085/PowerPlayService",
	UTF8: {
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
	},
	encodeToHex : function(str) {
		var HexConverter = {
				hexDigits : '0123456789ABCDEF',
				dec2hex : function(dec) {
					return (this.hexDigits[dec >> 4] + this.hexDigits[dec & 15]);
				},
				hex2dec : function(hex) {
					return (parseInt(hex, 16));
				},
			},
			r = "";
		for (var i = 0; i < str.length; i++) {
			r += HexConverter.dec2hex(str[i]);
		}
		return r;
	},
	decodeFromHex : function(str) {
		var HexConverter = {
				hexDigits : '0123456789ABCDEF',
				dec2hex : function(dec) {
					return (this.hexDigits[dec >> 4] + this.hexDigits[dec & 15]);
				},
				hex2dec : function(hex) {
					return (parseInt(hex, 16));
				}
			},
			r = "";
		for (var i = 0; i < str.length; i++) {
			r += HexConverter.hex2dec(str[i]);
		}
		return r;
	},
	getAccessToken: function(){
		var me = this,
			session = me.SESSION,
			Utf8 = me.UTF8,
			md5key = session.MD5HashKey,
			sessionkey = session.UniqueID,
			timestamp = Math.floor(new Date().valueOf() / 1000),
			sequence = Math.floor(Math.random() * 999999999),
			hashvalue = me.encodeToHex(Crypto.HMAC(Crypto.SHA256, Utf8.encode(sequence.toString() + "^" + timestamp.toString() + "^" + sessionkey), Utf8.encode(md5key), {
				asBytes : true
			})),
			a = me.encodeToHex(Crypto.HMAC(Crypto.SHA256, Utf8.encode(Math.floor(Math.random() * 999999999).toString() + "^" + Math.floor(new Date().valueOf() / 1000).toString() + "^" + sessionkey), Utf8.encode(md5key), {
			asBytes : true
		}));
		return {
			"AdminSecurityToken" : "",
			"HashValue" : hashvalue,
			"Sequence" : sequence,
			"SessionRowKey" : sessionkey,
			"TimeStamp" : timestamp
		};
	}
});
