---
layout: post
title: Jake & Jed's Renderbeast
author: Chris Stevens of JLOOP
---

_Special thanks to [Chris Stevens](https://twitter.com/chrislstevens) of [JLOOP](http://www.jloop.com/) for designing the editing rigs and for contributing this post._

The boys at Story & Pixel have been editing on Adobe Premiere using 2013 Mac Pros (the notorious "trash can" model, quad core) using an external RAID (a Drobo unit with 5 mechanical drives in a RAID 5 configuration, connected via USB 3.0). On the surface, this seems like it would be a solid choice for a rendering rig, what with its Xeons and FirePros, and whatnot, but it turns out that it falls a bit short in the performance department, particularly when it comes to editing in Premiere, and it's especially disappointing considering the financial cost. Since the boys are all-in on completing a feature-length film, time (and therefore computing power) is of the essence.

While all of us enjoy Apple products, especially the excellent operating systems they run, trying to buy a Mac Pro that can give you the most out of Premiere is something of a losing proposition, even when money is no object. While high end Macintoshes have always been disproportionately expensive compared to their PC counterparts, most of the blame here lies with Adobe and the way they've done optimization (or lack thereof) in Premiere. Because Premiere benefits from some fairly specific components, we went down the path of hand-building a custom PC. While we built ours by hand, there are multiple reputable and affordable vendors out there that will allow you to customize nearly every part of a pre-built PC, too.

When it comes to rendering video, the traditional theory is that more cores == more performance. And, in fact, most other mainstream editing suites such as Sony Vegas or Final Cut Pro benefit greatly from higher core counts. This seems to make sense since video rendering is an easily parallelizable task: one core can work on one frame, while another works on the next, etc. However, for reasons that we don't fully understand, Premiere benefits much more from outright clock speed (GHz). Our initial plan for a new machine was to build an absolute monster using a twin-socket motherboard and older model Xeons (a steal of a deal at ~$90/ea), that would've given us 16 cores and 32 threads (with Hyperthreading), but at the very last minute, a random YouTube video surfaced in the recommendations sidebar that showed a gentleman doing a direct comparison between the very same Xeons and a single quad-core Skylake i7 6700k. The i7 was miles ahead, and so we switched gears and based our build around the i7.

The other interesting optimization issue with Premiere is that for GPU-based tasks, it performs much better using nVidia's CUDA vs. OpenCL on AMD. While the dual workstation-grade AMD FirePros in the Mac Pro would normally be considered strong performers for most tasks, it turns out that they can't reach their full potential within the confines of Premiere—a single, inexpensive "gaming"-grade GPU from nVidia can wipe the floor with them, and Apple doesn't provide an nVidia option for the Mac Pro at this time.

The final issue we faced was with the Drobo. It's an excellent general-purpose storage appliance that is very easy to configure and use, and is extremely reliable, but it isn't designed for outright performance. Specifically, there is no flexibility on the RAID level. It uses RAID 5, which is a reasonable balance between performance and reliability, but we needed to tilt the scales much further in favor of performance. We already had multiple redundant backups, and didn't need that extra level of assurance and uptime that RAID 5 redundancy provides.

Enter the Renderbeast.

The Renderbeast was designed to play to Premier's strengths and eliminate the poor disk performance of the Drobo. [Here is a link](https://pcpartpicker.com/user/SwabTheDeck/saved/#view=jcJCmG) to our list of parts (excluding hard disks).

The quad-core Core i7 6700k is the heart of this machine. As of this writing, at 4.0 GHz, it's the highest clocked Intel processor available. What's more is that if you're slightly brave, it will easily overclock to 4.4-4.5 GHz with a modest air cooling solution like the 212 EVO that we chose. While Intel makes similar i7's with higher core counts for a bit more money, they do so at the sacrifice of clock speed, which goes against what Premiere desires. If you're in a situation where you need to run additional heavy apps alongside Premiere, it may be worth investing in the 6- or 8-core models.

The MSI Z170-based Gaming M5 motherboard was chosen for being reasonably priced while also providing a strong set of features. Among other things, it supports nVidia's SLI, which will allow us to add a second video card if we feel we need it (right now, things are just great with one). Most full-sized Z170-based motherboards from the likes of ASUS, Gigabyte, or other reputable vendors will have nearly identical features.

We outfitted the machine with 64 GB of RAM since that's the maximum amount that the motherboard can support. Video editing software will almost always make use of any memory it can, and since RAM is cheap, it made sense to max it out.

For the GPU, we went with the GeFore GTX 1070. We were fairly lucky to be doing this build right as nVidia's 1000-series released. The 1070 is just a tiny step down in performance from the top-of-the-line 1080, but at a much better price point ($500 vs. $850 as of this writing). With 1920 CUDA cores, this really helps Premiere fly during GPU-based rendering.

Storage configuration required a bit more thinking than a "normal" PC would require. We've used the motherboard's RAID controller to configure 4 7.2k mechanical hard drives into RAID 0 for storing the Premiere project files and video clips. If you're unfamiliar with RAID levels (of which there are many), RAID 0 splits files across all disks, and provides no redundancy, while RAID 5 makes partial copies of each disk and breaks them out across the others. Our RAID 0 does ~500 MB/s-700 MB/s depending on how full the drives are. Imagine putting a 12 TB SSD into your machine, and that's about the performance level you can expect, but you'll be paying an order of magnitude less per gigabyte. The operating system and applications are on a separate 500 GB SSD (nothing special, just one of the inexpensive 2.5" SATA drives that are common these days). Finally, there is another separate 256 GB SSD for Premiere's "scratch" drive. We waffled a bit about how large this should be, but ultimately, this ended up working well.

Ultimately, the Story & Pixel boys are sad to have left Apple behind  for their editing rigs. A few details of their workflow had to be re-learned, but the benefits far outweighed the costs, both financial and technical. We hope that Apple will give the Mac Pro an overhaul some day soon, and possibly provide more configuration choices, but since they're notoriously secretive, we don't know what the future holds. Even more so, we'd hope that Adobe can find a way to optimize Premiere to better accommodate other common hardware configurations, and make better use of the high core counts that many machines sport these days.