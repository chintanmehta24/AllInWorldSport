Ext.define('AllInOneWorldSport.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {
            "main button[action=toggleNavigationPanel]":{
                tap: "toggleNavigationPanel"
            }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },
    
    toggleNavigationPanel: function(){
        var viewport = Ext.Viewport,
            xPos = viewport.element.getX();
        viewport.translate(xPos ? 0 : 320, 0, {duration:250});
    }
});
