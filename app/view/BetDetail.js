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
			cls: "canecl-btn-cls",
			action: "cancelBet"
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
				text: "1",
				value: "1"
			},{
				text: "2",
				value: "2"
			},
			{
				text: "3",
				value: "3"
			},
			{
				text: "4",
				value: "4"
			},
			{
				text: "5",
				value: "5"
			}]
		}, {
			xtype :"label",
			cls: "field-label-cls",
			html: "HOW MUCH DO YOU WANT TO BET?"
		},{
			xtype :"textfield",
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
				text: "ENEMIES"
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