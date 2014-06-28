Ext.define('AllInOneWorldSport.controller.Profile', {
    extend: 'Ext.app.Controller',
	config: {
		control: {
			"profile button[action=showMyfriends]": {
				tap: "showMyFriends"
			}
		}
	},
	
	showMyFriends: function(btn){
		Ext.Viewport.add({
			xtype: "managefriendlist"
		}).show();
	}
});
