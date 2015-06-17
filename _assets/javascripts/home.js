(function () {
  'use strict';

  var markPageDirty = function (dirtyBit) {
    dirtyBit.value = '1';
  };

  var backButtonWasUsed = function () {
    var dirtyBit = document.getElementById('page-is-dirty');
    if (dirtyBit.value === '1') {
      console.log('back button was used');
      return true;
    }
    console.log('back button not used');
    markPageDirty(dirtyBit);
    return false;
  };

  var incrementLocalStorageCounter = function (counterLabel) {
    var currentValue = parseInt(localStorage.getItem(counterLabel), 10) || 0;
    return localStorage.setItem(counterLabel, currentValue+1);
  };

  var isNotOnHomePage = function () {
    return window.location.pathname !== '/';
  };

  var localStorageCounter = function (counterLabel) {
    return parseInt(localStorage.getItem(counterLabel), 10);
  };

  var queryStringMatchesRegexp = function (regexp) {
    return regexp.test(location.search);
  }
  // Skip animation by adding ?no-animation to the URL
  var isAnimationDisabled = queryStringMatchesRegexp.bind(null, /no-animation/);
  // Hide mockup by adding ?no-mockup to the URL
  var isMockupDisabled = queryStringMatchesRegexp.bind(null, /no-mockup/);

  var animationPlayedMaxTimes = function () {
    return localStorageCounter('homePageAnimationPlayCount') > 2;
  };

  var playHandAnimation = function () {
    var baseHeight;
    if ($(window).height() > 767) {
      baseHeight = 767;
    } else {
      baseHeight = $(window).height();
    }

    var anim = new TimelineLite();
    anim.to('#hand-over-phone', 2, { delay: 0.5, opacity: 1});
    anim.append([
      TweenLite.from('#hand-over-phone', 3, {
        ease: Cubic.easeInOut,
        y: -1 * baseHeight * 0.3911342894,
        onStart: function () { $('#logo').css({ opacity: 1 }); }
      }),
      TweenLite.from('#logo', 3, { ease: Cubic.easeInOut, y: -1 * baseHeight * 0.4563233377 })
    ]);
    anim.staggerTo(['#tagline', '#logline'], 0.75, { delay: 0.25, opacity: 1}, 1);
    anim.staggerTo(['#home-video-play-button', '#navbar', '#latest', '#pre-order', '#footer'], 0.75, { delay: 2, opacity: 1 }, 0.25);
    return anim;
  };

  var skipHandAnimation = function () {
    var animation = playHandAnimation();
    animation.progress(1);
  };

  $(function () {
    if (isMockupDisabled()) {
      $('.mockup').hide();
    }
    $('#home-video-play-button').magnificPopup({
      items: {
        src: 'https://vimeo.com/106228915'
      },
      type: 'iframe'
    });
    $('.product-photo-link').magnificPopup({ type: 'image' });
  });

  $(window).load(function () {
    if (isNotOnHomePage() ||
        backButtonWasUsed() ||
        animationPlayedMaxTimes() ||
        isAnimationDisabled()) {
      skipHandAnimation();
    } else {
      playHandAnimation();
      incrementLocalStorageCounter('homePageAnimationPlayCount');
    }
  });
})();
