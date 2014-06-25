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
			xtype: "textfield",
			hidden: true,
			name: "EventParticipantId"
		}, {
			xtype :"selectfield",
			autoSelect: false,
			usePicker: false,
			defaultTabletPickerConfig: {
				height: 320
			},
			name: "Spread",
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
		},
		{
			xtype: "container",
			layout: "hbox",
			items:[
				{
					xtype: "button",
					text : "-",
					listeners : {
						element : 'element',
						taphold : function() {
							timeMinusInterval = setInterval(function(){
								console.log(11)
								var amtTxt = Ext.getCmp('amountID');
								var value = parseInt(amtTxt.getValue());
								var newVal = value - 50;
								if(value > 50)
									amtTxt.setValue(newVal);
							},200);
							
						},
						touchend: function() {
       
						   
							clearInterval(timeMinusInterval)
							
							
											  
						},
					}
				},
				{
					xtype :"textfield",
					name: "Amount",
					id:"amountID",
					disabled: true,
					readOnly: true,
				}, 
				{
					xtype: "button",
					text : "+",
					listeners : {
						element : 'element',
						taphold : function() {
							timePlusInterval = setInterval(function(){
								console.log(11)
								var amtTxt = Ext.getCmp('amountID');
								var value = parseInt(amtTxt.getValue());
								var newVal = value + 50;
								if(value < 2000)
									amtTxt.setValue(newVal);
							},200);
							
						},
						touchend: function() {
       
						   
							clearInterval(timePlusInterval)
							
							
											  
						},
					}
				},
			]
		},
		
		{
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
		}],
		listeners:[{
			event: "activate",
			fn: "onPageActivate"
		}]
	},
	onPageActivate: function(){
		var me = this;
		// me.reset();
		me.setValues({
			Spread: null,
			Amount: "50"
		});
	}
});