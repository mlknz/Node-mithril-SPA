/**
 * Created by mlkn on 22.12.2015.
 */
(function () {
    var glslify = require('glslify');
    var Config = require('./../config');
    'use strict';

    var heightsFunc = function (renderer) {
        var seed = 1;
        var rtTexture = new THREE.WebGLRenderTarget(
            512,
            512,
            { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat }
        );
        var rtTextureOld = new THREE.WebGLRenderTarget(
            512,
            512,
            { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat }
        );

        var vertexShader = glslify('./shaders/default.vert');
        var fragmentShader = glslify('./shaders/generateTexture.frag');

        var material = new THREE.ShaderMaterial( {
            uniforms: { seed: { type: "f", value: seed } },
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

        renderer.render( sceneRTT, cameraRTT, rtTexture, true );
        renderer.render( sceneRTT, cameraRTT, rtTextureOld, true );

        return {
            texture: rtTexture.texture,
            textureOld: rtTextureOld.texture,
            update: function() {
                renderer.render( sceneRTT, cameraRTT, rtTextureOld, true );
                seed = (Config.time % 100000 - Config.time % 1000) / 1000;
                material.uniforms.seed.value = seed+1;
                renderer.render(sceneRTT, cameraRTT, rtTexture, true);
            }
        };
    };

    module.exports = heightsFunc;
})();