(function($) {
    'use strict';

    $('.image-popup').rPopup({
        'image': true
    });

    $('.youtube-popup').rPopup({
        'video': {
            embed: true,
            autoplay: true,
        },
    });
    $('.hosted-popup').rPopup({
        'video': {
            embed: true,
            autoplay: true,
        },
    });



})(jQuery);