Ext.define('AllInOneWorldSport.model.ListParticipant', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'Abbreviation', type: 'string' },
            { name: 'ConferenceName', type: 'string' },
            { name: 'ImageURL', type: 'string' },
            { name: 'LeagueName', type: 'string' },
            { name: 'Name', type:"string"},
            { name: 'ParticipantId', type: 'auto', convert: function(val, rec){
            	var obj = rec.get("ValueField") || {};
            	obj.ParticipantId = val;
            	rec.set("ValueField", obj);
            	return val;
            } },
            { name: 'ShortName', type: 'string' },
            { name: 'SportType', type: "string"},
            { name: 'Status', type: 'auto' },
            { name: 'TypeCode', type: 'string', convert: function(val, rec){
            	var obj = rec.get("ValueField") || {};
            	obj.TypeCode = val;
            	rec.set("ValueField", obj);
            	return val;
            }  },
            { name: 'URL', type: 'string' },
            { name: 'ValueField', type: 'auto', persist: false}
            
        ],
        proxy: {
        	type: "awsajax",
        	url: AllInOneWorldSport.Global.SERVER_URL + "/ListParticipants",
        }
        
    }
    
});
