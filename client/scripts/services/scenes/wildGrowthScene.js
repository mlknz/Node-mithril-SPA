/**
 * Created by mlkn on 18.10.2015.
 */

(function () {
    var Config = require('./../../config');
    var Landscape = require('./../../prefabs/landscapePrefab');
    'use strict';

    var createScene = function() {

        var self = this;

        Config.camera.position.z = 76;
        Config.camera.position.y = 50;
        // Config.camera.position.x = 30;
        Config.camera.lookAt(new THREE.Vector3(0,0,0));
        Config.camera.updateProjectionMatrix();

        var scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

        var landscape = new Landscape();
        landscape.mesh.rotation.x = -90;

        scene.add(landscape.mesh);

        var startTime = (new Date()).getTime();

        // sky cubemap

        // sun

        // grass

        // trees

        // lights?

        var pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.x = 12;
        pointLight.position.y = 50;
        pointLight.position.z = 50;
        scene.add(pointLight);
        landscape.mesh.material.needsUpdate = true;
        /*var geometry = new THREE.BufferGeometry();

        var vertexPositions = [
            [-10+50, -10,  10],
            [ 10+50, -10,  10],
            [ 10+50,  10,  10],
            [ -10+50, 10,  10]
        ];
        var vertices = new Float32Array( vertexPositions.length * 3 );
        var indices = new Uint16Array(6);
        indices[0] = 0;
        indices[1] = 2;
        indices[2] = 3;
        indices[3] = 1;
        indices[4] = 2;
        indices[5] = 3;
        for ( var i = 0; i < vertexPositions.length; i++ )
        {
            vertices[ i*3 + 0 ] = vertexPositions[i][0];
            vertices[ i*3 + 1 ] = vertexPositions[i][1];
            vertices[ i*3 + 2 ] = vertexPositions[i][2];
        }
        geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
        var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0xffbb0f}) );
        scene.add(mesh); */

        this.update = function() {
            // console.log(new Date().getTime());
            // console.log(Config.universeTime);
            landscape.update();

        };

        return {scene: scene, update: self.update};
    };

    module.exports = createScene;
}());