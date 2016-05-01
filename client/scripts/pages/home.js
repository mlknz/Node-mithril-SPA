(function () {
'use strict';

    var view = require('./views/homeView');
    var m = require('mithril');

    function controller() {
        m.redraw.strategy("diff");
    }

    module.exports = {
        controller: controller,
        view: view
    };
} ());
