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
        earFoodButton,
        eyeFoodButton,
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
        earFoodButton.className = 'earFoodButtonHorizontal';
        eyeFoodButton.className = 'eyeFoodButtonHorizontal';

        scenesButtons.forEach( function( b ) {
            b.className = 'sceneButtonHorizontal';
        });

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
        earFoodButton.className = 'earFoodButtonVertical';
        eyeFoodButton.className = 'eyeFoodButtonVertical';

        scenesButtons.forEach( function( b ) {
            b.className = 'sceneButtonVertical';
        });

    };

    var resize = _.throttle(function ( ) {

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

            corner.addEventListener( 'mouseover', function( ){
                corner.style.backgroundColor = '#884455';
            });
            corner.addEventListener( 'mouseout', function( ){
                corner.style.backgroundColor = '#773344';
            });
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

            scenesContainer = document.createElement( "div" );
            sceneSelector.appendChild( scenesContainer );

            var scenesKeys = Object.keys( Config.scenes );

            for ( var i = 0; i < scenesKeys.length; i ++ ) {

                var elem = document.createElement("img");
                elem.src = 'content/images/' + scenesKeys[ i ] + '.png';
                elem.hashLink = scenesKeys[ i ];

                scenesContainer.appendChild( elem );
                scenesButtons.push( elem );

                elem.addEventListener('mouseover', function( e ){
                    e.srcElement.style.opacity = "0.5";
                });
                elem.addEventListener('mouseout', function( e ){
                    e.srcElement.style.opacity = "1.0";
                });
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

            textButton.addEventListener('mouseover', function( ){
                textButton.style.backgroundColor = '#337799';
                elem.style.opacity = "0.5";
            });
            textButton.addEventListener('mouseout', function( ){
                textButton.style.backgroundColor = '#226688';
                elem.style.opacity = "1.0";
            });
            textButton.addEventListener('click', function( e ){
                e.preventDefault();
                textButton.style.backgroundColor = '#114466';
                elem.style.opacity = "0.2";

                m.route('/blog');
            });

        },

        eyeFoodButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            eyeFoodButton = element;

            var elem = document.createElement("img");
            elem.src = 'content/images/eyeFoodButton.png';
            elem.className = 'foodButton';
            eyeFoodButton.appendChild( elem );

            eyeFoodButton.addEventListener( 'mouseover', function( ){
                eyeFoodButton.style.backgroundColor = '#33dd99';
                elem.style.opacity = "0.5";
            });
            eyeFoodButton.addEventListener( 'mouseout', function( ){
                eyeFoodButton.style.backgroundColor = '#22cc88';
                elem.style.opacity = "1.0";
            });
            eyeFoodButton.addEventListener('click', function( e ){
                e.preventDefault();
                textButton.style.backgroundColor = '#114466';
                elem.style.opacity = "0.2";

                window.location.hash = '-';
                Config.currentScene = '-1';
                m.route('/pictures');
            });
        },

        earFoodButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            earFoodButton = element;

            var elem = document.createElement("img");
            elem.src = 'content/images/earFoodButton.png';
            elem.className = 'foodButton';
            earFoodButton.appendChild( elem );

            earFoodButton.addEventListener( 'mouseover', function( ){
                earFoodButton.style.backgroundColor = '#33AA99';
                elem.style.opacity = "0.5";
            });
            earFoodButton.addEventListener( 'mouseout', function( ){
                earFoodButton.style.backgroundColor = '#229988';
                elem.style.opacity = "1.0";
            });
            earFoodButton.addEventListener('click', function( e ){
                e.preventDefault();
                textButton.style.backgroundColor = '#114466';
                elem.style.opacity = "0.2";

                window.location.hash = '-';
                Config.currentScene = '-1';
                m.route('/music');
            });

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
            hidePanelButton.addEventListener( 'mouseover', function( ){
                hidePanelButton.style.backgroundColor = '#992233';
                hidePanelImg.style.opacity = "1.0";
            });
            hidePanelButton.addEventListener( 'mouseout', function( ){
                hidePanelButton.style.backgroundColor = '#AA3344';
                hidePanelImg.style.opacity = "0.7";
            });

            hidePanelImg = document.createElement( "img" );
            hidePanelImg.src = 'content/images/up.png';
            hidePanelButton.appendChild( hidePanelImg );

        }

    };
}());