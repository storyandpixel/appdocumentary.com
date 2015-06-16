var scrollElement = function (element, scrollPosition, duration) {
  var style = element.style;

  // setup CSS transition duration and easing function
  style.webkitTransition =
        style.transition = duration + 's';
  style.webkitTransitionTimingFunction =
        style.TransitionTimingFunction = 'ease-in-out';

  // use translate3d to force hardware acceleration
  style.webkitTransform =
        style.Transform = 'translate3d(0, ' + -scrollPosition + 'px, 0)';
};

var delayFuncCall = function (/*duration, func, funcArgs...*/) {
  var args = [].slice.call(arguments);

  var duration = args.shift(),
      func = args.shift(),
      funcArgs = args;

  setTimeout(function () {
    func.apply(null, funcArgs);
  }, duration * 1000);
};

var scrollElementDelayed = function (element, delayDuration, scrollPosition, scrollDuration) {
  delayFuncCall(delayDuration, scrollBody, scrollPosition, scrollDuration);
};

var body = document.getElementsByTagName('body')[0];
var scrollBody = scrollElement.bind(null, body);
var scrollBodyDelayed = scrollElementDelayed.bind(null, body);

var promptForArgs = function (prependString) {
  var description = 'Enter delay (in seconds), distance to scroll (in pixels) and the scroll duration (in seconds).\n\nRun the script a second time with options 0 0 0 to reset the page.\n\nExample:\n\n1 800 5';
  if (prependString) {
    description = prependString + '\n\n' + description;
  }
  var input = prompt(description);

  // user clicked 'Cancel'
  if (input === null) {
    return;
  }

  // user input was valid
  if (/\d{1,} \d{1,} \d{1,}/.test(input)) {
    return input.split(' ');
  }

  // user input was invalid
  return promptForArgs('Woops. Input invalid: ' + input);
};

var scrollViaPrompt = function () {
  var args = promptForArgs();

  if (args) {
    scrollBodyDelayed.apply(null, args);
  }
};
