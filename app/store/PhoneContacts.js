Ext.define('AllInOneWorldSport.store.PhoneContacts', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.MyBets",
		autoLoad: false
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		//me.on("beforeload",me.onBeforeLoad, me);
	}
	
});