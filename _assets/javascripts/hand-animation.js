(function () {
  'use strict';

  var incrementLocalStorageCounter = function (counterLabel) {
    var currentValue = parseInt(localStorage.getItem(counterLabel), 10) || 0;
    return localStorage.setItem(counterLabel, currentValue+1);
  };

  var playHandAnimation = function () {
    var baseHeight;
    if ($(window).height() > 767) {
      baseHeight = 767;
    } else {
      baseHeight = $(window).height();
    }

    var anim = new TimelineLite();
    anim.append([
      TweenLite.to('#hand-over-phone', 2, { delay: 0.5, opacity: 1 }),
      TweenLite.to('#logo', 2, { delay: 0.5, opacity: 1 }),
    ]);
    anim.append([
      TweenLite.from('#hand-over-phone', 3, {
        ease: Cubic.easeInOut,
        y: -1 * baseHeight * 0.3911342894
      }),
      TweenLite.from('#logo', 3, { ease: Cubic.easeInOut, y: -1 * baseHeight * 0.4563233377 })
    ]);
    anim.staggerTo(['#tagline', '#logline'], 0.75, { delay: 0.25, opacity: 1}, 1);
    anim.staggerTo(['#home-video-play-button', '#navbar', '#latest', '#pre-order', '#footer'], 0.75, { delay: 1, opacity: 1 }, 0.25);
    return anim;
  };

  window.onload = function () {
    if ($('body').hasClass('animating')) {
      playHandAnimation();
      incrementLocalStorageCounter('homePageAnimationPlayCount');
    }
  };
})();
