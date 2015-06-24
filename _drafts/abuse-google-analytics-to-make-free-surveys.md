---
layout: post
author: Jed
title: Abuse Google Analytics to Make Free Surveys
---

## A little backstory

After receiving a few snarky tweets and comments on our Kickstarter campaign, Jake and I decided we wanted to survey our backers to make sure that the majority was pleased with the frequency of our updates. Funnily enough, our best way to conduct the survey was by embedding it in a Kickstarter update.

Most online survey services let you build your survey, and then give you a snippet of HTML to embed the survey on a web page of your choosing. Unfortunately (though understandably), Kickstarter won't let you embed HTML or JavaScript in updates. This meant that the best we could do would be to put a link to the survey in our Kickstarter update. Our backers would need to click the link to go to the survey's page, wait for that page to load, and then choose their answer&mdash;a crumby experience that would result in fewer responses. Jake and I agreed that we wanted our backers to see the survey questions right there in the update, click their answer, and be done.

After some consideration, we came up with the idea of embedding one image in the update for each survey answer. Each of these images would be a link to a unique URL. Each time the unique URL for each image was accessed, we would tally a vote. I evaluated several survey tools hoping to find one that supported such a setup, but found none. Add to that, they all had a limit of 100-250 responses in the free tier, and we're on an indie budget. So my next thought was to write a little database-backed web app to accomplish the task. It seemed straightforward enough, but, admittedly, such little projects have a tendency to take me 5-10 times longer than I originally anticipated. As is Jake's talent, he came up with the much simpler idea of abusing Google Analytics to tally the votes instead. 

## How we did it

Considering that Google Analytics (hereafter GA) is a tool for counting page views, it's a perfect fit for this purpose. And it turns out that GA has a specific feature that makes it even more well-suited: ad campaign tracking.

One use case for ad campaign tracking is making it simple for marketers to distribute multiple versions of an ad and see which one performs the best. We realized we could bend this feature to our will. Rather than making an ad with multiple versions, we would make a survey with multiple answers.

## Step-by-step

Here's how to make your own.

1. Add a new page to your site that will function as the survey's  "thanks for answering" page. [Ours](http://appdocumentary.com/survey/) is just a simple, static HTML page.
2. Use Google's [URL Builder Form](https://support.google.com/analytics/answer/1033867?hl=en#url_builder_form) to construct your URLs. Fill out the form thusly:
	* Website URL: the URL of your "thanks for answering" page
	* Campaign Source: doesn't matter, just put something in here
	* Campaign Medium: doesn't matter, just put something in here
	* Campaign Content: the title of one of your survey answers
	* Campaign Name: the name of your survey
3. Repeat step two for each one of your survey answers and save the generated links.
4. Put the links somewhere that people can find them. Again, in our case, we embedded them as image links in a Kickstarter update.
5. Wait 24 hours for GA to update, then go to the GA dashboard for your website and drill down to **Acquisition -> Campaigns -> All Campaigns**. You should see your survey name listed here. To see the tally for each answer, you need to click **Secondary Dimension -> Advertising -> Ad Content**. The **Sessions** column contains the tally (note: see caveat in last paragraph).

Here's how our survey turned out:

![Backery Survey](/images/posts/ga-surveys/survey-cropped.png)

And the tally from GA:

![Survey Results](/images/posts/ga-surveys/survey-results.png)

Of course, this little hack has some limitations. You can only create multiple choice surveys, and you're not protected from someone trying to intentionally game the survey (e.g. voting a thousand times by following the same link repeatedly). But it was good enough for our specific purpose, was free, and placed no limitation on the number of responses. Another nice bonus in our case is that Kickstarter emails updates to backers, and the survey worked just as well from email clients.
