'use strict';

var m = require('mithril');
var controlPanelService = require('./services/controlPanelService');
var videosPageService = require('./services/videosPageService');

function controller() {
    m.redraw.strategy("diff");
}

function view() {
    return [
        m('div.outer', [
            m('div', {config: controlPanelService}),
            m('videos-page', {config: videosPageService})
        ])
    ];
}

module.exports = {
    controller: controller,
    view: view
};
