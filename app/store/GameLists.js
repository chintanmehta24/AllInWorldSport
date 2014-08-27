Ext.define('AllInOneWorldSport.store.GameLists', {
    extend: 'Ext.data.Store',
	config:{
		model: "AllInOneWorldSport.model.GameList",
		autoLoad: false,
		 grouper: {
            groupFn: function(record) {
                return Ext.Date.format(record.get('StartDate'), "l, F d, Y");
            },
            sortProperty: "StartDate"
        }
		
	},
	constructor: function(){
		var me = this;
		me.callParent(arguments);
		// me.on("beforeload",me.onBeforeLoad, me);
	}
});