Ext.define('AllInOneWorldSport.store.Friends', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.Friend",
		autoLoad: false
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		me.on("beforeload",me.onBeforeLoad, me);
	},
	
	onBeforeLoad: function(store, operation){
		operation.setConfig({
			jsonData:{
				MemberId: Ext.decode(localStorage.CURRENT_LOGIN_USER).MemberId
			}
		});
		
	}
});