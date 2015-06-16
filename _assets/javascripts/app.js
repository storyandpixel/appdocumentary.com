(function () {
  var overRideTweetTimelineWidth = function () {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var latestTweets = $('#latest-tweets');
    new MutationObserver(function(mutations, observer) {
      if (!_.any(mutations, function (m) { return m.attributeName === 'width' })) {
        latestTweets
          .find('iframe')
          .attr('width', '100%')
          .css('width', '100%');
      }
    }).observe(latestTweets.get(0), {
      subtree: true,
      attributes: true
    });;
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
      addOffsetAttrToInitializeDrawAfterBottomOfElementIsVisible(element);
      var id = element.attr('id') || addRandomIdToElement(element);
      var walkway = new Walkway({
        selector: '#' + id,
        duration: 3500
      });
      element.one('inview', walkway.draw.bind(walkway));
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

  $(function () {
    initializeVideoPlaceholders();
    initializeAnimatedSvgElements();
    verticallyCenterElements();
    animateSponsorBadge();
    cleanupSponsorLists();
    overRideTweetTimelineWidth();
  });
}());
