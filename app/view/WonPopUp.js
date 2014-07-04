Ext.define("AllInOneWorldSport.view.WonPopUp", {
	extend : "Ext.Panel",
	xtype : "wonpopup",
	config : {
		cls: "won-popup-cls",
		layout: "vbox",
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "image",
			src: "resources/images/angry_refree.png",
			flex: 1
		},{
			xtype: "label",
			cls: "way-to-go-cls",
			html :"way to go"
		},{
			xtype: "label",
			cls: "won-msg-cls",
			html :"you won 1 out of 2 bets!"
		},{
			xtype: "label",
			cls: "earn-coins-cls",
			html :"+3,500 coins"
		},{
			xtype: "button",
			cls: "detail-btn-cls",
			text: "see details"
		},{
			xtype: "button",
			cls: "close-btn-cls",
			ui: "plain",
			text: "close"
		}]
	}
});