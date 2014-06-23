Ext.define('AllInOneWorldSport.model.ListParticipants', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'Abbreviation', type: 'string' },
            { name: 'ConferenceName', type: 'string' },
            { name: 'ImageURL', type: 'string' },
            { name: 'LeagueName', type: 'string' },
            { name: 'Name', type:"string"},
            { name: 'ParticipantId', type: 'auto' },
            { name: 'ShortName', type: 'string' },
            { name: 'SportType', type: "string"},
            { name: 'Status', type: 'auto' },
            { name: 'TypeCode', type: 'string' },
            { name: 'URL', type: 'string' },
            
        ],
        
    },
    
});
