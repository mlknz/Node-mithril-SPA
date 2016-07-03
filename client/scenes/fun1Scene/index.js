'use strict';

var Config = {};
require('../../libs/orbitControls');

window.scenes.fun1 = function (canvas, renderer) {

    renderer.setClearColor(0x995522, 1.0);
    renderer.clear();

    var gl = renderer.getContext();
    Config.renderer = renderer;
    Config.aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;

    var camera = new THREE.PerspectiveCamera(60, Config.aspectRatio, 1, 10000);
    camera.position.z = 76;
    camera.position.y = 60;
    camera.position.x = -70;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();

    var scene = new THREE.Scene();

    var cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
    var cubeMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = 30;
    cube.castShadow = true;
    cube.receiveShadow = false;
    scene.add(cube);

    var planeGeometry = new THREE.PlaneGeometry(400, 400, 400);
    var planeMaterial = new THREE.MeshPhongMaterial({color: 0xff5555, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -40;
    plane.castShadow = false;
    plane.receiveShadow = true;
    scene.add(plane);

    var light = new THREE.AmbientLight(0x404060);
    scene.add(light);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, 40);
    spotLight.target.position.set(0, 0, 0);
    spotLight.castShadow = true;
    spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(60, 1, 1, 2500));
    spotLight.shadow.bias = 0.0001;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    return {
        scene: scene,
        update: function () {
            Config.time = (new Date()).getTime();
            cube.position.x = 60 * Math.sin(Config.time / 1000);
            cube.position.z = 60 * Math.cos(Config.time / 1000);
            cube.rotation.z = Config.time / 1000;
            cube.rotation.y = Config.time / 500;
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