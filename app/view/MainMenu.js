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
		items : [{
			xtype : 'container',
			layout:{
				type:'hbox',
				pack:'center'
			},
			items:[
			{
				xtype:'button',
				text:'GET<br>COINS'
			},{
				xtype:'button',
				text:'BETS'
			},{
				xtype:'button',
				text:'FREE<br>STUFF'
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
				action: "playBtnMainMenu",
				text:'PLAY'
			}]
		},{
			xtype:'container',
			layout:{
				type:'hbox',
				pack:'center'
			},
			items:[
			{
				xtype:'button',
				text:'INVITE<br>FRIENDS'
			},{
				xtype:'button',
				text:'ACCOUNT<br>SETTINGS'
			}]
		},{
			xtype : 'container',
			layout:{
				type:'hbox',
				pack:'center'
			},
			items:[
			{
				xtype:'button',
				text:'MY<br>PROFILE'
			},{
				xtype:'button',
				text:'LEADER<br>BOARDS'
			},{
				xtype:'button',
				text:'I NEED<br>TICKETS'
			}]
		}]
	}

}); 