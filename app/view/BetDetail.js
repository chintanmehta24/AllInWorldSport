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
			/*options: [{
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
			}]*/
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
					xtype :"spinnerfield",
					name: "Amount",
					id:"amountID",
					groupButtons: false,
					minValue: 50,
					maxValue: 100000,
					stepValue:50,
					value: 50
				}, 
				{
					xtype : "button",
					cls :"bet-action-cls",
					text: "ALL IN",
					action: "BetAllCoins"
					
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
				text: "ALL",
				action : "setAllIN" //Avinash
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
		}, {
			delegate : "button[action=setAllIN]",
			event: "tap",
			fn: "setAllIN"
		}]
	},
	onPageActivate: function(){
		var me = this;
		// me.reset();
		
		var options = [];
		for(var i = 1 ; i<=40;i++){
			options.push(
			{
				value:i.toString(),
				text:i.toString()
			});
		}
		me.down("[name=Spread]").setOptions(options);
		
		me.setValues({
			Spread: 1,
			Amount: "50"
		});
		getButtonClicked="";
		participantID = [];
	},
	
	onRadioFieldChange: function(field, newValue){
		var me = this;
		me.down("[name=Spread]").setHidden(newValue);
	},
	
	showFriends: function(){
		getButtonClicked = "Friends"; // Avinash
		var store = Ext.getStore("Friends");
		store.removeAll();
		
		var list = Ext.Viewport.add({
			xtype: "managefriendlist",
			mode: "MULTI",
			hideToolbar: true,
			listType: "Friends",
//			id : "listViewManageFriends"
		}).show();
		store = list.getStore();
		store.clearFilter(true);
	},
	
	showEnemies: function(){
		getButtonClicked = "Enemies"; // Avinash
		var store = Ext.getStore("Friends");
		store.removeAll();
		
		var me = this,
			gameRecord = me.getGameEventRecord(),
			event = gameRecord.getData(),
			values = me.getValues(),
			selectedParticipantId = values.EventParticipantId,
			typeCode = null,
			EnemyParticipantId = null;
        for (var i = 0; i < event.EventParticipants.length; i++) {
            if (event.EventParticipants[i].ParticipantId != selectedParticipantId ) {
                EnemyParticipantId = event.EventParticipants[i].ParticipantId;
                // break;
            }else{
                typeCode = event.EventParticipants[1].RoleCode;
            }
        }
		var list = Ext.Viewport.add({
				xtype: "managefriendlist",
				mode: "MULTI",
				hideToolbar: true,
				listType: "Enemies",
//				id : "listViewManageFriends" //Avinash
			}).show(),
			store = list.getStore();
		store.clearFilter(true);
		store.filter(function(rec){
			var data = rec.getData();
			for(i =0; i<data.Teams.length; i++){
				
				if(data.Team[i].TypeCode == typeCode && data.Team[i].Status == "Favorite" && data.Team[i].ParticipantId == EnemyParticipantId){
					return true;
					
				}
			}
			return false;
		});
	},
	//Avinash
	setAllIN: function(){
		getButtonClicked = "ALLIN";
	},
});