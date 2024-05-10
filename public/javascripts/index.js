$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        // autoplayTimeout: 20000,
        autoplayHoverPause: true,
    });

    $(".previous").click(function() {
        $(".owl-carousel").trigger("prev.owl.carousel");
    });

    $(".next").click(function() {
        $(".owl-carousel").trigger("next.owl.carousel");
    });

    // $(document).on("click", ".previous", function() {
    //     if (flvjs.isSupported()) {
    //         var videoElement = document.getElementById('videoPlayer');
    //         var flvPlayer = flvjs.createPlayer({
    //           type: 'flv',
    //           url: 'http://localhost:8080/live/livestream.flv' // Cambia la URL según tu configuración
    //         });
    //         flvPlayer.attachMediaElement(videoElement);
    //         flvPlayer.load();
    //         flvPlayer.play();
    //       } else {
    //         console.error('flv.js no es soportado en este navegador.');
    //       }
    // });

    // $(document).on("click", ".previous", function() {
    //     // reproduces http://localhost:8080/live/livestream.flv
    //     var videoElement = document.getElementById('videoPlayer');
    //     videoElement.src = 'http://localhost:8080/live/livestream.flv';
    //     videoElement.play();
    //     videoElement.controls = true;
    //     videoElement.autoplay = true;
    //     videoElement.muted = true;
    //     videoElement.loop = true;
    // });
    
    // $(document).on("click", ".previous", function() {
    //     var player = videojs('videoPlayer', {
    //         controls: true,
    //         autoplay: true,
    //         preload: 'auto'
    //     });

    //     // Agrega la fuente del video
    //     player.src({
    //         src: 'rtmp://localhost:1935/live', // Reemplaza con la URL correcta de tu servidor SRS
    //         type: 'rtmp/mp4'
    //     });
        
    //     // Requerido para reproducir RTMP en video.js
    //     player.tech_.hls.xhr.beforeRequest = function(options) {
    //         options.uri = options.uri.replace("http://", "ws://");
    //         options.uri = options.uri.replace("https://", "wss://");
    //     };
    // });

    // $(document).on("click", ".previous", function() {
    //     var player = new MediaElementPlayer('#videoPlayer', {
    //         features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen'],
    //         success: function(mediaElement, originalNode, instance) {
    //             mediaElement.setSrc('http://localhost:8080/live/livestream.flv');
    //             mediaElement.load();
    //             mediaElement.play();
    //         }
    //     });
    // });

    $(document).on("click", ".previous", function() {
            var video = document.getElementById('videoPlayer');
            video.src = 'http://localhost:8080/live/stream.flv'; // Reemplaza con la URL correcta de tu servidor FLV
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
    });
});