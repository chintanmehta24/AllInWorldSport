Ext.define('AllInOneWorldSport.view.InAppDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'inappdetail', 
    config: {
    	cls: "profile-cls",
    	items: [{
			xtype: "navbar",
			docked: "top"
		},{
    		xtype: "fieldset",
    		title: "Inapp Detail",
    		defaults: {
    			labelAlign: "left",
    			labelWidth: "5em",
    			xtype: "textfield"
    		},
    		items: [{
						name: "FirstName",
						label: "First Name",
					}, {
						name: "LastName",
						label: "Last Name",
					},
					{
						name: "Address",
						label: "Address",
					},
					{
						name: "City",
						label: "City",
					},
					{
						name: "State",
						label: "State",
					},
					{
						name: "PostalCode",
						label: "PostalCode",
					},
					
					{
						name: "Country",
						label: "Country",
					},]
    	},
		{
    		xtype: "button",
    		text: "Save Detail",
    		cls: "profile-save-btn",
			action: "saveDetail",
    	}],
    	listeners: {
			painted: function (element, options) {
				var me = this,
					current_user = Ext.decode(localStorage.getItem("CURRENT_LOGIN_USER"));
				if(current_user){
					
				}
			}
		}
    }
});