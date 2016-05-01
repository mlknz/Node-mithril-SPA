(function () {
  'use strict';

  var home = require('./pages/home');
  var about = require('./pages/about');
  var blog = require('./pages/blog');
  var pictures = require('./pages/pictures');
  var music = require('./pages/music');

  module.exports = {
    '/': home,
    '/about': about,
    '/blog': blog,
    '/pictures': pictures,
    '/music': music
  };

} ());