(function () {
  'use strict';

var home = require('./pages/home');
var about = require('./pages/about');

module.exports = {
  '/': home,
  '/about': about
};
} ());