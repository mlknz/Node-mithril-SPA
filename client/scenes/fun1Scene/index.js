/**
 * Created by mlkn on 18.04.2016.
 */

window.scenes.fun1 = function(canvas, renderer) {

    renderer.setClearColor(0x993322, 1.0);
    renderer.clear();

    var camera = new THREE.PerspectiveCamera(60, 120/100, 1, 1000);
    var scene = new THREE.Scene();


    return {
        scene: scene,
        update: function() {
            renderer.render(scene, camera);
        },
        dispose: function() {
            console.log('todo: scene disposing and changing renderers probably');
        }
    };
};