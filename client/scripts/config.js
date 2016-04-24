var Config = {

    currentScene: '',
    defaultScene: 'wildGrowth',

    scenes: {

        wildGrowth: './scenes/wildGrowthScene.min.js',
        fun1: './scenes/fun1Scene.min.js'
        
    },

    controlPanel: {
        isVertical: false,
        isHidden: false,
        isMoving: false,
        endedMovement: false,
        offset: 0,
        speed: 45,
        maxOffset: 15
    },
    time: 0,

    renderer: null

};

module.exports = Config;