(function () {
    var Config = require( './../../config' );
    'use strict';

    var getCurrentHash = function() {

        return window.location.hash.substr( 1 );

    };

    var changeScene = function( element, forceRedraw ) {

        var hash = getCurrentHash();

        if ( !hash || !Config.scenes[ hash ] ) hash = Config.defaultScene;

        if ( forceRedraw || Config.currentSceneHash !== hash) {

            if ( ! window.scenes[ hash ] ) {

                Config.currentSceneHash = hash;

                var script = document.createElement( 'script' );
                script.setAttribute( 'type', 'text/javascript' );
                script.setAttribute( 'src', Config.scenes[ hash ] );

                script.onload = function() {

                    if ( Config.currentScene && Config.currentScene.dispose ) {
                        Config.currentScene.dispose();
                    }
                    if ( window.scenes[ hash ] ) {
                        Config.currentScene = window.scenes[ hash ]( element, Config.renderer, Config );
                    } else {
                        console.log( 'couldn\'t load scene' );
                    }
                    
                };

                document.body.appendChild( script );

            } else {

                Config.currentSceneHash = hash;

                if ( Config.currentScene && Config.currentScene.dispose ) {
                    Config.currentScene.dispose();
                }
                Config.currentScene = window.scenes[ hash ]( element, Config.renderer );
                
            }
        }
    };

    var canvasService = function ( element, isInitialized ) {

        if ( isInitialized ) return;
        if (!window.scenes) window.scenes = {};

        var canvas;

        if ( !Config.renderer ) {

            canvas = document.createElement( 'canvas' );
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            Config.renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
            window.addEventListener("hashchange", function() { changeScene( element ); }, false);

        } else {

            canvas = Config.renderer.domElement;

        }

        Config.renderer.setClearColor( 0x111111, 1.0 );
        Config.renderer.clear();
        element.appendChild( canvas );

        changeScene( element, true );

        var gl = Config.renderer.getContext();

        function resize() {

            var width = gl.canvas.clientWidth;
            var height = gl.canvas.clientHeight;

            if ( gl.canvas.width != width || gl.canvas.height != height ) {

                gl.canvas.width = width;
                gl.canvas.height = height;

                if (Config.currentScene.resize) {
                    Config.currentScene.resize();
                }

            }
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        }
        resize();

        function animate() {

            requestAnimationFrame( animate );

            if ( Config.currentScene && Config.currentScene.scene ) {
                resize();
                Config.currentScene.update();
            }

        }

        animate();

    };

    module.exports = canvasService;

}());
