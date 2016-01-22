/**
 * Created by mlkn on 18.10.2015.
 */
(function () {
    var glslify = require('glslify');
    var Config = require('./../config');
    'use strict';

    var landscapeFunc = function () {
        var self = this;

        var geometry = new THREE.SphereGeometry(25, 100, 100);
        var material = new THREE.MeshBasicMaterial( { color: 0x222277 });
        material.transparent = true;
        material.opacity = 0.5;

        var mesh = new THREE.Mesh(geometry,  material);

        this.animationTime = 10;
        this.update = function() {
            self.customUniforms.mixAmount.value = Config.mixAmount;
            self.customUniforms.aspectRatio.value = Config.aspectRatio;
        };

        return {mesh: mesh, update: self.update, animationTime: self.animationTime}
    };

    module.exports = landscapeFunc;
})();