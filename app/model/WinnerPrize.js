Ext.define('AllInOneWorldSport.model.WinnerPrize', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'ChangeStatus', type: 'int' },
            { name: 'Id', type: 'auto' },
            { name: 'UniqueID', type: 'string' },
            { name: 'ExternalPrizeDistributions', type: 'auto' },
            { name: 'FulfillmentStatus', type: 'string' },
            { name: 'FullName', type: 'string' },
            { name: 'MemberId', type: 'string' },
            { name: 'Name', type: 'string' },
            { name: 'Place', type: 'int' },
            { name: 'PrizeLevelId', type: 'string' },
            { name: 'PrizeResultId', type: 'string' },
            { name: 'SelectionDate', type: 'date', convert: function(value, rec) {
				return Ext.Date.parseFunctions.MS(value, true);
            }},
            { name: 'SelectionStatus', type: 'string' },
            { name: 'SweepstakesEntryId', type: 'string' },
			{ name : 'ImageURL' , type : 'string'}

        ],
        proxy: {
        	type: "awsajax",
        	url: AllInOneWorldSport.Global.SERVER_URL + "/ListPrizeResults",
        }
    }
});
