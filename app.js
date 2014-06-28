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
    	'AllInOneWorldSport.proxy.AWSProxy',
        'Ext.MessageBox',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.Img',
        'Ext.Label',
        'AllInOneWorldSport.Global',
        'Ext.field.Search',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'AllInOneWorldSport.store.ListParticipants'
    ],
    
    controllers: [
        "Main",
        "MainMenu",
        "Navigation",
        "Profile"
    ],
    
    models: [
    	"GameList",
		"ListParticipant"
    ],
    
    stores: [
    	"GameLists",
		"ListParticipants"
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
        'ManageFriendList'
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
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

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
