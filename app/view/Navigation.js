Ext.define("AllInOneWorldSport.view.Navigation",{
    extend: "Ext.dataview.DataView",
    xtype: "navigation",
    config:{
        itemTpl: "{text}",
        cls: "navigation-cls",
        itemCls: "navigation-item-cls",
        store: {
            fields: ["text", "action"],
            data: [{
                text: "Dashboard",
                action: "dashboard"
            },{
                text: "My Bets",
                action: "mybets"
            },{
                text: "Create a Bet",
                action: "createbet"
            },{
                text: "Leaders",
                action: "leaders"
            },{
                text: "Signals!",
                action: "signals"
            },{
                text: "Chat",
                action: "chat"
            },{
                text: "Get Coins",
                action: "getcoins"
            },{
                text: "My Profile",
                action: "myprofile"
            },{
                text: "Settings",
                action: "settings"
            },{
                text: "Exit App",
                action: "exitapp"
            }]
        }
    }
});
