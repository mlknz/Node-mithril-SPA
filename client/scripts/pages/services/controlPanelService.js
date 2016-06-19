/**
 * Created by mlkn on 23.04.2016.
 */

(function() {
    var Config = require( './../../config' );
    var _ = require('lodash');
    var m = require('mithril');

    'use strict';

    var controlPanel,
        corner,
        textButton,
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

        controlPanel.className = Config.controlPanel.isHidden ? 'controlPanelHorizontalHidden' : 'controlPanelHorizontal';

        sceneSelector.className = 'sceneSelectorHorizontal';
        scenesContainer.className = 'scenesContainerHorizontal';
        hidePanelButton.className = 'hidePanelButtonHorizontal';
        hidePanelImg.className = Config.controlPanel.isHidden ? 'hidePanelImgHorizontalHidden' : 'hidePanelImgHorizontal';

        corner.className = 'cornerHorizontal';
        textButton.className = 'textButtonHorizontal';
        picturesButton.className = 'picturesButtonHorizontal';
        videoButton.className = 'videoButtonHorizontal';
        musicButton.className = 'musicButtonHorizontal';


        scenesButtons.forEach( function( b ) {
            b.className = 'sceneButtonHorizontal';
        });

        for (var key in Config.controlPanel.onBecomingHorizontal) {
            if (Config.controlPanel.onBecomingHorizontal.hasOwnProperty(key)) {
                Config.controlPanel.onBecomingHorizontal[key]();
            }
        }

    }

    function makeControlPanelVertical() {

        Config.controlPanel.isVertical = true;

        controlPanel.className = Config.controlPanel.isHidden ? 'controlPanelVerticalHidden' : 'controlPanelVertical';

        sceneSelector.className = 'sceneSelectorVertical';
        scenesContainer.className = 'scenesContainerVertical';
        hidePanelButton.className = 'hidePanelButtonVertical';
        hidePanelImg.className = Config.controlPanel.isHidden ? 'hidePanelImgVerticalHidden' : 'hidePanelImgVertical';

        corner.className = 'cornerVertical';
        textButton.className = 'textButtonVertical';
        picturesButton.className = 'picturesButtonVertical';
        videoButton.className = 'videoButtonVertical';
        musicButton.className = 'musicButtonVertical';

        scenesButtons.forEach( function( b ) {
            b.className = 'sceneButtonVertical';
        });

        for (var key in Config.controlPanel.onBecomingVertical) {
            if (Config.controlPanel.onBecomingVertical.hasOwnProperty(key)) {
                Config.controlPanel.onBecomingVertical[key]();
            }
        }

    }

    function createControlPanel( element, isInitialized ) {

        if ( isInitialized ) return;
        controlPanel = element;

        corner = document.createElement( 'div' );
        controlPanel.appendChild( corner );

        sceneSelector = document.createElement( 'div' );
        scenesContainer = document.createElement( 'div' );
        sceneSelector.appendChild( scenesContainer );

        var scenesKeys = Object.keys( Config.scenes );

        for ( var i = 0; i < scenesKeys.length; i ++ ) {

            var elem = document.createElement( 'img' );
            elem.src = 'content/images/' + scenesKeys[ i ] + '.png';
            elem.hashLink = scenesKeys[ i ];
            scenesContainer.appendChild( elem );
            scenesButtons.push( elem );

        }
        controlPanel.appendChild( sceneSelector );

        textButton = document.createElement( 'div' );
        textButton.appendChild( createImgDiv( 'content/images/textButton.png', 'foodButton' ) );
        controlPanel.appendChild( textButton );

        picturesButton = document.createElement( 'div' );
        picturesButton.appendChild( createImgDiv( 'content/images/picturesButton.png', 'foodButton' ) );
        controlPanel.appendChild( picturesButton );

        videoButton = document.createElement( 'div' );
        videoButton.appendChild( createImgDiv( 'content/images/videoButton.png', 'foodButton' ) );
        controlPanel.appendChild( videoButton );

        musicButton = document.createElement( 'div' );
        musicButton.appendChild( createImgDiv( 'content/images/musicButton.png', 'foodButton' ) );
        controlPanel.appendChild( musicButton );

        hidePanelButton = document.createElement( 'div' );
        hidePanelImg = createImgDiv( 'content/images/up.png' );
        hidePanelButton.appendChild( hidePanelImg );
        controlPanel.appendChild( hidePanelButton );

        Config.controlPanel.isVertical = false;
        makeControlPanelHorizontal();
        resize( );

        addControlPanelEventListeners();

    }

    var resize = _.throttle(function ( ) {

        for (var key in Config.onResize) {
            if (Config.onResize.hasOwnProperty(key)) {
                Config.onResize[key]();
            }
        }

        if ( window.innerWidth/window.innerHeight < 1 && Config.controlPanel.isVertical ) {

            makeControlPanelHorizontal();

        } else if ( window.innerWidth/window.innerHeight > 1 && ! Config.controlPanel.isVertical ) {

            makeControlPanelVertical();

        }

    }, 100);

    function createImgDiv(src, className) {
        var img = document.createElement( 'img' );
        img.src = src;
        if (className) img.className = className;
        return img;
    }

    function addControlPanelEventListeners() {

        corner.addEventListener('click', function( e ){
            e.preventDefault();
            if (m.route() !== '/') {
                m.route('/');
            }
        });

        addRoutingListener(textButton, '/blog');
        addRoutingListener(picturesButton, '/pictures');
        addRoutingListener(videoButton, '/video');
        addRoutingListener(musicButton, '/music');

        scenesButtons.forEach( function( b ) {
            b.addEventListener('click', function( e ){

                e.preventDefault();

                if ( e.srcElement.hashLink === Config.defaultScene ) {
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

        window.addEventListener( 'resize', resize );

    }

     function addRoutingListener(button, routeTo){
        button.addEventListener('click', function( e ){
            e.preventDefault();
            if ( Config.currentScene && Config.currentScene.dispose ) {
                Config.currentScene.dispose();
            }
            Config.currentScene = null;
            window.location.hash = '-';
            Config.currentScene = '-1';
            m.route(routeTo);
        });
    }

     function addHidePanelButtonListener( ) {
        hidePanelButton.addEventListener( 'click', function( ){
            if ( Config.controlPanel.isHidden ) {
                if (  Config.controlPanel.isVertical ) {
                    hidePanelImg.className = 'hidePanelImgVertical';
                    controlPanel.className = 'controlPanelVertical';
                } else {
                    hidePanelImg.className = 'hidePanelImgHorizontal';
                    controlPanel.className = 'controlPanelHorizontal';
                }
                Config.controlPanel.isHidden = false;
            } else {
                if (  Config.controlPanel.isVertical ) {
                    hidePanelImg.className = 'hidePanelImgVerticalHidden';
                    controlPanel.className = 'controlPanelVerticalHidden';
                } else {
                    hidePanelImg.className = 'hidePanelImgHorizontalHidden';
                    controlPanel.className = 'controlPanelHorizontalHidden';
                }
                Config.controlPanel.isHidden = true;
            }
        });

    }

    module.exports = createControlPanel;

}());