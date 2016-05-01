(function () {
'use strict';

var m = require('mithril');
var canvasService = require('./../services/canvasService');
var controlPanelService = require('./../services/controlPanelService');

var view = function () {
    return [

        m('canvas', { config: canvasService }),

        m('div.controlPanel', [

            m('div.corner', { config: controlPanelService.corner }),
            m('div.sceneSelector', { config: controlPanelService.sceneSelector }),
            m('div.hidePanelButton', { config: controlPanelService.hidePanelButton }),
            m('div.textButton', { config: controlPanelService.textButton }),
            m('div.earFoodButton', { config: controlPanelService.earFoodButton }),
            m('div.eyeFoodButton', { config: controlPanelService.eyeFoodButton })

        ])
        // m('div.text', 'Here is some text!')

    ];
};

module.exports = view;

} ());

