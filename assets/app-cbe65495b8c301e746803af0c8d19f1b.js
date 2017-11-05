(function () {
  'use strict';

  var onMutation = function (selector, skipCallbackForAttr, callback) {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    $(selector).each(function (i, element) {
      new MutationObserver(function(mutations, observer) {
        if (!_.any(mutations, function (m) { return m.attributeName === skipCallbackForAttr })) {
          callback($(element));
        }
      }).observe(element, {
        subtree: true,
        attributes: true
      });;
    });
  };

  var centerEmbeddedTweets = function () {
    onMutation('.twitter-tweet-wrapper', 'style', function (element) {
      element
        .find('iframe')
        .css('margin', '10px auto');
    });
  };

  var overRideTweetTimelineWidth = function () {
    onMutation('#latest-tweets', 'width', function (element) {
      element
        .find('iframe')
        .attr('width', '100%')
        .css('width', '100%');
    });
  };

  var addRandomIdToElement = function (element) {
    var id = 'element-' + ~~(Math.random() * 99999999);
    $(element).attr('id', id);
    return id;
  };

  var animateSponsorBadge = function () {
    $('#sponsor-badge')
      .delay(600)
      .animate({ opacity: 1 }, 1000);
  };

  var cleanupSponsorList = function (index, _sponsorList) {
    var sponsorList = $(_sponsorList);
    var html = sponsorList.html();
    var correctedString = html
      // replace ', and more.' with '.'
      .replace(/,[^,]*$/, '.')
      // add 'and' before the last sponsor
      .replace(/,([^,]*)$/, function () {
        return ', and ' + arguments[1];
      });
    sponsorList.html(correctedString);
  };

  var cleanupSponsorLists = function () {
    $('.sponsor-list').each(cleanupSponsorList);
  };


  var initializeAnimatedSvgElements = function () {
    var addOffsetAttrToInitializeDrawAfterBottomOfElementIsVisible = function (element) {
      element.attr('data-offset', -1 * element.height() - 15);
    };

    $('svg.animated').each(function (_, el) {
      var element = $(el);
      // Code in _includes/scripts.html sets svg.animated elements to
      // invisible.  The code exists in _includes/scripts.html to
      // prevent a flash of the svg before the code in this block can be executed.
      $(window).load(function () {
        element.css('visibility', 'visible');
      });
      new Vivus(el, {
        delay: 100,
        duration: 180,
        type: 'delayed'
      });
    });
  };

  var initializeVideoPlaceholders = function () {
    $('.video-placeholder').click(replacePlaceholderWithVideo);
  };

  var replacePlaceholderWithVideo = function () {
    var placeholder = $(this);
    placeholder.replaceWith(placeholder.attr('data-embed'));
  };

  var verticallyCenterElements = function () {
    $('.vertically-centered').flexVerticalCenter({
      enable: function () {
        return $(window).width() > 767;
      }
    });
  };

  var initializeMagnificPopup = function () {
    $('.video-play-button-container').each(function(_, _playButtonContainer) {
      var playButtonContainer = $(_playButtonContainer);
      playButtonContainer.magnificPopup({
        items: {
          src: playButtonContainer.attr('data-video-src')
        },
        type: 'iframe'
      });
    });
    $('#home-video-play-button').magnificPopup({
      items: {
        src: 'https://vimeo.com/241264857'
      },
      type: 'iframe'
    });
    $('.product-photo-link').magnificPopup({ type: 'image' });
  };

  $(function () {
    initializeVideoPlaceholders();
    initializeAnimatedSvgElements();
    initializeMagnificPopup();
    verticallyCenterElements();
    animateSponsorBadge();
    cleanupSponsorLists();
    overRideTweetTimelineWidth();
    centerEmbeddedTweets();
  });
}());
