Ext.define('AllInOneWorldSport.model.Friend', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'Balance', type: 'auto' },
            { name: 'BetEntries', type: 'auto' },
            { name: 'Bets', type: 'auto' },
			{ name: 'Profile', type: 'auto' },
            { name: 'EmailAddress', type: 'string' },
            { name: 'FacebookUId', type: 'number' },
            { name: 'FirstName', type: 'string' },
            { name: 'FullName', type: 'string' },
            { name: 'IsOnline', type: 'boolean' },
            { name: 'LastName', type: 'string' },
            { name: 'MemberId', type: 'string' },
            { name: 'Notes', type: 'string' },
            { name: 'PhotoUrl', type: 'string' },
            { name: 'PrimaryPhone', type: 'stirng' },
            { name: 'ProfileStatus', type: 'string' },
            { name: 'Teams', type: 'auto' }

        ],
        proxy: {
        	type: "awsajax",
        	url: AllInOneWorldSport.Global.SERVER_URL + "/ListRootLevel",
        }
    }
});
