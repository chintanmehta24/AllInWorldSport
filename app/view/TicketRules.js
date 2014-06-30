Ext.define("AllInOneWorldSport.view.TicketRules", {
	extend : "Ext.Container",
	xtype : "ticketrules",
	config : {
		layout: "vbox",
		cls: "buytickets-cls",
		items:[{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "fieldset",
			title: "TICKET RULES",
			defaults: {
				xtype: "button",
				cls: "ticket-btn-cls",
				icon:  "resources/icons/right-sign.png",
			},
			items: [{
				text: "1 TICKETS FOR SIGNING IN(ONE TIME A DAY)",
			},{
				text: "2 TICKETS FOR REFERRING A FRIEND",
			},{
				text: "25 TICKETS WHEN A REFERRAL JOINS",
			},{
				text: "5 TICKETS FOR EVERY BET CREATED OR ACCEPTED",
			}]
		}]
	}
});