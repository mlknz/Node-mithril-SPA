/**
 * Created by mlkn on 23.04.2016.
 */
(function() {
    var Config = require( './../../config' );

    'use strict';

    var controlPanel, corner, sceneSelector, textButton, earFoodButton, eyeFoodButton, hidePanelButton, hidePanelImg;

    var makeItVertical = false;
    var makeItHorizontal = false;

    var makeControlPanelHorizontal = function() {

        controlPanel.style.height = '20vw';
        controlPanel.style.width = '100%';
        controlPanel.style.right = '0';
        controlPanel.style.top = Config.controlPanel.isHidden ? -Config.controlPanel.offset + 'vw' : '0';

        corner.style.height = '15vw';
        corner.style.width = '15vw';

        sceneSelector.style.height = '15vw';
        sceneSelector.style.width = '55vw';
        sceneSelector.style.top = '0';
        sceneSelector.style.right = '15vw';

        textButton.style.height = '15vw';
        textButton.style.width = '10vw';
        textButton.style.top = '0';
        textButton.style.right = '70vw';

        earFoodButton.style.height = '15vw';
        earFoodButton.style.width = '10vw';
        earFoodButton.style.top = '0';
        earFoodButton.style.right = '80vw';

        eyeFoodButton.style.height = '15vw';
        eyeFoodButton.style.width = '10vw';
        eyeFoodButton.style.top = '0';
        eyeFoodButton.style.right = '90vw';

        hidePanelButton.style.width = '100vw';
        hidePanelButton.style.height = '5vw';

        hidePanelImg.setAttribute("height", "100%");
        hidePanelImg.setAttribute("width", "");
        hidePanelImg.style.left = "46%";
        hidePanelImg.style.top = "0";
        hidePanelImg.style.transform =  Config.controlPanel.isHidden ? "rotate(180deg)" : "rotate(0deg)";

        Config.controlPanel.isVertical = false;

    };

    var makeControlPanelVertical = function() {

        controlPanel.style.height = '100%';
        controlPanel.style.width = '20vh';
        controlPanel.style.right = Config.controlPanel.isHidden ? -Config.controlPanel.offset + 'vh' : '0';;
        controlPanel.style.top = '0';

        corner.style.height = '15vh';
        corner.style.width = '15vh';

        sceneSelector.style.height = '55vh';
        sceneSelector.style.width = '15vh';
        sceneSelector.style.top = '15vh';
        sceneSelector.style.right = '0';

        textButton.style.height = '10vh';
        textButton.style.width = '15vh';
        textButton.style.top = '70vh';
        textButton.style.right = '0';

        earFoodButton.style.height = '10vh';
        earFoodButton.style.width = '15vh';
        earFoodButton.style.top = '80vh';
        earFoodButton.style.right = '0';

        eyeFoodButton.style.height = '10vh';
        eyeFoodButton.style.width = '15vh';
        eyeFoodButton.style.top = '90vh';
        eyeFoodButton.style.right = '0';

        hidePanelButton.style.width = '5vh';
        hidePanelButton.style.height = '100vh';

        hidePanelImg.setAttribute("height", "");
        hidePanelImg.setAttribute("width", "100%");
        hidePanelImg.style.left = "0";
        hidePanelImg.style.top = "46%";
        hidePanelImg.style.transform = Config.controlPanel.isHidden ? "rotate(-90deg)" : "rotate(90deg)";

        Config.controlPanel.isVertical = true;

    };

    var resize = function (e) {

        if ( window.innerWidth/window.innerHeight < 1 && Config.controlPanel.isVertical ) {

            makeItHorizontal = true;

        } else if ( window.innerWidth/window.innerHeight > 1 && ! Config.controlPanel.isVertical ) {

            makeItVertical = true;

        }

    };

    module.exports = {

        corner: function( element, isInitialized ){

            if ( isInitialized ) return;
            controlPanel = element.parentElement;
            corner = element;
            corner.style.cursor = 'pointer';

            corner.addEventListener( 'mouseover', function( e ){
                corner.style.backgroundColor = '#884455';
            });
            corner.addEventListener( 'mouseout', function( e ){
                corner.style.backgroundColor = '#773344';
            });

        },

        sceneSelector: function( element, isInitialized ){

            if ( isInitialized ) return;
            sceneSelector = element;

        },

        textButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            textButton = element;
            textButton.style.cursor = 'pointer';

            var elem = document.createElement("img");
            elem.src = 'content/images/testImage.png';
            // elem.setAttribute("height", "50%");
            elem.setAttribute("width", "50%");
            elem.style.position =  "absolute";
            elem.style.left = "25%";
            elem.style.top = "13%";
            textButton.appendChild( elem );

            textButton.addEventListener('mouseover', function( e ){
                textButton.style.backgroundColor = '#337799';
                elem.style.opacity = "0.5";
            });
            textButton.addEventListener('mouseout', function( e ){
                textButton.style.backgroundColor = '#226688';
                elem.style.opacity = "1.0";
            });
            textButton.addEventListener('click', function( e ){
                e.preventDefault();
                textButton.style.backgroundColor = '#114466';
                elem.style.opacity = "0.2";
                window.location.href = '/about';
            });


        },

        earFoodButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            earFoodButton = element;
            earFoodButton.style.cursor = 'pointer';

            earFoodButton.addEventListener( 'mouseover', function( e ){
                earFoodButton.style.backgroundColor = '#33AA99';
            });
            earFoodButton.addEventListener( 'mouseout', function( e ){
                earFoodButton.style.backgroundColor = '#229988';
            });

        },

        eyeFoodButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            eyeFoodButton = element;
            eyeFoodButton.style.cursor = 'pointer';

            eyeFoodButton.addEventListener('mouseover', function( e ){
                eyeFoodButton.style.backgroundColor = '#33dd99';
            });
            eyeFoodButton.addEventListener('mouseout', function( e ){
                eyeFoodButton.style.backgroundColor = '#22cc88';
            });

            makeControlPanelHorizontal();
            resize( {} );
            window.addEventListener( 'resize', resize );
        },

        hidePanelButton: function( element, isInitialized ) {

            if ( isInitialized ) return;
            hidePanelButton = element;
            hidePanelButton.style.cursor = 'pointer';

            hidePanelButton.addEventListener( 'click', function( e ){
                if ( !Config.controlPanel.isMoving ) {
                    Config.controlPanel.isMoving = true;
                }
            });
            hidePanelButton.addEventListener('mouseover', function(e){
                hidePanelButton.style.backgroundColor = '#992233';
                hidePanelImg.style.opacity = "1.0";
            });
            hidePanelButton.addEventListener('mouseout', function(e){
                hidePanelButton.style.backgroundColor = '#AA3344';
                hidePanelImg.style.opacity = "0.7";
            });

            hidePanelImg = document.createElement("img");
            hidePanelImg.src = 'content/images/up.png';
            hidePanelImg.style.position =  "absolute";
            hidePanelImg.style.opacity = "0.7";
            hidePanelImg.style.transform = "rotate(90deg)";
            hidePanelButton.appendChild(hidePanelImg);

        },

        update: function(dt) {

            if (makeItHorizontal && !Config.controlPanel.isMoving) {
                makeItHorizontal = false;
                makeControlPanelHorizontal();
            }

            if (makeItVertical && !Config.controlPanel.isMoving) {
                makeItVertical = false;
                makeControlPanelVertical();
            }

            if ( Config.controlPanel.isMoving ) {
                if ( !Config.controlPanel.isHidden ) {

                    Config.controlPanel.offset += Config.controlPanel.speed * dt / 1000;

                } else {

                    Config.controlPanel.offset -= Config.controlPanel.speed * dt / 1000;

                }
                if ( Config.controlPanel.offset > Config.controlPanel.maxOffset ) {

                    Config.controlPanel.offset = Config.controlPanel.maxOffset;
                    Config.controlPanel.isHidden = true;
                    Config.controlPanel.isMoving = false;
                    Config.controlPanel.endedMovement = true;

                } else if ( Config.controlPanel.offset < 0 ) {

                    Config.controlPanel.offset = 0;
                    Config.controlPanel.isHidden = false;
                    Config.controlPanel.isMoving = false;
                    Config.controlPanel.endedMovement = true;

                }

                if ( Config.controlPanel.isVertical ) {

                    controlPanel.style.right = -Config.controlPanel.offset + 'vh';
                    hidePanelImg.style.transform = "rotate(" + ( 0.5-Config.controlPanel.offset / Config.controlPanel.maxOffset ) * 180 + "deg)";

                } else {

                    controlPanel.style.top = -Config.controlPanel.offset + 'vw';
                    hidePanelImg.style.transform = "rotate(" + ( Config.controlPanel.offset / Config.controlPanel.maxOffset ) * 180 + "deg)";

                }
            }
        }

    };

}());