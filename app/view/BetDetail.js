Ext.define("AllInOneWorldSport.view.BetDetail",{
	extend: "Ext.form.Panel",
	xtype: "betdetail",
	config:{
		scrollable: {
		    direction: 'vertical',
		    directionLock: true
		},
		padding: "0.5em 0.75em",
		gameEventRecord: null,
		cls: "bet-detail-cls",
		items:[{
			xtype: "navbar",
			docked: "top"
		},{
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
			xtype: "container",
			layout: "hbox",
			margin: "0 0 1em 0",
			defaults: {
				xtype: "radiofield",
				cls: "radio-field-cls",
				name: "BetPoint",
				labelWidth: "auto"
			},
			items:[{
				label: "To Win by",
				value: true,
				checked: true
			}, {
				label: "No Point Spread",
				value: false
			}]
		},{
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
			xtype :"spinnerfield",
			name: "Amount",
			id:"amountID",
			groupButtons: false,
			minValue: 50,
			maxValue: 2000,
			stepValue:50,
			value: 50
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
				text: "FRIENDS",
				action: "showFriendList"
			},{
				text: "ENEMIES",
				action: "showEnemyList"
			},
			/*{
				text: "CELEBRITIES"
			},*/
			{
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
		},{
			delegate: "radiofield[name=BetPoint]",
			event: "change",
			fn: "onRadioFieldChange"
		}, {
			delegate : "button[action=showFriendList]",
			event: "tap",
			fn: "showFriends"
		}, {
			delegate : "button[action=showEnemyList]",
			event: "tap",
			fn: "showEnemies"
		}]
	},
	onPageActivate: function(){
		var me = this;
		// me.reset();
		me.setValues({
			Spread: 1,
			Amount: "50"
		});
	},
	
	onRadioFieldChange: function(field, newValue){
		var me = this;
		me.down("[name=Spread]").setHidden(newValue);
	},
	
	showFriends: function(){
		Ext.Viewport.add({
			xtype: "managefriendlist",
			mode: "MULTI",
			hideToolbar: true,
			listType: "Friends"
		}).show();
	},
	
	showEnemies: function(){
		Ext.Viewport.add({
			xtype: "managefriendlist",
			mode: "MULTI",
			hideToolbar: true,
			listType: "Enemies"
		}).show();
	}
});