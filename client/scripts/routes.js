'use strict';

var home = require('./pages/home');
var blog = require('./pages/blog');
var pictures = require('./pages/pictures');
var videos = require('./pages/videos');
var music = require('./pages/music');

module.exports = {
    '/': home,
    '/blog': blog,
    '/pictures': pictures,
    '/videos': videos,
    '/music': music
};
