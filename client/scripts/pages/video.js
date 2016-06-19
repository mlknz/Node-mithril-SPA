'use strict';

var m = require('mithril');
var controlPanelService = require('./services/controlPanelService');
var videosPageService = require('./services/videoPageService');

function controller() {
    m.redraw.strategy("diff");
}

function view() {
    return [
        m('div.outerDiv', [
            m('div.controlPanel', {config: controlPanelService}),
            m('videoPage', {config: videosPageService})
        ])
    ];
}

module.exports = {
    controller: controller,
    view: view
};
