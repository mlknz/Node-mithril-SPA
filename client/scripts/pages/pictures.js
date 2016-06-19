'use strict';

var m = require('mithril');
var controlPanelService = require('./services/controlPanelService');
var picturesPageService = require('./services/picturesPageService');

function controller() {
    m.redraw.strategy("diff");
}

function view() {
    return [
        m('div.outer', [
            m('div', {config: controlPanelService}),
            m('pictures-page', {config: picturesPageService})
        ])
    ];
}

module.exports = {
    controller: controller,
    view: view
};
