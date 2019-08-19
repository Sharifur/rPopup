/**
 * Plugin Name: rVideoPlayer
 *  Author : Sharifur Rahman
 *  A lightwet jquery image and video popup plugin
 *  */

(function($) {
    "use strict";

    $.fn.rVideoPlayer = function(options) {
        options = $.extend({
            autoplay: false,
        }, options);

        return this.each(function(index, value) {
            var $this = $(this);
            var intervalFunc;
            var imgsrc = $this.attr('data-videoSource');
            var embedUrl = 'https://www.youtube.com/embed/';
            var autoplay = options.autoplay ? 1 : 0;
            if (/(?:.mp4|.MOV|.avi|.AVI|.FLV|.MKV )/g.test(imgsrc)) {
                var markup = `<div id="rvideo__player" class="rvideo__player"><video class="rpalyer__video"><source src="${imgsrc}"></video>
                        <div class="rvideo__player__thumb" style="background-image:url(http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg)"><span class="rplayer__thumb__btn"></span></div>
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
            $this.append(markup);
            $this.find('.rvideo__player__thumb').addClass('active');

            $('#rvideo__player').bind('contextmenu', function() {
                return false;
            });
            var video = document.querySelector('.rpalyer__video');
            if (video != null) {
                var currentTime = video.currentTime;
                var duration = video.duration;
                if (options.autoplay) {
                    video.play();
                    playHostedVideo($('.rvideo_player_btn, .rpalyer__video'));
                }
                video.onloadedmetadata = function() {
                    var minutes = parseInt(video.duration / 60, 10);
                    var seconds = video.duration % 60;
                    var videoDuration = minutes + ':' + Math.floor(seconds);
                    $('.rvideo_player_duration').text(videoDuration);
                }

                $('.rvideo_player_btn, .rpalyer__video').click(function(e) {
                    e.preventDefault();
                    var el = $(this);
                    playHostedVideo(el);
                    $this.find('.rvideo__player__thumb').removeClass('active');
                });

                function rplayerTime() {
                    var minutes = parseInt(video.currentTime / 60, 10);
                    var seconds = video.currentTime % 60;
                    seconds = Math.floor(seconds);
                    var videoDuration = minutes + ':' + ('0' + seconds).slice(-2);
                    $('.rvideo_player_start_time').text(videoDuration);
                }

                $('.rvideo_player__progress_wrap').on('click', function(e) {
                    var el = $(this);
                    var currentPlayerTime = (e.offsetX / el.width()) * video.duration;
                    video.currentTime = currentPlayerTime;
                    var percent = video.currentTime / video.duration * 100;
                    rplayerTime();
                    rplayerProgress(percent);
                });

                $('.rvideo_player_volume_range').on('change', function() {
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

                    var el = $('.rvideo_player_btn');
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
                $('.rvideo_player__progress_active').css({ width: percent + '%' })
            }



        });

    }


})(jQuery);