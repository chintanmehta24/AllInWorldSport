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
    		iconCls: "friends",
			action : "friendList"
    	},{
    		iconCls: "tickets",
			itemId : "Tickets",
    		badgeText: "4",
			action: "ticketRulesNavigation",
    	},{
    		iconCls: "coins",
    		badgeText: "25K",
			itemId : "Coins",
			action: "buyCoinsNavigation",
    	},{
    		iconCls: "global",
			action: "myBetNavigation",
    		badgeText: "1"
    	},{
    		iconCls: "home",
			action: "homeNavigation",
    	}]
    },
	listeners: {
		painted: function (element, options) {
			var me = this,
				current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
			if(current_user){
				var ticketBalance = me.down("#Tickets");
				var CoinBalance = me.down("#Coins");
				var creditBalance = Ext.decode(localStorage.getItem("CURRENT_USER_CREDITBALANCE"));
				
				var balanceInK = creditBalance/1000;
				
				ticketBalance.setBadgeText(current_user.MemberBalance.TicketBalance);
				CoinBalance.setBadgeText(balanceInK+"K");
			}
		}
	}
});