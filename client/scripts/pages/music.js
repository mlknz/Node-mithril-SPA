'use strict';

var m = require('mithril');
var controlPanelService = require('./services/controlPanelService');
var musicPageService = require('./services/musicPageService');

function controller() {
    m.redraw.strategy("diff");
}

function view() {
    return [
        m('div.outer', [
            m('div', {config: controlPanelService}),
            m('music-page', {config: musicPageService})
        ])
    ];
}

module.exports = {
    controller: controller,
    view: view
};

