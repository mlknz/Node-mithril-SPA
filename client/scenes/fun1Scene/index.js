/**
 * Created by mlkn on 18.04.2016.
 */
var Config = {};
var OrbitControls = require('../../libs/orbitControls');

window.scenes.fun1 = function(canvas, renderer) {

    renderer.setClearColor(0x995522, 1.0);
    renderer.clear();

    var gl = renderer.getContext();
    Config.renderer = renderer;
    Config.aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;

    var camera = new THREE.PerspectiveCamera( 60, Config.aspectRatio, 1, 10000 );
    camera.position.z = 76;
    camera.position.y = 60;
    camera.position.x = -70;
    camera.lookAt( new THREE.Vector3( 0,0,0 ) );
    camera.updateProjectionMatrix();

    var scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry( 50, 50, 50 );
    var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var light = new THREE.AmbientLight( 0x404060 );
    scene.add( light );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( -0.5, 0.3, 0 );
    scene.add( directionalLight );

    var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );

    return {
        scene: scene,
        update: function() {
            orbitControls.update();
            renderer.render(scene, camera);
        },
        dispose: function() {
            orbitControls.dispose();
        }
    };
};