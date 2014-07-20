Ext.define('AllInOneWorldSport.model.MyBets', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'Bet', type: 'auto' },
            { name: 'Entry', type: 'auto' },
            { name: 'Event', type: 'auto' },
			{ name: 'Profile', type: 'auto' },
            { name: 'MyBet', type: 'boolean' },
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
		
        
    }
});
