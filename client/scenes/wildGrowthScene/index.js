var Config = require('./config');
var Heights = require('./prefabs/heightsGenerator');
var Landscape = require('./prefabs/landscapePrefab');
var Ocean = require('./prefabs/oceanPrefab');

window.scenes.wildGrowth = function( canvas, renderer ) {

    var scene, heights, landscape, ocean, pointLight;
    renderer.setClearColor( 0x111111, 1.0 );
    renderer.clear();
    var gl = renderer.getContext();
    Config.renderer = renderer;
    Config.aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;

    var camera = new THREE.PerspectiveCamera( 60, Config.aspectRatio, 1, 1000 );
    camera.position.z = 76;
    camera.position.y = 50;
    camera.lookAt( new THREE.Vector3( 0,0,0 ) );
    camera.updateProjectionMatrix();

    scene = new THREE.Scene();

    heights = new Heights( renderer );
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

    var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );

    var changeLandscapeButton = document.createElement( 'BUTTON' );
    var t = document.createTextNode( 'Change landscape' );
    changeLandscapeButton.appendChild( t );
    changeLandscapeButton.onclick = function( e ) {
        if (Config.time/1000 - Config.changeLandscapeStartTime > Config.changeLandscapeLength) {
            Config.changeLandscapeStartTime = Config.time/1000;
            Config.changeLandscapeStartFlag = true;
            console.log('changing landspace');
        }
    };

    changeLandscapeButton.style.position = 'absolute';
    changeLandscapeButton.style.bottom = 0;
    changeLandscapeButton.style.width = '20vh';
    changeLandscapeButton.style.height = '10vh';
    document.body.appendChild( changeLandscapeButton );

    return {
        scene: scene,
        update: function() {
            Config.time = ( new Date() ).getTime();
            Config.aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
            if ( camera.aspect !== Config.aspectRatio ) {
                camera.aspect = Config.aspectRatio;
                camera.updateProjectionMatrix();
            }

            if ( Config.changeLandscapeStartFlag ) {
                heights.update();
                landscape.changeLandscape();
                Config.changeLandscapeStartFlag = false;
            }
            orbitControls.update();
            landscape.update();
            renderer.render( scene, camera );
        },
        dispose: function() {
            changeLandscapeButton.parentNode.removeChild(changeLandscapeButton);
            // console.log('disposing');
        }
    };
};
