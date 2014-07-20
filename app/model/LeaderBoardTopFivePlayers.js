Ext.define('AllInOneWorldSport.model.LeaderBoardTopFivePlayers', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
			{ name: 'Balance', type : 'auto'},
            { name: 'MemberId', type: 'string' },
			{ name: 'FullName',type: 'string'},
            { name: 'NumberOfBets', type: 'string' },
			{ name: 'NumberOfBetsCreated', type: 'int' },
			{ name: 'NumberOfWins', type: 'int' },
			{ name: 'WinLossRatio', type: 'int' },
			{ name: 'CreditBalance', type: 'string' },
			{ name: 'TicketBalance', type: 'int' },
			{ name: 'WinningBalance', type: 'int' },
			
            { name: 'PhotoUrl', type: 'string' },
            { name: 'UniqueID', type: 'string' }
        ],
        proxy: {
        	type: "awsajax",
        	url: AllInOneWorldSport.Global.SERVER_URL + "/ListTopPlayers",
        }
    },
    dateConvert:function(value, rec){
    	// value = String(value);
    	// value = value.replace(/\D+/g,"");
    	// value = parseInt(value);
    	return Ext.Date.parseFunctions.MS(value, true);
    }
});
