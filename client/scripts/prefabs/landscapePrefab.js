/**
 * Created by mlkn on 18.10.2015.
 */
(function () {
    var glslify = require('glslify');
    var Config = require('./../config');
    'use strict';

    var landscapeFunc = function () {
        var self = this;

        var geometry = new THREE.PlaneGeometry(200, 200, 30, 30);

        var vertexShader = glslify('./shaders/landscape.vert');
        var fragmentShader = glslify('./shaders/landscape.frag');

        this.customUniforms =
        {
            mixAmount: 	 { type: "f", value: Config.mixAmount },
            landscapeAnimMix: 	 { type: "f", value: 1 },
            aspectRatio: { type: "f", value: Config.aspectRatio },
            landscape: { type: "t", value: Config.rtTexture },
            landscapeOld: { type: "t", value: Config.rtTextureOld },
            myLightPos:{
                type:"v3",
                value: new THREE.Vector3(0.5, 0.2, 1.0)
            }
        };

        var material = new THREE.ShaderMaterial(
            {
                uniforms: self.customUniforms,
                vertexShader:  vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide
                // transparent: true,
                // lights: true
            }   );

        var mesh = new THREE.Mesh(geometry,  material);

        this.changeLandscape = function() {
            self.customUniforms.landscapeAnimMix.value = 0;
        };
        this.update = function() {
            self.customUniforms.mixAmount.value = Config.mixAmount;
            self.customUniforms.aspectRatio.value = Config.aspectRatio;
            self.customUniforms.landscapeAnimMix.value = (Config.time/1000 - Config.changeLandscapeStartTime)/Config.changeLandscapeLength < 1 ?
            (Config.time/1000 - Config.changeLandscapeStartTime)/Config.changeLandscapeLength : 1;
        };

        return {mesh: mesh, update: self.update, changeLandscape: self.changeLandscape}
    };

    module.exports = landscapeFunc;
})();