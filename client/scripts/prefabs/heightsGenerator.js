/**
 * Created by mlkn on 22.12.2015.
 */
(function () {
    var glslify = require('glslify');
    var Config = require('./../config');
    'use strict';

    var heightsFunc = function () {
        var time = Config.time;
        var rtTexture = new THREE.WebGLRenderTarget(
            512,
            512,
            { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat }
        );

        var vertexShader = glslify('./shaders/default.vert');
        var fragmentShader = glslify('./shaders/generateTexture.frag');

        var material = new THREE.ShaderMaterial( {
            uniforms: { time: { type: "f", value: Config.time } },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        } );

        var cameraRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
        cameraRTT.position.z = 100;
        var sceneRTT = new THREE.Scene();

        var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
        var quad = new THREE.Mesh( plane, material );
        quad.position.z = -100;
        sceneRTT.add( quad );

        Config.renderer.render( sceneRTT, cameraRTT, rtTexture, true );

        return {
            texture: rtTexture,
            update: function() {
                // console.log((Config.time % 100000 - Config.time % 1000) / 1000);
                time = (Config.time % 100000 - Config.time % 1000) / 1000;
                if (material.uniforms.time.value !== time) {
                    material.uniforms.time.value = time;
                    Config.renderer.render(sceneRTT, cameraRTT, rtTexture, true);
                }
            }
        };
    };

    module.exports = heightsFunc;
})();