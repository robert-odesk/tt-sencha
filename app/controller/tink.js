Ext.define('ttapp.controller.Tink', {
    extend: 'Ext.app.Controller',
    requires: [
        'ttapp.view.TimerClock', 'ttapp.config.Config'
    ],
    config: {
        refs: {
            clock : 'timerClock'
        },
        control: {
            'tink': {
                startedthinking: 'onThinking',
                stoppedthinking: 'onStoppedThinking',
                show: 'onShow',
                resetTinkOnActivate: 'onShow'
            },
            'tink panel':{
                choosetrinket: 'onChooseTrinket'
            }
        }
    },
    onChooseTrinket: function(){
        Ext.Viewport.setActiveItem('trinket');
    },
    onThinking : function(){
        this.getClock().start();
        Ext.getDom('tinkcontainer').contentWindow.tt_start_animation();

    },
    onStoppedThinking : function(){

        Ext.getDom('tinkcontainer').contentWindow.tt_stop_animation();
        this.getClock().pause();
        var periodInSeconds = this.getClock().getDuration();
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        this.getApplication().getController('SendTo').showSendTo(periodInSeconds, trinketName);
    },
    onShow: function(){
        this.resetTimerClock();
        this.useActiveTrinket();
    },
    resetTimerClock: function(){
        var tc = Ext.ComponentQuery.query('#tinkTimerClock')[0];
        tc.destroy();
        var tp = Ext.ComponentQuery.query('#tinkPage')[0];
        tp.add({
            itemId: 'tinkTimerClock',
            xtype: 'timerClock'
        });
    },
    useActiveTrinket : function(){
        var trinketArea = Ext.get('swiffydiv');
        var trinketName = Ext.getStore('profilestore').getActiveTrinket();
        var activeTrinketFilePath = Ext.getStore('trinketstore').getFilePath(trinketName);

        var width = ttapp.config.Config.getWidth(),
        height = ttapp.config.Config.getHeight();

        trinketArea.setHtml('<iframe id="tinkcontainer" style="width:' + width +'px;height:' + height + 'px;" src="resources/tinks/swiffy/' + activeTrinketFilePath + '"></iframe>');
    }

});
