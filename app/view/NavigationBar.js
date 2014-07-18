/**
 * @author chintan mehta
 */
Ext.define('AllInOneWorldSport.view.NavigationBar', {
    extend: 'Ext.Toolbar',
    xtype: 'navbar', 
    config: {
    	layout: {
    		type: "hbox",
    		align: "stretch",
    		pack: "justify"
    	},
    	title: false,
    	ui: "plain",
    	cls: "nav-toolbar-cls",
    	defaults:{
    		cls: "nav-btn-cls",
    		ui: "plain",
    		xtype: "button",
    		flex: 1,
    		iconMask: true
    	},
    	items: [{
    		iconCls: "back",
			action: "backNavigation",
    	},{
    		iconCls: "chat"
    	},{
    		iconCls: "friends"
    	},{
    		iconCls: "tickets",
    		badgeText: "4",
			action: "ticketRulesNavigation",
    	},{
    		iconCls: "coins",
    		badgeText: "25K",
			action: "buyCoinsNavigation",
    	},{
    		iconCls: "global",
			action: "myBetNavigation",
    		badgeText: "1"
    	},{
    		iconCls: "home",
			action: "homeNavigation",
    	}]
    }
});