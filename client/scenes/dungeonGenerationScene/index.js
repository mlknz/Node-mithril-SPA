'use strict';

var Config = {};
var Dungeonizer = require('../../libs/dungeonizer.js');
require('../../libs/orbitControls');

var glslify = require('glslify');
var floorsVert = glslify('./shaders/floors.vert');
var floorsFrag = glslify('./shaders/floors.frag');

var floorHeight = 5;
var cubeGeom = new THREE.BoxBufferGeometry(1, 1, 1);

function generateFloorsMesh(floors) {
    var offsets = [];
    var scales = [];
    for (var i = 0; i < floors.length; i++) {
        offsets.push((floors[i].x1 + floors[i].x2)/2, 0, (floors[i].y1 + floors[i].y2)/2);
        scales.push(floors[i].x2 - floors[i].x1, floorHeight, floors[i].y2 - floors[i].y1);
    }
    var geom = new THREE.InstancedBufferGeometry();

    geom.addAttribute('position', cubeGeom.attributes.position);
    geom.addAttribute('normal', cubeGeom.attributes.normal);
    geom.setIndex(cubeGeom.index);
    geom.addAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3, 1));
    geom.addAttribute('scale', new THREE.InstancedBufferAttribute(new Float32Array(scales), 3, 1));

    var floorsMaterial = new THREE.RawShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(THREE.UniformsLib.lights),
        vertexShader: floorsVert,
        fragmentShader: floorsFrag,
        side: THREE.FrontSide,
        transparent: false,
        lights: true
    });

    return new THREE.Mesh(geom, floorsMaterial);
}

window.scenes.dungeonGeneration = function (canvas, renderer) {

    renderer.setClearColor(0x334422, 1.0);
    renderer.clear();

    if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === false ) {
        // todo: message to user
        return;
    }

    var gl = renderer.getContext();
    Config.renderer = renderer;
    Config.aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;

    var camera = new THREE.PerspectiveCamera(60, Config.aspectRatio, 1, 10000);
    camera.position.z = 76;
    camera.position.y = 60;
    camera.position.x = -70;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();

    var dungeon = Dungeonizer.generateTestDungeon();

    var scene = new THREE.Scene();

    var floorsMesh = generateFloorsMesh(dungeon.floors);
    scene.add(floorsMesh);

    var light = new THREE.AmbientLight(0x202020);
    scene.add(light);

    var dirLight = new THREE.DirectionalLight(0xaaaaaa);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    return {
        scene: scene,
        update: function () {
            Config.time = (new Date()).getTime();
            orbitControls.update();
            renderer.render(scene, camera);
        },
        resize: function (width, height) {
            Config.aspectRatio = width / height;
            if (camera.aspect !== Config.aspectRatio) {
                camera.aspect = Config.aspectRatio;
                camera.updateProjectionMatrix();
            }
        },
        dispose: function () {
            orbitControls.dispose();
            renderer.shadowMap.enabled = false;
        }
    };
};