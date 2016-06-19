'use strict';

var home = require('./pages/home');
var blog = require('./pages/blog');
var pictures = require('./pages/pictures');
var video = require('./pages/video');
var music = require('./pages/music');

module.exports = {
    '/': home,
    '/blog': blog,
    '/pictures': pictures,
    '/video': video,
    '/music': music
};
