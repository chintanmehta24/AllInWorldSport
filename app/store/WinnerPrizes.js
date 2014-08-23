Ext.define('AllInOneWorldSport.store.WinnerPrizes', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.WinnerPrize",
		autoLoad: false,
		
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		//me.on("beforeload",me.onBeforeLoad, me);
	}
	
});