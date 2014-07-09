Ext.define('AllInOneWorldSport.store.LeaderBoardTopFivePlayers', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.LeaderBoardTopFivePlayers",
		autoLoad: false
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		// me.on("beforeload",me.onBeforeLoad, me);
	}
});