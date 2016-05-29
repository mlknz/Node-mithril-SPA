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

    var makeControlPanelHorizontal = function() {

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

    };

    var makeControlPanelVertical = function() {

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

    };

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

    module.exports = {

        corner: function( element, isInitialized ){

            if ( isInitialized ) return;
            controlPanel = element.parentElement;
            corner = element;

            corner.addEventListener('click', function( e ){
                e.preventDefault();
                if (m.route() !== '/') {
                    m.route('/');
                }

            });

        },

        sceneSelector: function( element, isInitialized ){

            if ( isInitialized ) return;
            sceneSelector = element;

            scenesContainer = document.createElement( 'div' );
            sceneSelector.appendChild( scenesContainer );

            var scenesKeys = Object.keys( Config.scenes );

            for ( var i = 0; i < scenesKeys.length; i ++ ) {

                var elem = document.createElement( 'img' );
                elem.src = 'content/images/' + scenesKeys[ i ] + '.png';
                elem.hashLink = scenesKeys[ i ];
                scenesContainer.appendChild( elem );
                scenesButtons.push( elem );

                elem.addEventListener('click', function( e ){

                    e.preventDefault();
                    e.srcElement.style.opacity = "0.2";

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
            }

        },

        textButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            textButton = element;

            var elem = document.createElement("img");
            elem.src = 'content/images/textButton.png';
            elem.className = 'foodButton';
            textButton.appendChild( elem );

            textButton.addEventListener('click', function( e ){
                e.preventDefault();
                m.route('/blog');
            });

        },

        picturesButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            picturesButton = element;

            var elem = document.createElement("img");
            elem.src = 'content/images/picturesButton.png';
            elem.className = 'foodButton';
            picturesButton.appendChild( elem );

            picturesButton.addEventListener('click', function( e ){
                e.preventDefault();
                window.location.hash = '-';
                Config.currentScene = '-1';
                m.route('/pictures');
            });
        },

        videoButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            videoButton = element;

            var elem = document.createElement("img");
            elem.src = 'content/images/videoButton.png';
            elem.className = 'foodButton';
            videoButton.appendChild( elem );

            videoButton.addEventListener('click', function( e ){
                e.preventDefault();
                window.location.hash = '-';
                Config.currentScene = '-1';
                m.route('/video');
            });

        },

        musicButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            musicButton = element;

            var elem = document.createElement("img");
            elem.src = 'content/images/musicButton.png';
            elem.className = 'foodButton';
            musicButton.appendChild( elem );

            musicButton.addEventListener('click', function( e ){
                e.preventDefault();
                window.location.hash = '-';
                Config.currentScene = '-1';
                m.route('/music');
            });

            Config.controlPanel.isVertical = false;
            makeControlPanelHorizontal( );
            resize( );
            window.addEventListener( 'resize', resize );
        },

        hidePanelButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            hidePanelButton = element;

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

            hidePanelImg = document.createElement( "img" );
            hidePanelImg.src = 'content/images/up.png';
            hidePanelButton.appendChild( hidePanelImg );

        }

    };
}());