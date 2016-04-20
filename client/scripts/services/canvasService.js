(function () {
    var Config = require( './../config' );
    var currentScene = {};
    'use strict';

    var getCurrentHash = function() {

        return window.location.hash.substr( 1 );

    };

    var changeScene = function( element, isInitialized ) {

        var hash = getCurrentHash();

        if ( !hash || !Config.scenes[hash] ) hash = Config.defaultScene;

        if ( Config.currentScene !== hash) {

            if ( ! window.scenes[hash] ) {

                Config.currentScene = hash;

                var script = document.createElement( 'script' );
                script.setAttribute( 'type', 'text/javascript' );
                script.setAttribute( 'src', Config.scenes[ hash ] );

                script.onload = function() {

                    if (currentScene && currentScene.dispose) {
                        currentScene.dispose();
                    }

                    currentScene = window.scenes[ hash ]( element, Config.renderer );
                    
                };
 
                document.body.appendChild(script);

            } else {

                Config.currentScene = hash;

                if ( currentScene && currentScene.dispose ) {
                        currentScene.dispose();
                }

                currentScene = window.scenes[ hash ]( element, Config.renderer );
                
            }
        }
    };

    var canvasService = function ( element, isInitialized ) {

        if ( isInitialized ) return;

        window.scenes = {};

        var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: element } );
        renderer.setClearColor( 0x111111, 1.0 );
        renderer.clear();
        renderer.setSize( window.innerWidth, window.innerHeight * 0.8 );
        Config.renderer = renderer;

        changeScene( element );

        window.addEventListener("hashchange", function() { changeScene( element, isInitialized ); }, false);

        function animate() {
            requestAnimationFrame( animate );

             if (currentScene.scene) {
                 currentScene.update();
             }

        }
        animate();

    };

    module.exports = canvasService;

}());
