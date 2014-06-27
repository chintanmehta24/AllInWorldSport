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
    		badge: "4"
    	},{
    		iconCls: "coins",
    		badge: "25K"
    	},{
    		iconCls: "global"
    	},{
    		iconCls: "home",
			action: "homeNavigation",
    	}]
    }
});