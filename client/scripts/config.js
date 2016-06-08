var picturesArr = require('./../content/text/picturesList.js');
var Config = {

    currentScene: '',
    defaultScene: 'wildGrowth',

    scenes: {
        wildGrowth: './scenes/wildGrowthScene.min.js',
        fun1: './scenes/fun1Scene.min.js'
    },

    onResize: {},

    controlPanel: {
        isVertical: false,
        isHidden: false,
        onBecomingVertical: {},
        onBecomingHorizontal: {}
    },

    iframeAPILoaded: false,
    videos: [
        { name: 'villalobos_etude1', id: '8-3Nc6nMMpw' },
        { name: 'dwarf_fortress_theme', id: 'l62xYyRB-2Y' },
        { name: 'breath', id: 'Hb3f1P4Z09s' },
        { name: 'opengl_spaceship', id: 'tXAWTZmzaiU' }
    ],
    videoSize: {x: null, y: null, ratio: 1.5},
    minVideoWidth: 300,
    maxVideoWidth: 700,

    pictures: picturesArr,
    picturesPerLoad: 16,

    renderer: null,
    devicePixelRatio: 1,
    canvasWidth: 200,
    canvasHeight: 200,
    aspectRatio: 1

};

module.exports = Config;