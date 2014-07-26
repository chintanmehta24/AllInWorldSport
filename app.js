/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'AllInOneWorldSport',

    requires: [
        'Ext.MessageBox',
    	'AllInOneWorldSport.proxy.AWSProxy',
        'AllInOneWorldSport.Global',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.Img',
        'Ext.Label',
        'Ext.field.Search',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.field.Radio',
        'Ext.field.Spinner'
    ],
    
    controllers: [
        "Main",
        "MainMenu",
        "Navigation",
        "Profile",
		"AccountSetting",
		"MyBets",
    ],
    
    models: [
    	"GameList",
		"ListParticipant",
		"LeaderBoardTopFivePlayers",
		"Friend",
		"MyBets"
    ],
    
    stores: [
    	"GameLists",
		"ListParticipants",
		"LeaderBoardTopFivePlayers",
		"Friends",
		"MyBets"
    ],

    views: [
        'Main',
        'Login',
        'Navigation',
        'Dashboard',
        'MainMenu',
        'GamesList',
        'AboutGame',
        'BetPage',
        'BetDetail',
        'NavigationBar',
        'Profile',
        'ManageFriendList',
        'BuyCoins',
        'WinnerCircle',
        'WonPopUp',
        'MyBet',
		'MyBetFromFriends',
		'AccountSetting',
		'LeaderBoard',
		'OtherUserProfile'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
    	Ext.apply(Ext, {
			filterPlatform: function(platform) {
			    var profileMatch = false,
			        ua = navigator.userAgent,
			        j, jln;
			
			    platform = [].concat(platform);
			
			    function isPhone(ua) {
			        var isMobile = /Mobile(\/|\s)/.test(ua);
			
			        // Either:
			        // - iOS but not iPad
			        // - Android 2
			        // - Android with "Mobile" in the UA
			
			        return /(iPhone|iPod)/.test(ua) ||
			                  (!/(Silk)/.test(ua) && (/(Android)/.test(ua) && (/(Android 2)/.test(ua) || isMobile))) ||
			                  (/(BlackBerry|BB)/.test(ua) && isMobile) ||
			                  /(Windows Phone)/.test(ua);
			    }
			
			    function isTablet(ua) {
			        return !isPhone(ua) && (/iPad/.test(ua) || /Android|Silk/.test(ua) || /(RIM Tablet OS)/.test(ua) ||
			            (/MSIE 10/.test(ua) && /; Touch/.test(ua)));
			    }
			
			    // Check if the ?platform parameter is set in the URL
			    var paramsString = window.location.search.substr(1),
			        paramsArray = paramsString.split("&"),
			        params = {},
			        testPlatform, i;
			
			    for (i = 0; i < paramsArray.length; i++) {
			        var tmpArray = paramsArray[i].split("=");
			        params[tmpArray[0]] = tmpArray[1];
			    }
			
			    testPlatform = params.platform;
			    if (testPlatform) {
			        return platform.indexOf(testPlatform) != -1;
			    }
			
			    for (j = 0, jln = platform.length; j < jln; j++) {
			        switch (platform[j]) {
			            case 'phone':
			                profileMatch = isPhone(ua);
			                break;
			            case 'tablet':
			                profileMatch = isTablet(ua);
			                break;
			            case 'desktop':
			                profileMatch = !isPhone(ua) && !isTablet(ua);
			                break;
			            case 'ios':
			                profileMatch = /(iPad|iPhone|iPod)/.test(ua);
			                break;
			            case 'android':
			                profileMatch = /(Android|Silk)/.test(ua);
			                break;
			            case 'blackberry':
			                profileMatch = /(BlackBerry|BB)/.test(ua);
			                break;
			            case 'safari':
			                profileMatch = /Safari/.test(ua) && !(/(BlackBerry|BB)/.test(ua));
			                break;
			            case 'chrome':
			                profileMatch = /Chrome/.test(ua);
			                break;
			            case 'ie10':
			                profileMatch = /MSIE 10/.test(ua);
			                break;
			            case 'windows':
			                profileMatch = /MSIE 10/.test(ua) || /Trident/.test(ua);
			                break;
			            case 'tizen':
			                profileMatch = /Tizen/.test(ua);
			                break;
			            case 'firefox':
			                profileMatch = /Firefox/.test(ua);
			        }
			        if (profileMatch) {
			            return true;
			        }
			    }
			    return false;
			}
    	});
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
		Ext.create("AllInOneWorldSport.store.ListParticipants",{
			storeId: "ListParticipants1",
			League:"NFL",
			GroupType: "Conference"
		});
		Ext.create("AllInOneWorldSport.store.ListParticipants",{
			storeId: "ListParticipants2",
			League:"NCAA",
			GroupType: "Conference"
		});
        // Initialize the main view
        var login = Ext.create("AllInOneWorldSport.view.Login");
        Ext.Viewport.add({
        	xtype: "panel",
        	layout: "card",
        	itemId: "mainviewport",
        	items:[login]
        });
/*
        Ext.Viewport.add(Ext.create('AllInOneWorldSport.view.Main'));
        Ext.Viewport.add({
            xtype: "navigation",
            top: 0,
            bottom: 0,
            right: "100%"
        });
*/
        
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
