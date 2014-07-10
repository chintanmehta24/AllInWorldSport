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
				cls: "drawing-title-cls",
				html : ["<div class='title-cls'>Next drawing</div>",
						"<div class='date-cls'>",
						Ext.Date.format(new Date(), "F d, Y<br>g:m:A T"),
						"</div>"].join("")
			}, {
				xtype: "button",
				text: "Invite Friends",
				cls: "invite-btn-cls",
				ui: 'round'
			}]
		},
		{
			xtype: 'panel',
			flex: 1,
			cls:"main-content-cls",
			layout: "card",
			items: [{
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
				ui: "plain"
			}, {
				xtype: "button",
				right: 0,
				top :"50%",
				iconCls: "arrow_right",
				iconMask: true,
				ui: "plain"
			}, {
				xtype: "label",
				docked: "top",
				cls: "content-title-cls",
				html: "bears jay cutler jersey"
			},{
				xtype: "image",
				src : "resources/images/t-shirt.png"
			}]
		},{
			xtype: "label",
			cls: "bottom-description-cls",
			html: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
		}]
	}
});