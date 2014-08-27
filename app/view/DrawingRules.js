Ext.define("AllInOneWorldSport.view.DrawingRules", {
	extend : "Ext.Container",
	xtype : "drawingrules",
	config : {
		hideOnMaskTap: true,
		modal: true,
		centered: true,
		width: "90%",
		height: "80%",
		layout: "vbox",
		cls: "drawingrules-cls",
		itemId : "drawingRules",
		scrollable: true,
		items:[{
			xtype: "button",
			style : "background-image: url('resources/images/cancel-bet.png');background-repeat: no-repeat;background-position: center;position: absolute;display: block;background-color:transparent;border: 0;right:0;margin-top: -0.8em;",
			docked: "top",
			action : "closeDrawingRules"
		},{
			xtype: "fieldset",
			title: "DRAWING/SWEEPSTAKES RULES",
			
			defaults: {
				xtype: "button",
				cls: "ticket-btn-cls",
				icon:  "resources/icons/right-sign.png",
			},
			items: [{
				text: "No purchase necessary to win",
			},{
				text: 'To receive prize, must provide valid address in response to "win" notification',
			},{
				text: "If prize is not claimed within 72 hours of notification, prize is forfeited",
			},{
				text: "ALL IN World Sports, LLC is not responsible for any lost, damaged or stolen prizes",
			},{
				text: "ALL IN World Sports, Apple is not a sponsor nor is involved in any way",
			},{
				text: "ALL IN World Sports, the contest or sweepstake prizes are not Apple products",
			}]
		}]
	}
});