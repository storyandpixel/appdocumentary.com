---
layout: post
title: "How to automatically scroll a web page for buttery smooth screen captures"
author: Jed
---

This is a fun one.

Jake and I have been making promo videos for our [corporate sponsors](/sponsors/) over the past few weeks. With each video, we’ve faced the problem of capturing the sponsor’s website in an elegant way. We both like the effect of a slowly scrolling web page.

To achieve this effect, one would conventionally capture a screenshot of the web page and use a compositing suite to animate the scrolling effect. But this approach requires also compositing the mouse pointer and any buttons that change state. We're trying to finish these videos quickly to get back to the film, so minimizing post work is a top priority. We decided to try a live screen capture of a browser instead.

We launched our screen capture app (QuickTime Player X in this case), navigated to the page we wanted to capture, started the capture, and scrolled down. We quickly realized that using one’s fingers on a trackpad to scroll a web page results in a video reminiscent of using one’s fingers on a trackpad to scroll a web page. Not so elegant. So our next thought: Let’s automate the scrolling.

By injecting a bit of JavaScript into the page, we were able to capture the precise effect we were after. Here’s the code we used for our latest video:

{% highlight javascript %}
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
}

var scrollBody = scrollElement.bind(null,
                                    document.getElementsByTagName('body')[0]);
{% endhighlight %}

The above code performs the scrolling using a hardware accelerated CSS transform (in layman's terms: it’s buttery smooth). Result: a nice ease-in-out effect adhering to the scroll distance and duration specified, while keeping in tact the mouse pointer, button states, and animated elements.

Wanna try it? To make it easy for you, we've fleshed out the code and created a bookmarklet: <a class="btn btn-xs" href="{% include page-scroller-bookmarklet.js %}">AutoScroll</a> (click that button to try it on this page).

To install the bookmarklet, just drag the button above to your bookmarks bar, navigate to the page you’re capturing, and click it.

Oh yeah, you can also specify a delay before the scrolling starts, allowing for last-second prep (like hiding the bookmarks bar).

We hope you find this little tool useful! You can see it in action in the UserTesting video we released this week:

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="//player.vimeo.com/video/108918905?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>
