(function () {
    var Config = require( './../../config' );
    var currentScene = {};
    'use strict';

    var getCurrentHash = function() {

        return window.location.hash.substr( 1 );

    };

    var changeScene = function( element, forceRedraw ) {

        var hash = getCurrentHash();

        if ( !hash || !Config.scenes[ hash ] ) hash = Config.defaultScene;

        if ( forceRedraw || Config.currentScene !== hash) {

            if ( ! window.scenes[ hash ] ) {

                Config.currentScene = hash;

                var script = document.createElement( 'script' );
                script.setAttribute( 'type', 'text/javascript' );
                script.setAttribute( 'src', Config.scenes[ hash ] );

                script.onload = function() {

                    if ( currentScene && currentScene.dispose ) {
                        currentScene.dispose();
                    }
                    if ( window.scenes[ hash ] ) {
                        currentScene = window.scenes[ hash ]( element, Config.renderer, Config );
                    } else {
                        console.log( 'couldn\'t load scene' );
                    }
                    
                };

                document.body.appendChild( script );

            } else {

                Config.currentScene = hash;

                if ( currentScene && currentScene.dispose ) {
                    currentScene.dispose();
                }
                currentScene = window.scenes[ hash ]( element, Config.renderer, Config );
                
            }
        }
    };

    var canvasService = function ( element, isInitialized ) {

        if ( isInitialized ) return;

        if (!window.scenes) window.scenes = {};


        if ( !Config.renderer ) {

            var canvas = document.createElement( 'canvas' );
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
            Config.renderer = renderer;
            // Config.devicePixelRatio = window.devicePixelRatio || 1;
            renderer.setClearColor( 0x111111, 1.0 );
            renderer.clear();
            element.appendChild( canvas );

        } else {

            canvas = Config.renderer.domElement;
            Config.renderer.setClearColor( 0x111111, 1.0 );
            Config.renderer.clear();
            element.appendChild( canvas );

        }

        changeScene( element, true );

        // todo: stop multiplying listeners.
        window.addEventListener("hashchange", function() { changeScene( element ); }, false);
        var gl = Config.renderer.getContext();

        function resize() {

            var width = gl.canvas.clientWidth;
            var height = gl.canvas.clientHeight;
            Config.canvasWidth = width;
            Config.canvasHeight = height;
            Config.aspectRatio = Config.canvasWidth / Config.canvasHeight;

            if ( gl.canvas.width != width ||
                gl.canvas.height != height ) {

                gl.canvas.width = width;
                gl.canvas.height = height;

            }
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        }
        resize();

        function animate() {

            requestAnimationFrame( animate );

            if ( currentScene.scene ) {
                resize();
                currentScene.update();
            }

        }

        animate();

    };

    module.exports = canvasService;

}());
