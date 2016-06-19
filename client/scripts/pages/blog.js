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
                m( 'div.controlPanel', { config: controlPanelService } ),
                m( 'blogPage', { config: blogPageService } )
            ])
        ];
    }

    module.exports = {
        controller: controller,
        view: view
    };

} ());
