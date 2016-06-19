(function () {
    'use strict';

    var m = require('mithril');
    var controlPanelService = require('./services/controlPanelService');
    var picturesPageService = require('./services/picturesPageService');

    function controller() {
        m.redraw.strategy("diff");
    }

    function view() {
        return [
            m('div.outerDiv', [
                m( 'div.controlPanel', { config: controlPanelService } ),
                m( 'picturesPage', { config: picturesPageService } )
            ])
        ];
    }

    module.exports = {
        controller: controller,
        view: view
    };

} ());
