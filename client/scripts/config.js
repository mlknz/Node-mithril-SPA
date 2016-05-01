var Config = {

    currentScene: '',
    defaultScene: 'wildGrowth',

    scenes: {
        wildGrowth: './scenes/wildGrowthScene.min.js',
        fun1: './scenes/fun1Scene.min.js',
        kangarooMadness: './scenes/fun1Scene.min.js'
    },

    controlPanel: {
        isVertical: false,
        isHidden: false
    },

    renderer: null

};

module.exports = Config;