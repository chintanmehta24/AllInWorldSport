Ext.define('AllInOneWorldSport.store.ListParticipants', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.ListParticipant",
		autoLoad: false,
		League:"",
		GroupType: ""
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		me.on("beforeload",me.onBeforeLoad, me);
	},
	
	onBeforeLoad: function(store, operation){
		operation.setConfig({
			jsonData:{
				League: store.getLeague(),
				GroupType: store.getGroupType()
			}
		});
	}
});