Ext.define("AllInOneWorldSport.view.WinnerCircle", {
	extend : "Ext.dataview.DataView",
	xtype : "winnercircle",
	config : {
		items: [{
			xtype: "navbar",
			docked: "top"
		}],
		cls: "winner-circle-cls",
		itemCls: "winner-item-cls",
		itemTpl: new Ext.XTemplate(["<div class='date'>{Date:this.getFormatDate}</div>",
					 "<div class='thumb' style='background-image:url(\"{Url}\")'></div>",
					 "<div class='prizeName'>{Name}</div>",
					 "<div class='winnerName'>{WinnerName}</div>"].join(""),{
				 	getFormatDate: function(date){
				 		return Ext.Date.format(date, "d/m/Y");
				 	}
				 }),
		 store: {
		 	fields: [{
		 		name: "Date",
		 		type: "date",
		 		dateFormat: "d/m/Y"
	 		}, "Url", "Name", "WinnerName"],
		 	data: [{
		 		Date : '30/06/2014',
		 		Url : 'resources/images/t-shirt.png',
		 		Name: 'bears jay cutler jersey',
		 		WinnerName: 'Player'
		 	},{
		 		Date : '30/06/2014',
		 		Url : 'resources/images/t-shirt.png',
		 		Name: 'bears jay cutler jersey',
		 		WinnerName: 'Player'
		 	},{
		 		Date : '30/06/2014',
		 		Url : 'resources/images/t-shirt.png',
		 		Name: 'bears jay cutler jersey',
		 		WinnerName: 'Player'
		 	},{
		 		Date : '30/06/2014',
		 		Url : 'resources/images/t-shirt.png',
		 		Name: 'bears jay cutler jersey',
		 		WinnerName: 'Player'
		 	},{
		 		Date : '30/06/2014',
		 		Url : 'resources/images/t-shirt.png',
		 		Name: 'bears jay cutler jersey',
		 		WinnerName: 'Player'
		 	},{
		 		Date : '30/06/2014',
		 		Url : 'resources/images/t-shirt.png',
		 		Name: 'bears jay cutler jersey',
		 		WinnerName: 'Player'
		 	}]
		 }
	}
});