/**
 * Created by mlkn on 03.05.2016.
 */

(function(){
    var Config = require( './../../config' );
    var headerText = 'Music';

    var iframe;
    var computeSoundcloudWidgetSize = function() {

        var w = Config.controlPanel.isVertical ? window.innerWidth - window.innerHeight * 0.2 : window.innerWidth;
        iframe.style.width = w + "px";

    };

    module.exports = function(element, isInitialized) {

        if ( isInitialized ) return;

        var pageContainer = document.createElement( 'div' );
        pageContainer.className = 'pageContainer';
        element.appendChild( pageContainer );

        var header = document.createElement( 'div' );
        header.className = 'header';
        header.innerHTML = Config.controlPanel.isVertical ? headerText : '<br>' + headerText;
        header.style.height = Config.controlPanel.isVertical ? '20vw' : '40vw';
        pageContainer.appendChild( header );

        Config.controlPanel.onBecomingHorizontal['musicPage'] = function () {
            header.style.height = '40vw';
            header.innerHTML = '<br>' + headerText;
        };
        Config.controlPanel.onBecomingVertical['musicPage'] = function () {
            header.style.height = '20vw';
            header.innerHTML = headerText;
        };
        Config.onResize['musicPage'] = computeSoundcloudWidgetSize;

        iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "no");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("height", 600);
        iframe.setAttribute("src", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/7739021&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false");
        computeSoundcloudWidgetSize();

        pageContainer.appendChild( iframe );

    }

}());