Ext.define("AllInOneWorldSport.view.AccountSetting", {
	extend : "Ext.Panel",
	xtype : "accountsetting",
	config : {
		cls : "account-setting-cls",
		items: [
			{
				xtype: "navbar",
				docked: "top"
			},
			{
				xtype : "container",
				layout: {
					type: "hbox",
					align: "start"
				},
				padding: "0.5em 0.5em 0",
				items: [{
					xtype: "button",
					text: "Change Photo",
					ui: "plain",
					cls: "profile-photobtn-cls",
					iconAlign: "top",
					icon: "resources/images/person.png"
				}, {
					xtype: "togglefield",
					cls: "sound-toggle-cls",
					label: "Sound",
					labelAlign: "top"
				}, {
					xtype: "sliderfield",
					cls: "volume-slider-cls",
					itemId: "volumnSlider",
					labelAlign: "top",
					label: "Volume",
					minValue: 0,
					maxValue: 100,
					flex: 1
				}]
			},
			{
				xtype : "container",
				layout: {
					type: "vbox",
					pack: "center"
				},
				items : [
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype : "button",
								text : "CONNECT TO<br>FACEBOOK",
								cls: "action-btn-cls",
								flex: 1,
							},
							{
								xtype : "button",
								text : "CONNECT TO<br>TWITTER",
								cls: "action-btn-cls",
								flex: 1,
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype : "button",
								text : "ADD FRIENDS FROM<br>CONTACT LIST",
								cls: "action-btn-cls",
								flex: 1,
							},
							{
								xtype : "button",
								text : "MANAGE<br>FRIENDS",
								cls: "action-btn-cls",
								flex: 1,
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype:"container",
								style : "margin: 0 0 0.75em 0.75em;",
								flex : 1,
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE SAYING"
									},
									{
										xtype:'textfield'
									}
								]
							},
							{
								xtype:"container",
								flex : 1,
								style : "margin: 0 0.75em 0 0.75em;",
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE PROFILE NAME"
									},
									{
										xtype:'textfield'
									}
								]
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype:"container",
								style : "margin: 0 0 0.75em 0.75em;",
								flex : 1,
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE TEAM I FOLLOW"
									},
									{
										xtype :"selectfield",
										cls : "selectfield-cls",
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
									},
								]
							},
							{
								xtype:"container",
								flex : 1,
								style : "margin: 0.83em 0.75em 0 0.75em;",
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: " "
									},
									{
										xtype :"selectfield",
										cls : "selectfield-cls",
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
									}
								]
							}
						]
					},
					{
						xtype : "container",
						layout: {
							type: "hbox",
							pack: "center"
						},
						items : [
							{
								xtype:"container",
								style : "margin: 0 0 0.75em 0.75em;",
								flex : 1,
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CHANGE PASSWORD"
									},
									{
										xtype:'passwordfield'
									}
								]
							},
							{
								xtype:"container",
								flex : 1,
								style : "margin: 0 0.75em 0 0.75em;",
								layout: {
									type: "vbox"
								},
								items:[
									{
										xtype :"label",
										cls: "field-label-cls",
										html: "CONFIRM PASSWORD"
									},
									{
										xtype:'passwordfield'
									}
								]
							}
						]
					}
				]
			}
		],
		listeners: [{
			delegate: "#volumnSlider",
			event: "change",
			fn: "onVolumnChange"
		},{
			delegate: "#volumnSlider",
			event: "drag",
			fn: "onVolumnChange"
		}]
	},
	
	onVolumnChange: function(sliderField, slider){
		var maxValue = sliderField.getMaxValue(),
			minValue = sliderField.getMinValue(),
			newValue = sliderField.getValue(),
			gap = Math.abs(maxValue - minValue),
			percentage = (newValue - minValue) * gap / 100,
			sliderId = slider.getId(),
			sliderBaseCls = slider.getBaseCls(),
			linkId = sliderBaseCls + sliderId,
			linkDom = Ext.get(linkId);
		if(!linkDom){
			var linkDom = document.createElement("style");
			linkDom.id = linkId;
			linkDom.type = "text/css";
			Ext.documentHeadElement.appendChild(linkDom);
			linkDom = Ext.get(linkId);
		}
		linkDom.setHtml("#" + sliderId + "." + sliderBaseCls + ":before{" +
					"background-image: -webkit-linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 
					"background-image: -moz-linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 
					"background-image: -o-linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 
					"background-image: linear-gradient(left, #00deff "+ percentage +"%, transparent "+ percentage +"%);" + 							
							"}");
	}
	
});