(function () {
'use strict';

var m = require('mithril');

var canvasService = require('./../services/canvasService');
var view = function () {
    return [
        m('h1', 'mlknBay'),
        m('canvas', {config: canvasService})
        /*m('div.body', [
            m('div.text', 'text'),
            m('a', {
                href: '/second-page'
            }, 'second page')
        ])*/

    ];
};

module.exports = view;

} ());

