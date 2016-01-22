/**
 * Created by mlkn on 14.10.2015.
 */

var Config = {

    'canvasWidth': 0,
    'canvasHeight': 0,
    'aspectRatio': 1,
    'renderer': null,
    'camera': null,
    'rtTextureOld': null,
    'rtTexture': null,

    'time': 0,
    'mixAmount': 0,
    'changeLandscapeStartFlag': false,
    'changeLandscapeStartTime': 0, // in seconds
    'changeLandscapeLength': 1 // in seconds
};

module.exports = Config;