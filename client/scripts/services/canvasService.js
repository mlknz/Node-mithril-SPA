(function () {
    var Config = require('./../config');
    var currentScene = {};
    'use strict';

    var getCurrentHash = function() {
        return window.location.hash.substr(1);
    };

    var changeScene = function( element, isInitialized ) {
        if ( isInitialized ) return;

        if ( !Config.renderer ) {
            var renderer = new THREE.WebGLRenderer({antialias: true, canvas: element});
            renderer.setClearColor(0x111111, 1.0);
            renderer.clear();
            renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
            Config.renderer = renderer;
        }

        var hash = getCurrentHash();

        if ( !hash || !Config.scenes[hash] ) hash = 'default';

        if ( Config.currentSceneFilename !== Config.scenes[hash]) {
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', Config.scenes[hash]);

            script.onload = function() {
                if (currentScene && currentScene.dispose) {
                    currentScene.dispose();
                }
                currentScene = window.initScene(element, Config.renderer);
            };

            Config.currentSceneFilename = Config.scenes[hash];
            document.body.appendChild(script);
        }
    };

    var canvasService = function (element, isInitialized) {

        changeScene(element, isInitialized);

        window.addEventListener("hashchange", function(){ changeScene(element, isInitialized); }, false);

        function animate() {
            requestAnimationFrame(animate);

             if (currentScene.scene) {
                 currentScene.update();
             }

        }
        animate();

    };

    module.exports = canvasService;

}());
