var Config = require('./config');
var Heights = require('./prefabs/heightsGenerator');
var Landscape = require('./prefabs/landscapePrefab');
var Ocean = require('./prefabs/oceanPrefab');
var Controls = require('./controls');

window.initScene = function(canvas, renderer) {

    var self = this;
    var scene, heights, landscape, ocean, pointLight;

    renderer.setClearColor(0x111111, 1.0);
    renderer.clear();
    Config.renderer = renderer;

    var camera = new THREE.PerspectiveCamera(60, Config.aspectRatio, 1, 1000);
    Config.camera = camera;

    var controls = new Controls();
    controls.resize();

    camera.position.z = 76;
    camera.position.y = 50;
    camera.lookAt( new THREE.Vector3(0,0,0) );
    camera.updateProjectionMatrix();

    scene = new THREE.Scene();
    // scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

    heights = new Heights(renderer);
    Config.rtTexture = heights.texture;
    Config.rtTextureOld = heights.textureOld;

    landscape = new Landscape();
    scene.add( landscape.mesh );

    ocean = new Ocean();
    scene.add( ocean.mesh );

    pointLight = new THREE.PointLight( 0xffffff );
    pointLight.position.x = 12;
    pointLight.position.y = 50;
    pointLight.position.z = 50;
    scene.add( pointLight );
    landscape.mesh.material.needsUpdate = true;

    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    return {
        scene: scene,
        update: function() {
            Config.time = (new Date()).getTime();
            if ( Config.changeLandscapeStartFlag ) {
                heights.update();
                landscape.changeLandscape();
                Config.changeLandscapeStartFlag = false;
            }
            orbitControls.update();
            landscape.update();
            renderer.render(scene, camera);
        },
        dispose: function() {
            console.log('todo: scene disposing and changing renderers probably');
        }
    };
};
