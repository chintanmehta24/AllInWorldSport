Ext.define("AllInOneWorldSport.view.BetDetail",{
	extend: "Ext.form.Panel",
	xtype: "betdetail",
	config:{
		padding: "0.5em 0.75em",
		gameEventRecord: null,
		cls: "bet-detail-cls",
		items:[{
			xtype: "button",
			text: "CANCEL BET",
			ui: "plain",
			iconAlign: "left",
			icon: "resources/images/cancel-bet.png",
			cls: "canecl-btn-cls"
		},{
			xtype: "label",
			cls: "field-label-cls",
			itemId: "teamToBet"
		}, {
			xtype :"selectfield",
			autoSelect: false,
			usePicker: false,
			defaultTabletPickerConfig: {
				height: 120
			},
			options: [{
				text: "To Win",
				value: "to_win"
			},{
				text: "No Point Spread",
				value: "no_point"
			}]
		}, {
			xtype :"label",
			cls: "field-label-cls",
			html: "HOW MUCH DO YOU WANT TO BET?"
		},{
			xtype :"selectfield",
			autoSelect: false,
			usePicker: false,
			labelAlign: "top",
			defaultTabletPickerConfig: {
				height: 320
			},
			options: [{
				text: "$100",
				value: 100
			},{
				text: "$200",
				value: 200
			},{
				text: "$300",
				value: 300
			},{
				text: "$400",
				value: 400
			},{
				text: "$500",
				value: 500
			}]
		}, {
			xtype :"label",
			cls: "field-label-cls",
			html: "WHO DO YOU WANT TO BET?"
		}, {
			xtype: "container",
			layout: "hbox",
			cls: "btn-container-cls",
			defaults: {
				xtype: "button",
				cls :"bet-action-cls"
			},
			items: [{
				text: "FRIENDS"
			},{
				text: "ENIMIES"
			},{
				text: "CELEBRITIES"
			},{
				text: "ALL IN"
			}]
		}, {
			xtype: "button",
			text: "BET",
			action: "finalizeBet",
			cls: "bet-btn-cls"
		}]
	}
});