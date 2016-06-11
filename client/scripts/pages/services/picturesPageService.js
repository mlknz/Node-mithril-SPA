/**
 * Created by mlkn on 18.05.2016.
 */

(function(){
    var Config = require( './../../config' );
    var _ = require('lodash');
    var picturesDescriptions = require('./../../../content/text/picturesDescriptions.js');

    var headerText = 'Pictures',
        pageContainer,
        dimmer,
        bigImageItself,
        imageDescription,
        loadMoreFooter,
        currentShownPicture,
        currentLoadedBatch = 0,
        batchContainers = [],
        totalBatches = 1;

    var scrollHandler = _.throttle( function() {
        if ( currentLoadedBatch + 1 < totalBatches && pageContainer.scrollHeight === pageContainer.scrollTop + window.innerHeight ) {
            loadBatch( ++currentLoadedBatch );
        }
    }, 250 );

    var loadBatch = function( offset ){

        var batchContainer = document.createElement( 'div' );
        batchContainer.className = Config.controlPanel.isVertical ? 'imagesBatchContainerHorizontal' : 'imagesBatchContainerVertical';
        batchContainers.push( batchContainer );
        var maxExistentMember = Math.min( Config.picturesPerLoad * ( offset + 1 ), Config.pictures.length );

        for ( var i = Config.picturesPerLoad * offset; i < maxExistentMember; i++ ) {
            var image = document.createElement('img');
            image.className = 'imagePreview';
            image.setAttribute( 'src', Config.pictures[i].previewSrc );
            image.setAttribute( 'data-myId', i );
            image.onclick = function() {
                currentShownPicture = this.getAttribute( 'data-myId' );
                dimmer.style.display = 'block';
                bigImageItself.src = Config.pictures[ currentShownPicture ].src;
                imageDescription.innerHTML = picturesDescriptions[ Config.pictures[ currentShownPicture ].name ] || picturesDescriptions[ 'default' ];
            };
            batchContainer.appendChild( image );
        }

        pageContainer.insertBefore( batchContainer, loadMoreFooter );
        if ( offset === totalBatches - 1 ) {
            pageContainer.removeChild( loadMoreFooter );
        }

    };

    module.exports = function( element, isInitialized ) {

        if ( isInitialized ) return;

        pageContainer = document.createElement( 'div' );
        pageContainer.className = 'pageContainer';
        element.appendChild( pageContainer );

        var header = document.createElement( 'div' );
        header.className = 'header';
        header.innerHTML = Config.controlPanel.isVertical ? headerText : '<br>' + headerText;
        header.style.height = Config.controlPanel.isVertical ? '20vw' : '40vw';
        pageContainer.appendChild( header );

        loadMoreFooter = document.createElement( 'div' );
        loadMoreFooter.className = 'loadMoreFooter';
        loadMoreFooter.innerHTML = '...';
        loadMoreFooter.onclick = function () {
            if ( currentLoadedBatch + 1 < totalBatches ) {
                loadBatch( ++currentLoadedBatch );
            }
        };
        pageContainer.appendChild( loadMoreFooter );

        totalBatches = Math.ceil( Config.pictures.length / Config.picturesPerLoad );
        currentLoadedBatch = 0;
        loadBatch( currentLoadedBatch );

        dimmer = document.createElement( 'div' );
        dimmer.className = 'dimmer';
        pageContainer.appendChild( dimmer );

        var detailedImageContainer = document.createElement( 'div' );
        detailedImageContainer.className = Config.controlPanel.isVertical ? 'detailedImageContainerHorizontal' : 'detailedImageContainerVertical';
        dimmer.appendChild( detailedImageContainer );

        imageDescription = document.createElement( 'div' );
        imageDescription.className = 'imageDescription';
        detailedImageContainer.appendChild( imageDescription );

        bigImageItself = document.createElement( 'img' );
        bigImageItself.className = 'bigImageItself';
        detailedImageContainer.appendChild( bigImageItself );

        var nextImageButton = document.createElement( 'div' );
        nextImageButton.className = 'nextImageButton';
        nextImageButton.onclick = function() {
            currentShownPicture++;
            if ( currentShownPicture > Config.pictures.length - 1 ) currentShownPicture = Config.pictures.length - 1;
            bigImageItself.src = Config.pictures[ currentShownPicture ].src;
            imageDescription.innerHTML = picturesDescriptions[ Config.pictures[ currentShownPicture ].name ] || picturesDescriptions[ 'default' ];
        };
        detailedImageContainer.appendChild( nextImageButton );

        var prevImageButton = document.createElement( 'div' );
        prevImageButton.className = 'prevImageButton';
        prevImageButton.onclick = function() {
            currentShownPicture--;
            if ( currentShownPicture < 0 ) currentShownPicture = 0;
            bigImageItself.src = Config.pictures[ currentShownPicture ].src;
            imageDescription.innerHTML = picturesDescriptions[ Config.pictures[ currentShownPicture ].name ] || picturesDescriptions[ 'default' ];
        };
        detailedImageContainer.appendChild( prevImageButton );

        var closePictureButton = document.createElement( 'div' );
        closePictureButton.className = 'closePictureButton';
        closePictureButton.onclick = function() {
            dimmer.style.display = 'none';
        };
        detailedImageContainer.appendChild( closePictureButton );

        Config.controlPanel.onBecomingHorizontal[ 'picturesPage' ] = function () {
            header.style.height = '40vw';
            header.innerHTML = '<br>' + headerText;
            detailedImageContainer.className = 'detailedImageContainerVertical';
            batchContainers.forEach( function( cont ) {
                cont.className = 'imagesBatchContainerVertical';
            });
        };
        Config.controlPanel.onBecomingVertical[ 'picturesPage' ] = function () {
            header.style.height = '20vw';
            header.innerHTML = headerText;

            detailedImageContainer.className = 'detailedImageContainerHorizontal';
            batchContainers.forEach( function( cont ) {
                cont.className = 'imagesBatchContainerHorizontal';
            });
        };

        pageContainer.onscroll = scrollHandler;
    }

}());