Ext.define('AllInOneWorldSport.proxy.AWSProxy', {
    extend : 'Ext.data.proxy.Ajax',
    alias : 'proxy.awsajax',
    type : 'ajax',
    config:{
    	noCache: false,
		pageParam: false,
		limitParam: false,
		startParam: false,
        reader: {
            type: 'json'
        },
        actionMethods : {
            create: 'POST',
            read : 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        writer : {
            type : 'json'
        }
    },
    /**
     * @private
     * appends authentication params
     */
    buildRequest : function(operation) {
        var request = this.callParent(arguments),
            globalData = AllInOneWorldSport.Global;
        // For documentation on jsonData see Ext.Ajax.request
        var jsonData = {},
        	config = operation.getInitialConfig();
        if(config && config.jsonData){
            Ext.apply(jsonData, operation.config.jsonData);
        }
        Ext.apply(jsonData,{
            token: globalData.getAccessToken()
        });
        request.setJsonData(jsonData);
        return request;
    }
});