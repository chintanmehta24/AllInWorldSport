Ext.define('AllInOneWorldSport.model.GameList', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'EventId', type: 'string' },
            { name: 'EventName', type: 'string' },
            { name: 'ChangeStatus', type: 'int' },
            { name: 'CutoffDate', type: 'date' },
            { name: 'Description', type: 'string' },
            { name: 'EffectiveDate', type: 'date' },
            { name: 'EndDate', type: 'date' },
            { name: 'EventGroupAssocs', type:"auto"},
            { name: 'EventParticipants', type: 'auto' },
            { name: 'Id', type: 'string' },
            { name: 'IsOvertime', type: "boolean"},
            { name: 'Location', type: 'string' },
            { name: 'ModifiedById', type: 'string' },
            { name: 'ModifiedDate', type: 'date' },
            { name: 'SportType', type: 'string' },
            { name: 'StartDate', type: 'date' },
            { name: 'Status', type: 'string' },
            { name: 'URL', type: 'string' },
            { name: 'UniqueID', type: 'string' }
        ],
        proxy: {
        	type: "awsajax",
        	url: AllInOneWorldSport.Global.SERVER_URL + "/ListEvents",
        }
    }
});
