(function () {
'use strict';

var m = require('mithril');
var controlPanelService = require('./services/controlPanelService');

function controller() {

}

function view() {
    return [

        m('h1', 'Music'),

        m('div.controlPanel', [

            m('div.corner', { config: controlPanelService.corner }),
            m('div.sceneSelector', { config: controlPanelService.sceneSelector }),
            m('div.hidePanelButton', { config: controlPanelService.hidePanelButton }),
            m('div.textButton', { config: controlPanelService.textButton }),
            m('div.eyeFoodButton', { config: controlPanelService.eyeFoodButton }),
            m('div.earFoodButton', { config: controlPanelService.earFoodButton })

        ])

    ];
}

module.exports = {
    controller: controller,
    view: view
};

} ());
