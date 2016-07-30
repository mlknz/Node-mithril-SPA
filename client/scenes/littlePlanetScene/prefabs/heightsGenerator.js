'use strict';

var glslify = require('glslify');
var Config = require('./../config');

var heightsFunc = function (renderer) {
    var seed = 1;
    var renderWidth = 1024;
    var renderHeight = 1024;
    var rtTexture = new THREE.WebGLRenderTarget(
        renderWidth,
        renderHeight,
        {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat}
    );
    var rtTextureOld = new THREE.WebGLRenderTarget(
        renderWidth,
        renderHeight,
        {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat}
    );

    var vertexShader = glslify('./shaders/default.vert');
    var fragmentShader = glslify('./shaders/generateTexture.frag');

    var material = new THREE.ShaderMaterial({
        uniforms: {seed: {type: "f", value: seed}},
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    var cameraRTT = new THREE.OrthographicCamera(renderWidth / -2, renderWidth / 2, renderHeight / 2, renderHeight / -2, -10000, 10000);
    cameraRTT.position.z = 100;
    var sceneRTT = new THREE.Scene();

    var plane = new THREE.PlaneBufferGeometry(renderWidth, renderHeight);
    var quad = new THREE.Mesh(plane, material);
    quad.position.z = -100;
    sceneRTT.add(quad);

    renderer.render(sceneRTT, cameraRTT, rtTexture, true);
    renderer.render(sceneRTT, cameraRTT, rtTextureOld, true);


    return {
        texture: rtTexture.texture,
        textureOld: rtTextureOld.texture,
        update: function () {
            renderer.render(sceneRTT, cameraRTT, rtTextureOld, true);
            seed = (Config.time % 100000 - Config.time % 1000) / 1000;
            material.uniforms.seed.value = seed + 1;
            renderer.render(sceneRTT, cameraRTT, rtTexture, true);
        }
    };
};

module.exports = heightsFunc;
