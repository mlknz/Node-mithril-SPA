'use strict';

var m = require('mithril');
var controlPanelService = require('./services/controlPanelService');
var blogPageService = require('./services/blogPageService');

function controller() {
    m.redraw.strategy("diff");
}

function view() {
    return [
        m('div.outer', [
            m('div', {config: controlPanelService}),
            m('blog-page', {config: blogPageService})
        ])
    ];
}

module.exports = {
    controller: controller,
    view: view
};

