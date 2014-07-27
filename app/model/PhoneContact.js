Ext.define('AllInOneWorldSport.model.PhoneContact', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'id', type: 'auto' },
            { name: 'rawId', type: 'auto' },
            { name: 'displayName', type: 'auto' },
            { name: 'name', type: 'auto' },
            { name: 'phoneNumbers', type: 'auto' },
            { name: 'emails', type: 'auto' }

        ],
        proxy: {
        	type: "memory"
        }
    }
});
