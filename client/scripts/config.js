var picturesArr = require('./../content/text/picturesList.js');
var Config = {

    currentSceneHash: '',
    currentScene: {},
    defaultScene: 'littlePlanet',

    scenes: {
        littlePlanet: './scenes/littlePlanetScene.min.js',
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
        {name: 'Video1', id: 'l62xYyRB-2Y'},
        {name: 'Video2', id: 'l62xYyRB-2Y'},
        {name: 'Video3', id: 'l62xYyRB-2Y'},
        {name: 'Video4', id: 'l62xYyRB-2Y'}
    ],
    videoSize: {x: null, y: null, ratio: 1.5},
    minVideoWidth: 300,
    maxVideoWidth: 700,

    pictures: picturesArr,
    picturesPerLoad: 16,

    renderer: null

};

module.exports = Config;