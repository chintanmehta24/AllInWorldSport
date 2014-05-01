Ext.define('AllInOneWorldSport.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: ["Ext.data.Store"],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'All In World Sports',
                items: [{
                    xtype: "button",
                    action: "toggleNavigationPanel",
                    iconCls: "list",
                    iconAlign: "left",
                    ui: "plain"
                }]
            },
            {
                title: 'Dashboard',
                iconCls: 'home',

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: "New Bet",
                iconCls: "add"
            },
            {
                title: "Leaders",
                iconCls: "team"
            },
            {
                title: "Coins",
                iconCls: "case"
            }
        ]
    }
});
