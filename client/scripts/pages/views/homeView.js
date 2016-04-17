(function () {
'use strict';

var m = require('mithril');

var canvasService = require('./../../services/canvasService');
var view = function () {
    return [
        m('h1', 'mlknz home page'),
        m('a', {href: '#'}, 'first scene'),
        m('a', {href: '#fun1'}, 'second scene'),
        m('div.body', [
            m('canvas', {config: canvasService}),
            m('div.text', 'Here is some text!'),
            m('a', {
                href: '/about'
            }, 'about')
        ])
    ];
};

module.exports = view;

} ());

