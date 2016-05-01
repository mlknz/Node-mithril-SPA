(function () {
    var Config = require( './../../config' );
    var currentScene = {};
    'use strict';

    var getCurrentHash = function() {

        return window.location.hash.substr( 1 );

    };

    var changeScene = function( element, forceRedraw ) {

        var hash = getCurrentHash();

        if ( !hash || !Config.scenes[hash] ) hash = Config.defaultScene;

        if ( forceRedraw || Config.currentScene !== hash) {

            if ( ! window.scenes[hash] ) {

                Config.currentScene = hash;

                var script = document.createElement( 'script' );
                script.setAttribute( 'type', 'text/javascript' );
                script.setAttribute( 'src', Config.scenes[ hash ] );

                script.onload = function() {

                    if (currentScene && currentScene.dispose) {
                        currentScene.dispose();
                    }
                    if (window.scenes[ hash ]) {
                        currentScene = window.scenes[hash](element, Config.renderer);
                    } else {
                        console.log('couldn\'t load scene');
                    }
                    
                };

                document.body.appendChild(script);

            } else {

                Config.currentScene = hash;

                if ( currentScene && currentScene.dispose ) {
                    currentScene.dispose();
                }
                currentScene = window.scenes[hash](element, Config.renderer);
                
            }
        }
    };

    var canvasService = function ( element, isInitialized ) {

        if ( isInitialized ) return;

        if (!window.scenes) window.scenes = {};

        if ( !Config.renderer ) {

            var canvas = document.createElement( 'canvas' );
            var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
            renderer.setClearColor( 0x111111, 1.0 );
            renderer.clear();
            renderer.setSize( window.innerWidth, window.innerHeight );
            Config.renderer = renderer;
            element.appendChild( canvas );

        } else {

            canvas = Config.renderer.domElement;
            Config.renderer.setClearColor( 0x111111, 1.0 );
            Config.renderer.clear();
            Config.renderer.setSize( window.innerWidth, window.innerHeight );
            element.appendChild( canvas );

        }

        changeScene( element, true );

        // todo: think how to fix multiplying listeners. remove this
        window.addEventListener("hashchange", function() { changeScene( element ); }, false);

        // todo: and about this piece
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
