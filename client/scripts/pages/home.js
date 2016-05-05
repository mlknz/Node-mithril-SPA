(function () {
'use strict';

    var m = require('mithril');
    var canvasService = require('./services/canvasService');
    var controlPanelService = require('./services/controlPanelService');

    function controller() {
        m.redraw.strategy("diff");
    }

    var view = function () {
        return [
            m( 'div.canvasContainer', { config: canvasService } ),

            m('div.controlPanel', [

                m('div.corner', { config: controlPanelService.corner }),
                m('div.sceneSelector', { config: controlPanelService.sceneSelector }),
                m('div.hidePanelButton', { config: controlPanelService.hidePanelButton }),
                m('div.textButton', { config: controlPanelService.textButton }),
                m('div.eyeFoodButton', { config: controlPanelService.eyeFoodButton }),
                m('div.videoButton', { config: controlPanelService.videoButton }),
                m('div.earFoodButton', { config: controlPanelService.earFoodButton })

            ])

        ];
    };

    module.exports = {
        controller: controller,
        view: view
    };
} ());
