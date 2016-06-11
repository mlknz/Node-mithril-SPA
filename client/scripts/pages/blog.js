(function () {
    'use strict';

    var m = require('mithril');
    var controlPanelService = require('./services/controlPanelService');
    var blogPageService = require('./services/blogPageService');

    function controller() {
        m.redraw.strategy("diff");
    }

    function view() {
        return [

            m('div.outerDiv', [
                m('div.controlPanel', [

                    m('div.corner', { config: controlPanelService.corner }),
                    m('div.sceneSelector', { config: controlPanelService.sceneSelector }),
                    m('div.hidePanelButton', { config: controlPanelService.hidePanelButton }),
                    m('div.textButton', { config: controlPanelService.textButton }),
                    m('div.picturesButton', { config: controlPanelService.picturesButton }),
                    m('div.videoButton', { config: controlPanelService.videoButton }),
                    m('div.musicButton', { config: controlPanelService.musicButton })

                ]),
                m('blogPage', { config: blogPageService })
            ])

        ];
    }

    module.exports = {
        controller: controller,
        view: view
    };

} ());
