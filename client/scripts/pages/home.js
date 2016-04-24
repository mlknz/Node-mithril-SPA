(function () {
'use strict';

var view = require('./views/homeView');
var Config = require( './../config' );
var newTime;

function controller() {

    function animate() {

        requestAnimationFrame( animate );
        newTime = (new Date()).getTime();

        view.canvasUpdate();
        view.controlPanelUpdate(newTime - Config.time);

        Config.time = newTime;

    }

    animate()

}

module.exports = {
    controller: controller,
    view: view
};
} ());
