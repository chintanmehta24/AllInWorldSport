Ext.define("AllInOneWorldSport.view.NextDrawing", {
	extend : "Ext.Panel",
	xtype : "nextdrawing",
	config : {
		cls: "next-drawing-cls",
		layout: "vbox",
		items: [{
			xtype: "navbar",
			docked: "top"
		},{
			xtype: "container",
			layout: {
				type: "hbox",
				align: "center"
			},
			items: [{
				xtype: "label",
				flex: 1,
				itemId: "drawingTitleId",
				cls: "drawing-title-cls",
				tpl : ["<div class='title-cls'>Next drawing</div>",
						"<div class='date-cls'>{drawingData}",
						// Ext.Date.format(new Date(), "F d, Y<br>g:m:A T"),
						"</div>"].join("")
			}, {
				xtype: "button",
				text: "Invite Friends",
				action: "inviteFriendsThroughFacebook",
				cls: "invite-btn-cls",
				ui: 'round'
			}]
		},
		{
			xtype: "container",
			layout: {
				type: "hbox",
				align: "center"
			},
			items: [
			{xtype : "spacer"},
			{
				xtype: "button",
				text: "Drawings/SweepStakes Rules",
				action: "drawingRules",
				style : "background: transparent;border: 0;font-size: 0.6em;color: white;"
			}
			]
		},
		{
			xtype: 'panel',
			flex: 1,
			cls:"main-content-cls",
			layout: "card",
			itemId: "cardPanelId",
			items: [{
/*
				xtype: "panel",
				layout: "fit",
				items: [{
					xtype: "label",
					cls: "prize-title-cls",
					docked: "top",
					html: "PRIZES"
				}, {
					xtype: "label",
					docked: "top",
					cls: "content-title-cls",
					html: "bears jay cutler jersey"
				},{
					xtype: "image",
					src : "resources/images/t-shirt.png"
				},{
					xtype: "label",
					cls: "bottom-description-cls",
					docked: "bottom",
					html: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				}]
*/
			}, {
				xtype: "label",
				cls: "prize-title-cls",
				docked: "top",
				html: "PRIZES"
			}, {
				xtype: "button",
				left: 0,
				top :"50%",
				iconCls: "arrow_left",
				iconMask: true,
				ui: "plain",
				action: "viewPrevPanel"
			}, {
				xtype: "button",
				right: 0,
				top :"50%",
				iconCls: "arrow_right",
				iconMask: true,
				ui: "plain",
				action: "viewNextPanel"
			}]
		}],
		listeners: [{
			event: "painted",
			fn: "onPainted"
		},{
			delegate: 'button[action=viewPrevPanel"]',
			event: 'tap',
			fn: 'viewPrevPanel'
		},{
			delegate: 'button[action=viewNextPanel"]',
			event: 'tap',
			fn: 'viewNextPanel'
		}]
	},
	onPainted: function(){
		var me = this,
			global = AllInOneWorldSport.Global;
		Ext.Viewport.setMasked({xtype: "loadmask"});
		Ext.Ajax.request({
			url : global.SERVER_URL + "/ListActiveBetSweepstakes",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			jsonData: {
				token: global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data && data.length){
					var data = data[0],
						drawingDate = Ext.DateExtras.parseFunctions.MS(data.DrawingDate);
					me.down("#drawingTitleId").setData({
						drawingData : Ext.Date.format(drawingDate, "F d, Y<br>g:m:A T")
					});
					me.loadListPrize(data.SweepstakesId);
				}
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},
	
	loadListPrize: function(SweepstakesId){
		var me = this,
			global = AllInOneWorldSport.Global,
			cardPanel = me.down("#cardPanelId"),
			panelArray = [];
		Ext.Ajax.request({
			url : global.SERVER_URL + "/ListPrizes",
			method : "POST",
			dataType : 'json',
			headers : {
				'Content-Type' : 'application/json'
			},
			jsonData: {
				SweepstakesId: SweepstakesId,
				token: global.getAccessToken()
			},
			success : function(responce) {
				Ext.Viewport.setMasked(false);
				var data = Ext.decode(responce.responseText);
				console.log(data);
				if(data && data.length){
					Ext.Array.forEach(data, function(item){
						panelArray.push({
							xtype: "panel",
							layout: "fit",
							items: [{
								xtype: "label",
								docked: "top",
								cls: "content-title-cls",
								html: item.Name
								// html: "bears jay cutler jersey"
							},{
								xtype: "image",
								src : item.ImageURL || "resources/images/t-shirt.png"
							},{
								xtype: "label",
								cls: "bottom-description-cls",
								docked: "bottom",
								html: item.Description
								// html: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
							}]
						});
					});
					cardPanel.removeAll();
					cardPanel.add(panelArray);
				}
			},
			failure : function(responce) {
				Ext.Viewport.setMasked(false);
				Ext.Function.defer(function(){
					Ext.Msg.alert('Communication Error');
				},100);
				console.log(responce);
			}
		});
	},
	
	viewNextPanel: function(){
		var me = this,
			cardPanel = me.down("#cardPanelId"),
			activeIndex = cardPanel.indexOf(cardPanel.getActiveItem()),
			item = cardPanel.getAt(++activeIndex);
		if(item && item.isInnerItem())
			cardPanel.animateActiveItem(item, {type: "slide", direction: "left"});
	},
	
	viewPrevPanel: function(){
		var me = this,
			cardPanel = me.down("#cardPanelId"),
			activeIndex = cardPanel.indexOf(cardPanel.getActiveItem()),
			item = cardPanel.getAt(--activeIndex);
		if(item && item.isInnerItem())
			cardPanel.animateActiveItem(item, {type: "slide", direction: "right"});
	}
});