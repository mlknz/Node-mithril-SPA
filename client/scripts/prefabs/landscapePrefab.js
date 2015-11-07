/**
 * Created by mlkn on 18.10.2015.
 */
(function () {
    var glslify = require('glslify');
    var Config = require('./../config');
    'use strict';

    var landscapeFunc = function () {
        var self = this;

        var geometry = new THREE.PlaneGeometry(200, 100, 30, 30);

        var vertexShader = glslify('./shaders/landscape.vert');
        var fragmentShader = glslify('./shaders/landscape.frag');

        this.customUniforms =
        {
            mixAmount: 	 { type: "f", value: 0.0 },
            aspectRatio: { type: "f", value: Config.aspectRatio },
            myLightPos:{
                type:"v3",
                value: new THREE.Vector3(0.5, 0.2, 1.0)
            }
        };

        // create custom material from the shader code above
        //   that is within specially labeled script tags
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


        this.animationTime = 10;
        this.update = function() {
            self.customUniforms.mixAmount.value = Config.universeTime;
            self.customUniforms.aspectRatio.value = Config.aspectRatio;
        };

        return {mesh: mesh, update: self.update, animationTime: self.animationTime}
    };

    module.exports = landscapeFunc;
})();