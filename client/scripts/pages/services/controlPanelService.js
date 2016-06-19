'use strict';

var Config = require('./../../config');
var _ = require('lodash');
var m = require('mithril');

var controlPanel,
    corner,
    blogButton,
    musicButton,
    picturesButton,
    videoButton,
    hidePanelButton,
    hidePanelImg,
    sceneSelector,
    scenesContainer,
    scenesButtons = [];

function makeControlPanelHorizontal() {

    Config.controlPanel.isVertical = false;

    controlPanel.className = Config.controlPanel.isHidden ? 'control-panel_horizontal-hidden' : 'control-panel_horizontal-shown';

    sceneSelector.className = 'control-panel__scene-selector_horizontal';
    scenesContainer.className = 'control-panel__scene-selector__cont_horizontal';
    hidePanelButton.className = 'control-panel__hide-button_horizontal';
    hidePanelImg.className = Config.controlPanel.isHidden ? 'control-panel__hide-button__img_horizontal-hidden' : 'control-panel__hide-button__img_horizontal-shown';

    corner.className = 'control-panel__corner_horizontal';
    blogButton.className = 'control-panel__blog-button_horizontal';
    picturesButton.className = 'control-panel__pictures-button_horizontal';
    videoButton.className = 'control-panel__videos-button_horizontal';
    musicButton.className = 'control-panel__music-button_horizontal';

    scenesButtons.forEach(function (b) {
        b.className = 'control-panel__scene-selector__cont__button_horizontal';
    });

    for (var key in Config.controlPanel.onBecomingHorizontal) {
        if (Config.controlPanel.onBecomingHorizontal.hasOwnProperty(key)) {
            Config.controlPanel.onBecomingHorizontal[key]();
        }
    }

}

function makeControlPanelVertical() {

    Config.controlPanel.isVertical = true;

    controlPanel.className = Config.controlPanel.isHidden ? 'control-panel_vertical-hidden' : 'control-panel_vertical-shown';

    sceneSelector.className = 'control-panel__scene-selector_vertical';
    scenesContainer.className = 'control-panel__scene-selector__cont_vertical';
    hidePanelButton.className = 'control-panel__hide-button_vertical';
    hidePanelImg.className = Config.controlPanel.isHidden ? 'control-panel__hide-button__img_vertical-hidden' : 'control-panel__hide-button__img_vertical-shown';

    corner.className = 'control-panel__corner_vertical';
    blogButton.className = 'control-panel__blog-button_vertical';
    picturesButton.className = 'control-panel__pictures-button_vertical';
    videoButton.className = 'control-panel__videos-button_vertical';
    musicButton.className = 'control-panel__music-button_vertical';

    scenesButtons.forEach(function (b) {
        b.className = 'control-panel__scene-selector__cont__button_vertical';
    });

    for (var key in Config.controlPanel.onBecomingVertical) {
        if (Config.controlPanel.onBecomingVertical.hasOwnProperty(key)) {
            Config.controlPanel.onBecomingVertical[key]();
        }
    }

}

function createControlPanel(element, isInitialized) {

    if (isInitialized) return;
    controlPanel = element;

    corner = document.createElement('div');
    controlPanel.appendChild(corner);

    sceneSelector = document.createElement('div');
    scenesContainer = document.createElement('div');
    sceneSelector.appendChild(scenesContainer);

    var scenesKeys = Object.keys(Config.scenes);

    for (var i = 0; i < scenesKeys.length; i++) {

        var elem = document.createElement('img');
        elem.src = 'content/images/' + scenesKeys[i] + '.png';
        elem.hashLink = scenesKeys[i];
        scenesContainer.appendChild(elem);
        scenesButtons.push(elem);

    }
    controlPanel.appendChild(sceneSelector);

    blogButton = document.createElement('div');
    blogButton.appendChild(createImgDiv('content/images/textButton.png', 'control-panel__routing-button__img'));
    controlPanel.appendChild(blogButton);

    picturesButton = document.createElement('div');
    picturesButton.appendChild(createImgDiv('content/images/picturesButton.png', 'control-panel__routing-button__img'));
    controlPanel.appendChild(picturesButton);

    videoButton = document.createElement('div');
    videoButton.appendChild(createImgDiv('content/images/videoButton.png', 'control-panel__routing-button__img'));
    controlPanel.appendChild(videoButton);

    musicButton = document.createElement('div');
    musicButton.appendChild(createImgDiv('content/images/musicButton.png', 'control-panel__routing-button__img'));
    controlPanel.appendChild(musicButton);

    hidePanelButton = document.createElement('div');
    hidePanelImg = createImgDiv('content/images/up.png');
    hidePanelButton.appendChild(hidePanelImg);
    controlPanel.appendChild(hidePanelButton);

    Config.controlPanel.isVertical = false;
    makeControlPanelHorizontal();
    resize();

    addControlPanelEventListeners();

}

var resize = _.throttle(function () {

    for (var key in Config.onResize) {
        if (Config.onResize.hasOwnProperty(key)) {
            Config.onResize[key]();
        }
    }

    if (window.innerWidth / window.innerHeight < 1 && Config.controlPanel.isVertical) {

        makeControlPanelHorizontal();

    } else if (window.innerWidth / window.innerHeight > 1 && !Config.controlPanel.isVertical) {

        makeControlPanelVertical();

    }

}, 100);

function createImgDiv(src, className) {
    var img = document.createElement('img');
    img.src = src;
    if (className) img.className = className;
    return img;
}

function addControlPanelEventListeners() {

    corner.addEventListener('click', function (e) {
        e.preventDefault();
        if (m.route() !== '/') {
            m.route('/');
        }
    });

    addRoutingListener(blogButton, '/blog');
    addRoutingListener(picturesButton, '/pictures');
    addRoutingListener(videoButton, '/videos');
    addRoutingListener(musicButton, '/music');

    scenesButtons.forEach(function (b) {
        b.addEventListener('click', function (e) {

            e.preventDefault();

            if (e.srcElement.hashLink === Config.defaultScene) {
                if (m.route() !== '/') {
                    m.route('/');
                }
                window.location.hash = '';
            } else {
                if (m.route() !== '/') {
                    m.route('/');
                }
                window.location.hash = e.srcElement.hashLink;
            }

        });
    });

    addHidePanelButtonListener();

    window.addEventListener('resize', resize);

}

function addRoutingListener(button, routeTo) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        if (Config.currentScene && Config.currentScene.dispose) {
            Config.currentScene.dispose();
        }
        Config.currentScene = null;
        window.location.hash = '-';
        Config.currentScene = '-1';
        m.route(routeTo);
    });
}

function addHidePanelButtonListener() {

    hidePanelButton.addEventListener('click', function () {
        if (Config.controlPanel.isHidden) {
            if (Config.controlPanel.isVertical) {
                hidePanelImg.className = 'control-panel__hide-button__img_vertical-shown';
                controlPanel.className = 'control-panel_vertical-shown';
            } else {
                hidePanelImg.className = 'control-panel__hide-button__img_horizontal-shown';
                controlPanel.className = 'control-panel_horizontal-shown';
            }
            Config.controlPanel.isHidden = false;
        } else {
            if (Config.controlPanel.isVertical) {
                hidePanelImg.className = 'control-panel__hide-button__img_vertical-hidden';
                controlPanel.className = 'control-panel_vertical-hidden';
            } else {
                hidePanelImg.className = 'control-panel__hide-button__img_horizontal-hidden';
                controlPanel.className = 'control-panel_horizontal-hidden';
            }
            Config.controlPanel.isHidden = true;
        }
    });

}

module.exports = createControlPanel;
