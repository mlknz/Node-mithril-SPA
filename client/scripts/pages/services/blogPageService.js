/**
 * Created by mlkn on 18.05.2016.
 */

(function(){
    var Config = require( './../../config' );
    var headerText = 'Blog';

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

        Config.controlPanel.onBecomingHorizontal['blogPage'] = function () {
            header.style.height = '40vw';
            header.innerHTML = '<br>' + headerText;
        };
        Config.controlPanel.onBecomingVertical['blogPage'] = function () {
            header.style.height = '20vw';
            header.innerHTML = headerText;
        };

        var content = document.createElement( 'div' );
        content.innerHTML = '<br>' + '<br>' + '&nbsp&nbsp&nbsp&nbspProducing superfine carbon dioxide since 1992.';
        pageContainer.appendChild( content );

    }

}());