Ext.define('AllInOneWorldSport.store.GameLists', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.GameList",
		autoLoad: false
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		// me.on("beforeload",me.onBeforeLoad, me);
	}
});