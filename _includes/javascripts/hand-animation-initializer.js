(function () {
  'use strict';

  var animationPlayedMaxTimes = function () {
    return localStorageCounter('homePageAnimationPlayCount') > 2;
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

  var localStorageCounter = function (counterLabel) {
    return parseInt(localStorage.getItem(counterLabel), 10);
  };

  var markPageDirty = function (dirtyBit) {
    dirtyBit.value = '1';
  };

  var queryStringMatchesRegexp = function (regexp) {
    return regexp.test(location.search);
  }
  // Skip animation by adding ?no-animation to the URL
  var isAnimationDisabled = queryStringMatchesRegexp.bind(null, /no-animation/);
  var forceAnimation = queryStringMatchesRegexp.bind(null, /force-animation/);

  if (!forceAnimation() ||
      (backButtonWasUsed() &&
       animationPlayedMaxTimes() &&
       isAnimationDisabled())) {
    document.body.className = '';
  }
})();
