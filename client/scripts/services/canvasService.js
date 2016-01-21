/**
 * Created by mlkn on 28.09.2015.
 */

(function () {
    var Config = require('./../config');
    var HomeScene = require('./scenes/wildGrowthScene');
    var Controls = require('./controlsService');
    'use strict';

    var initRenderer = function(element, isInitialized) {
        if (isInitialized) return;

        Config.canvasWidth = window.innerWidth;
        Config.canvasHeight = window.innerHeight*0.8;
        Config.aspectRatio = Config.canvasWidth / Config.canvasHeight;

        Config.renderer = new THREE.WebGLRenderer({antialias: true, canvas: element});
        Config.renderer.setClearColor(0x111111, 1.0);
        Config.renderer.clear();

        Config.camera = new THREE.PerspectiveCamera(60, Config.aspectRatio, 1, 1000);
        var controls = new Controls();

        controls.resize();
    };

    var canvasService = function (element, isInitialized) {

        initRenderer(element, isInitialized);

        var homeScene = HomeScene();
        var orbitControls = new THREE.OrbitControls(Config.camera, Config.renderer.domElement);

        function animate() {
            requestAnimationFrame(animate);
            Config.time = (new Date()).getTime();
            homeScene.update();
            orbitControls.update();
            Config.renderer.render(homeScene.scene, Config.camera);
        }
        animate();

    };

    module.exports = canvasService;

}());
