'use strict';

var Config = require('./../../config');
var videosDescriptions = require('./../../../content/text/videosDescriptions.js');

var headerText = 'Videos';
var videos = [];
var activeVideos = [];
var descriptions = [];

var computeVideoSize = function () {

    var w = window.innerWidth, h;
    w = w * 0.8 * 0.75;

    if (!Config.controlPanel.isVertical) {
        w = window.innerWidth;
    } else if (w > Config.maxVideoWidth) {
        w = Config.maxVideoWidth;

    } else if (w < Config.minVideoWidth) {
        w = Config.minVideoWidth;
    }

    h = w / Config.videoSize.ratio;

    Config.videoSize.x = w;
    Config.videoSize.y = h;

    videos.forEach(function (a) {
        a.style.width = Config.videoSize.x + 'px';
        a.style.height = Config.videoSize.y + 'px';
        a.style.marginLeft = 50 - 50 * Config.videoSize.x / window.innerWidth + 'vw';
    });
    descriptions.forEach(function (a) {
        a.style.width = Config.videoSize.x + 'px';
        a.style.marginLeft = 50 - 50 * Config.videoSize.x / window.innerWidth + 'vw';
    });
    activeVideos.forEach(function (a) {
        a.style.width = Config.videoSize.x + 'px';
        a.style.height = Config.videoSize.y + 'px';
    });

};

module.exports = function (element, isInitialized) {

    if (isInitialized) return;

    if (!Config.iframeAPILoaded) {

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        document.head.appendChild(tag);

        window.onYouTubePlayerAPIReady = function () {
            Config.iframeAPILoaded = true;
        };

    }

    var pageContainer = document.createElement('div');
    pageContainer.className = 'pageContainer';
    element.appendChild(pageContainer);

    var header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = Config.controlPanel.isVertical ? headerText : '<br>' + headerText;
    header.style.height = Config.controlPanel.isVertical ? '20vw' : '40vw';
    pageContainer.appendChild(header);

    Config.controlPanel.onBecomingHorizontal['videoPage'] = function () {
        header.style.height = '40vw';
        header.innerHTML = '<br>' + headerText;
    };
    Config.controlPanel.onBecomingVertical['videoPage'] = function () {
        header.style.height = '20vw';
        header.innerHTML = headerText;
    };
    Config.onResize['videoPage'] = computeVideoSize;

    computeVideoSize();

    var videosInfo = Config.videos;

    for (var i = 0; i < videosInfo.length; i++) {

        var youtube = document.createElement('div');
        youtube.className = 'youtube';
        youtube.id = videosInfo[i].id;
        youtube.style.width = Config.videoSize.x + 'px';
        youtube.style.height = Config.videoSize.y + 'px';
        youtube.style.marginTop = '10vh';
        youtube.style.marginLeft = 50 - 50 * Config.videoSize.x / window.innerWidth + 'vw';
        youtube.style.backgroundColor = '#000000';
        youtube.style.backgroundPosition = 'center center';
        youtube.style.backgroundRepeat = 'no-repeat';
        youtube.style.backgroundSize = 'contain';
        youtube.style.backgroundImage = 'url(' + 'http://i.ytimg.com/vi/'
            + youtube.id + '/hqdefault.jpg' + ')';
        pageContainer.appendChild(youtube);

        videos.push(youtube);

        var description = document.createElement('div');
        description.className = 'videoDescription';
        description.style.width = Config.videoSize.x + 'px';
        description.style.backgroundColor = '#aa2222';
        description.style.marginLeft = 50 - 50 * Config.videoSize.x / window.innerWidth + 'vw';
        description.innerHTML = videosDescriptions[videosInfo[i].name] || videosDescriptions['default'];
        pageContainer.appendChild(description);

        descriptions.push(description);

        var playButton = document.createElement("div");
        playButton.className = 'playVideoButton';
        youtube.appendChild(playButton);

        youtube.onclick = function () {

            var iframe = document.createElement("iframe");
            iframe.setAttribute("src",
                "https://www.youtube.com/embed/" + this.id
                + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1");

            iframe.style.width = this.style.width;
            iframe.style.height = this.style.height;

            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            this.appendChild(iframe);
            activeVideos.push(iframe);

        };

    }

};