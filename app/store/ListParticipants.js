Ext.define('AllInOneWorldSport.store.ListParticipants', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.ListParticipant",
		autoLoad: false
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		// me.on("beforeload",me.onBeforeLoad, me);
	}
});