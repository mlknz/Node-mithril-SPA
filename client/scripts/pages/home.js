'use strict';

var m = require('mithril');
var canvasService = require('./services/canvasService');
var controlPanelService = require('./services/controlPanelService');

function controller() {
    m.redraw.strategy("diff");
}

function view() {
    return [
        m('div.outer', [
            m('div', {config: controlPanelService}),
            m('div.canvas-container', {config: canvasService})
        ])
    ];
}

module.exports = {
    controller: controller,
    view: view
};

