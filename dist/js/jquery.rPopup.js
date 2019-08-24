(function($) {
    "use strict";
    $.fn.rPopup = function(options) {
        options = $.extend({
            'video': {
                embed: false,
                autoplay: true,
            },
            'image': false
        }, options);
        return this.each(function(index, value) {
            var $this = $(this);
            var video = options.video ? 'video' : '';
            var image = options.image ? 'image' : '';
            var intervalFunc;
            $this.on('click', function(e) {
                e.preventDefault();
                $('body').append('<div class="rpopup-overlay"></div>');
                var overlay = $('.rpopup-overlay');
                if (options.image) {
                    var imgsrc = $this.attr('href');
                    var markup = `<div class="img-wrapper"><img src="${imgsrc}" alt=""/></div>`;
                }
                if (options.video.embed) {
                    var imgsrc = $this.attr('href');
                    var embedUrl = 'https://www.youtube.com/embed/';
                    var autoplay = options.video.autoplay ? 1 : 0;
                    if (/(?:.mp4|.MOV|.avi|.AVI|.FLV|.MKV )/g.test(imgsrc)) {
                        var markup = `<div id="rpopup_video__player" class="rpopup_video__player"><video class="rpopup_video__Player"><source src="${imgsrc}"></video>
                        <div class="rvideo_player__extra_wrap">
                            <div class="rvideo_player__progress_wrap">
                                    <span class="rvideo_player__progress_active"></span>
                                </div>
                                <div class="rvideo_player__controls_wrap">
                                    <div class="rvideo_player__buttons">
                                        <span class="rvideo_player_btn rvideo_play"></span>
                                        <div class="rvideo_player_time_wrap">
                                            <span class="rvideo_player_start_time">0:00</span>/
                                            <span class="rvideo_player_duration">2:00</span>
                                        </div>
                                    </div>
                                    <div class="rvideo_player_volume_wrap">
                                        <span class="rvideo_player_volume_icon"></span>
                                        <div class="rvideo_player_volume_progress_wrap">
                                            <input type="range" class="rvideo_player_volume_range" min="0" max="100" step="10" value="10">
                                        </div>
                                    </div>
                                </div> 
                            </div>
                    </div>`;
                    }
                    if (/v=([^\s]+)/g.test(imgsrc)) {
                        var findId = /v=([^\s]+)/g.exec(imgsrc);
                        imgsrc = embedUrl + findId[1];
                        var markup = `<iframe id="rpopupIframe" src="${imgsrc}?autoplay=${autoplay}" frameborder="0" allowfullscreen=""></iframe>`;
                    }
                }
                $('body').append(`
                <div class="roppup-modal">
                    <div class="roppup-area">
                        <div class="rpopup-content">
                        <div class="rpopup-preloader active">
                            <div class="sk-circle">
                                <div class="sk-circle1 sk-child"></div>
                                <div class="sk-circle2 sk-child"></div>
                                <div class="sk-circle3 sk-child"></div>
                                <div class="sk-circle4 sk-child"></div>
                                <div class="sk-circle5 sk-child"></div>
                                <div class="sk-circle6 sk-child"></div>
                                <div class="sk-circle7 sk-child"></div>
                                <div class="sk-circle8 sk-child"></div>
                                <div class="sk-circle9 sk-child"></div>
                                <div class="sk-circle10 sk-child"></div>
                                <div class="sk-circle11 sk-child"></div>
                                <div class="sk-circle12 sk-child"></div>
                            </div>
                        </div>  
                        <span class="rpopup-close">X</span>
                            ${markup}
                        </div>
                    </div>
                </div>
                `);
                overlay.addClass('show');
                $('#rpopup_video__player').bind('contextmenu', function() {
                    return false;
                });
                $('.rpopup-content .img-wrapper,.rpopup-content iframe').ready(function() {
                    $('.rpopup-preloader').removeClass('active');
                });
                var video = document.querySelector('.rpopup_video__Player');
                if (video != null) {
                    var currentTime = video.currentTime;
                    var duration = video.duration;
                    if (options.video.autoplay) {
                        video.play();
                        playHostedVideo($('.rvideo_player_btn, .rpopup_video__Player'));
                    }
                    video.onloadedmetadata = function() {
                        var minutes = parseInt(video.duration / 60, 10);
                        var seconds = video.duration % 60;
                        var videoDuration = minutes + ':' + Math.floor(seconds);
                        $('.rvideo_player_duration').text(videoDuration);
                    }
                    $('.rpopup_video__player .rvideo_player_btn, .rpopup_video__Player').click(function(e) {
                        e.preventDefault();
                        var el = $(this);
                        playHostedVideo(el);
                    });

                    function rplayerTime() {
                        var minutes = parseInt(video.currentTime / 60, 10);
                        var seconds = video.currentTime % 60;
                        seconds = Math.floor(seconds);
                        var videoDuration = minutes + ':' + ('0' + seconds).slice(-2);
                        $('.rpopup_video__player .rvideo_player_start_time').text(videoDuration);
                    }
                    $('.rpopup_video__player .rvideo_player__progress_wrap').on('click', function(e) {
                        var el = $(this);
                        var currentPlayerTime = (e.offsetX / el.width()) * video.duration;
                        video.currentTime = currentPlayerTime;
                        var percent = video.currentTime / video.duration * 100;
                        rplayerTime();
                        rplayerProgress(percent);
                    });
                    $('.rpopup_video__player .rvideo_player_volume_range').on('change', function() {
                        var el = $(this);
                        video.volume = el.val() / 100;
                    });

                    function playHostedVideo(el) {
                        if (intervalFunc) {
                            clearInterval(intervalFunc);
                        }
                        intervalFunc = setInterval(function() {
                            var percent = video.currentTime / video.duration * 100;
                            rplayerTime();
                            rplayerProgress(percent);
                        }, 1000);
                        var el = $('.rpopup_video__player .rvideo_player_btn');
                        if (el.hasClass('rvideo_play')) {
                            video.play();
                            el.addClass('rvideo_pause').removeClass('rvideo_play');
                        } else if (el.hasClass('rvideo_pause')) {
                            clearInterval(intervalFunc);
                            video.pause();
                            el.addClass('rvideo_play').removeClass('rvideo_pause');
                        }
                    }
                }

                function rplayerProgress(percent) {
                    $('.rpopup_video__player .rvideo_player__progress_active').css({
                        width: percent + '%'
                    })
                }
            });
        });
    }
    $(document).on('click', '.rpopup-overlay', function(e) {
        $(this).remove();
    });
    $(document).on('click', '.rpopup-close', function(e) {
        $(this).parent().parent().parent().remove();
        $('.rpopup-overlay').remove();
    });
})(jQuery);