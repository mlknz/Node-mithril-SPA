/**
 * Created by mlkn on 18.10.2015.
 */

(function () {
    var Config = require('./../../config');
    var Heights = require('./../../prefabs/heightsGenerator');
    var Landscape = require('./../../prefabs/landscapePrefab');
    var Ocean = require('./../../prefabs/oceanPrefab');

    var createScene = function() {

        'use strict';

        var self = this;
        var scene, heights, landscape, ocean, pointLight;

        Config.camera.position.z = 76;
        Config.camera.position.y = 50;
        Config.camera.lookAt(new THREE.Vector3(0,0,0));
        Config.camera.updateProjectionMatrix();

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

        heights = new Heights();
        Config.rtTexture = heights.texture;
        Config.rtTextureOld = heights.textureOld;

        landscape = new Landscape();
        scene.add(landscape.mesh);

        ocean = new Ocean();
        scene.add(ocean.mesh);

        pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.x = 12;
        pointLight.position.y = 50;
        pointLight.position.z = 50;
        scene.add(pointLight);
        landscape.mesh.material.needsUpdate = true;

        this.update = function() {
            if (Config.changeLandscapeStartFlag) {
                heights.update();
                landscape.changeLandscape();
                Config.changeLandscapeStartFlag = false;
            }
            landscape.update();
        };

        return {scene: scene, update: self.update};
    };

    module.exports = createScene;
}());