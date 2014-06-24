Ext.define('AllInOneWorldSport.model.GameList', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'EventId', type: 'string' },
            { name: 'EventName', type: 'string' },
            { name: 'ChangeStatus', type: 'int' },
            { name: 'CutoffDate', type: 'date', convert: function(value, rec) {
				return rec.dateConvert(value, rec);
            }},
            { name: 'Description', type: 'string' },
            { name: 'EffectiveDate', type: 'date', convert: function(value, rec) {
				return rec.dateConvert(value, rec);
            } },
            { name: 'EndDate', type: 'date', convert: function(value, rec) {
				return rec.dateConvert(value, rec);
            } },
            { name: 'EventGroupAssocs', type:"auto"},
            { name: 'EventParticipants', type: 'auto' },
            { name: 'Id', type: 'string' },
            { name: 'IsOvertime', type: "boolean"},
            { name: 'Location', type: 'string' },
            { name: 'ModifiedById', type: 'string' },
            { name: 'ModifiedDate', type: 'date', convert: function(value, rec) {
				return rec.dateConvert(value, rec);
            } },
            { name: 'SportType', type: 'string' },
            { name: 'StartDate', type: 'date', convert: function(value, rec) {
				return rec.dateConvert(value, rec);
            } },
            { name: 'Status', type: 'string' },
            { name: 'URL', type: 'string' },
            { name: 'UniqueID', type: 'string' }
        ],
        proxy: {
        	type: "awsajax",
        	url: AllInOneWorldSport.Global.SERVER_URL + "/ListEvents",
        }
    },
    dateConvert:function(value, rec){
    	// value = String(value);
    	// value = value.replace(/\D+/g,"");
    	// value = parseInt(value);
    	return Ext.Date.parseFunctions.MS(value, true);
    }
});
