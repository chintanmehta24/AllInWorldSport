Ext.define("AllInOneWorldSport.view.AboutGame",{
	extend: "Ext.Panel",
	xtype: "aboutgame",
	config: {
		layout: {
			type: "vbox",
			pack: "center",
			align: "center"
		},
		items: [{
			xtype :"label",
			html: "ARIZONA STATE UNIVERSITY",
			cls: "team-name-cls"
		},{
			xtype: "label",
			html :"VS.",
			cls: "vs-text-cls"
		},{
			xtype :"label",
			html: "UNIVERSITY OF ARIZONA",
			cls: "team-name-cls"
		},{
			xtype: "label",
			cls: "place-detail-cls",
			html : 	"<div>" +
						"<div>Tempe, Arizona Sun Devil Stadium</div>"+
						"<div>"+ Ext.Date.format(new Date(), "l F d, Y") +"</div>"+
						"<div>Tempe, Arizona Sun Devil Stadium</div>"+
					"</div>"
		}]
	}
});