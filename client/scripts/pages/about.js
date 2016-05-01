(function () {
'use strict';

var m = require('mithril');
var store = require('../../../store');
var controlPanelService = require('./services/controlPanelService');

function controller(params, done) {
    var scope = {};
    m.redraw.strategy("diff");
    /*store.load('dog', 123).then(function(dog) {
        scope.myDog = dog;
        done && done(null, scope);
    });*/
    // m.redraw.strategy("all");
    return scope;
}

function view(scope) {
    return [
        // m.trust('<!-- Server side rendering \\o/ -->'),
        m('h1', 'About'),
        m('p', 'Nothing here yet.'),
        m('a', {
            href: '/',
            config: m.route
        }, 'back to main page'),
        m('div.controlPanel', [

            m('div.corner', { config: controlPanelService.corner }),
            m('div.sceneSelector', { config: controlPanelService.sceneSelector }),
            m('div.hidePanelButton', { config: controlPanelService.hidePanelButton }),
            m('div.textButton', { config: controlPanelService.textButton }),
            m('div.eyeFoodButton', { config: controlPanelService.eyeFoodButton }),
            m('div.earFoodButton', { config: controlPanelService.earFoodButton })

        ])
        // m('p', scope.myDog && ('My dogs name is ' + scope.myDog.name) || '')
    ];
}

module.exports = {
    controller: controller,
    view: view
};

} ());
