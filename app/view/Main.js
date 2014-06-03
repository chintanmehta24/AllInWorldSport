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
                xtype: "panel",
                layout: "card",
                items: [{
                	xtype: "dashboard"
                }]
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
