Ext.define("AllInOneWorldSport.view.WinnerCircle", {
	extend : "Ext.dataview.DataView",
	xtype : "winnercircle",
	config : {
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "label",
			scrollDock: "top",
			cls: "title-cls",
			html :"Winner Circle"
		}],
		cls: "winner-circle-cls",
		itemCls: "winner-item-cls",
		itemTpl: new Ext.XTemplate(["<div class='date'>{SelectionDate:this.getFormatDate}</div>",
					 "<div class='thumb' style='background-image:url(\"{ImageURL}\")'></div>",
					 //"<div class='prizeName'>{Name}</div>",
					 "<div class='winnerName'>{FullName}</div>",
					 "<div class='winnerName'>Player</div>"].join(""),{
				 	getFormatDate: function(date){
				 		return Ext.Date.format(date, "d/m/Y");
				 	}
				 }),
		 store: "WinnerPrizes",
		 listeners: {
		 	painted: "onPainted"
		 }
	},
	onPainted: function(){
		var me = this;
		me.getStore().load();
	}
});