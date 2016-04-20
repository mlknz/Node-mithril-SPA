(function () {
'use strict';

var m = require('mithril');

var canvasService = require('./../../services/canvasService');
var view = function () {
    return [
        m('h1', 'mlknz home page'),
        m('button', {onclick: function (e) { window.location.hash = ''; }}, 'first scene'),
        m('button', {onclick: function (e) { window.location.hash = 'fun1'; }}, 'second scene'),
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

