Ext.define('AllInOneWorldSport.view.MainMenu', {
	extend : 'Ext.Container',
	xtype : 'mainmenu',
	requires : ['Ext.Panel', 'Ext.Button'],
	
	config : {
		cls : 'main-menu-cls',
		layout : {
			type : 'vbox',
			pack: 'center'
		},
		items : [/*{
			xtype: "navbar",
			docked: "top"
		},*/{
			xtype : 'container',
			layout:{
				type:'hbox',
				pack:'center'
			},
			defaults: {
				xtype:'button',
				flex: 1,
				cls: "action-btn-cls"
			},
			items:[
			{
				text:'GET<br>COINS',
				action: "gotoBuyCoins"
			},{
				text:'BETS',
				action: "showMyBets"
			},{
				text:'FREE<br>STUFF',
				
			}]
		},{
			xtype:'container',
			layout:{
				type:'hbox',
				align: 'center',
				pack:'center'
			},
			items:[{
				xtype:'button',
				cls: "play-btn-cls",
				action: "playBtnMainMenu",
				text:'PLAY'
			}]
		},{
			xtype:'container',
			layout:{
				type:'hbox',
				pack:'center'
			},
			defaults: {
				xtype:'button',
				flex: 1,
				cls: "action-btn-cls"
			},
			items:[{
				text:'INVITE<br>FRIENDS',
				action : "popupWonWindow"
			},{
				text:'I NEED<br>TICKETS',
				action: "gotoTicketRules",
			}]
		},{
			xtype : 'container',
			layout:{
				type:'hbox',
				pack:'center'
			},
			defaults: {
				xtype:'button',
				flex: 1,
				cls: "action-btn-cls"
			},
			items:[{
				text:'MY<br>PROFILE',
				action: "viewprofile"
			},{
				text:'LEADER<br>BOARDS',
				action: "gotoLeaderBoard"
			},{
				text:'ACCOUNT<br>SETTINGS',
				action: "gotoAccountSettings"
			}]
		}]
	}

}); 