---
title: "Velocity Conf Europe 2013 – How to utterly inspire in three short days"
date: "2013-11-16"
excerpt: >-
  My conference write up from one Velocity Conference 2013, hosted in London.
template: "post"
---

The past 3 days have seen me attend [VelocityConf Europe 2013](http://velocityconf.com/velocityeu2013/) which (as the sub-title suggests) focuses on Web Performance and Operations.

Talks I attended [can be seen here](http://velocityconf.com/velocityeu2013/public/schedule/share/9ef6352db46fdd9f6280df9ed3926af5), though thankfully they seem to record all sessions, so if you missed it they’re available [from here](http://www.youtube.com/playlist?list=PL055Epbe6d5bfvFqHGHroAAbzHerXNQC4).

I had the chance to hangout with the [@toptabletech](https://twitter.com/toptabletech) guys ([http://tech.toptable.co.uk/](http://tech.toptable.co.uk/)) ([@ryantomlinson](http://twitter.com/ryantomlinson) has just joined them and he moved to them from working with me), and they’re all top blokes – very clever, and clearly care about what they do.

## tl;dr

Without a doubt one of the best conferences I’ve attended – the mix between operations talks (though often these were given a very devops slant) and web performance really did tick all of the boxes.  It feels very much like my learning time will be consumed by some of the approaches, tools and techniques I’ve seen covered over the past few days, and I remain utterly excited about putting some of this into practice.

It does make me question some of the cultural aspects within my own organisation – something I will endeavour to at least attempt to communicate effectively upon return – there are a lot of things we could be doing better (myself very much included).

Overall, not that my passion was lacking anyway, though I’m entirely re-fired up around the areas I’ve seen talked of – monitoring/metrics, continuous integration/deployment, testing all the things, and automation, with that constant backnote on the cultural.

I became acutely aware of just how narrow my scope of development was (.net developer/PC based), and time and again a lot of the tooling shown while it likely worked on windows ‘ok’, was better geared up to either a mac os/linux background – the mac to PC ratio was scary, and it’s certainly something where I’m now going to experiment with mac as a dev machine (VM’ing into windows for the .net stuff).

I’ll cover some of the details on some of the talks I attended, though obviously covering every talk from 3 days worth is going to see at least some repetition so apologies if I miss anything/anyone out.

The below is as much so that I have all of the pointers in one place to the stuff I want to look at, though hopefully others will find it useful.

**Responsive Images – Yoav Weiss**

Cracking start, Yoav highlighted 72% of responsive websites serve the same resources to all form factors (we use picturefill).  I liked the look of [http://sizersoze.org](http://sizersoze.org/) as a tool to highlight what you were doing at different breakpoints (in terms of savings to be made, etc.)

He highlighted [mobify.js](http://www.mobify.com/mobifyjs/), which although a clever implementation, feels like an overwhelming hack to get around some of the limitations currently in play on browsers/http.

First mention of [http://worldwidepagetest.com/](http://worldwidepagetest.com/) in this session too.

**Be Mean to your code with Gauntlt – James Wickett**

I moved from the more ops’y (TCP tuning/TLS perf etc.) talk into James’ security talk, and I wasn’t disappointed.

[Gauntlt](http://gauntlt.org/) provides a means of automating a number of other attack tools and overall was the first thing where I thought ‘getting that into our build is essential’ – another talk where ‘it’s easier on a mac’ (probably the first, not the last).

**Making Government Digital Services Fast – Paul Downey**

Loved this talk – really nice to see how effectively these guys release and how the mindset shift was entirely around ‘what does the user want’.  Their ‘dark release’ rollout worked well, and it was one of the first talks (though again not the last) that highlighted how important instrumentation was – how do you know you’ve been successful (or otherwise) if you don’t have figures backing it up.

**Stand Down Your Smartphone Testing Army – Mitun Zavery**

I mention this not only because it was a good talk, though I really must have a look and play with [http://www.deviceanywhere.com/](http://www.deviceanywhere.com/).  Really nice little tool.

**Testing all the way to production – Sam Adams**

Loved the ‘continuous delivery’ from day 1 approach, and the mindset that each commit I make ‘I believe this code is safe to go into production’, though obviously again the monitoring metrics come in, and it’s the pipeline’s job to prove that statement wrong – strong enough pipeline builds confidence that you’ve caught ‘all the things’.

They do a lot of ‘in live’ testing, though their isolation model seemed to work really well – something I have to investigate.

**Global Web Page Performance – James Smith**

Although the demo didn’t go great for James, I’d used [the site](http://worldwidepagetest.com) the day before as it was mentioned in one of the workshops and it’s a really nice abstraction over [http://webpagetest.com](http://webpagetest.com) – certainly useful.

**HTTP Archive, BigQuery and you! – Ilya Grigorik**

This was one of those ‘holy shit!’ demos – taking HTTP Archive data and making it accessible/queryable – see (and play with) [http://www.igvita.com/2013/06/20/http-archive-bigquery-web-performance-answers/](http://www.igvita.com/2013/06/20/http-archive-bigquery-web-performance-answers/) – incredible.

**Gimme more! Enabling user growth in a performant and efficient fashion**

Some useful stats in this great talk – by 2017 there’ll be 5.2 billion mobile users, making more than 10 billion connections!  Mobile video will increase 16 fold between 2012 and 2017.

**New Image Formats**

Images make up 61% of page bytes – 65% of page bytes on mobile!  The encoding techniques we have in place are in some cases 15 years old.  [WebP](https://developers.google.com/speed/webp/) (less supported) and [JPEG eXtended Range](http://en.wikipedia.org/wiki/JPEG_XR) (JXR) look to be the next big thing in image compression and both although not heavily supported right now, if you have in place content-negotiation/browser sniffing, you could save considerable bandwidth.

**Code Club – John Edwards**

I love this - [https://www.codeclub.org.uk/](https://www.codeclub.org.uk/) – teaching children to code in a structured/supported way, and volunteering your own time to help.  I will be investigating this to see how best I can fit in – time is key I guess (support from employer etc.) but I really love the concept so I hope I can get involved in some way.  John Edwards did an amazing job of presenting it, and the video ([http://www.youtube.com/watch?v=Ci3hY83rUwU](http://www.youtube.com/watch?v=Ci3hY83rUwU)) had me both chuckling and incredibly emotionally moved.  Great cause.

### **General Thoughts – Culture**

A number of the talks focussed around the cultures within the organisations that we work, and in how the culture almost entirely underpins how and what you achieve and the direction of work. 

One of the best talks of the conference for me was given by [John Willis](https://twitter.com/botchagalupe), entitled ‘Culture as a Strategic Weapon’, which focussed on some of the core tenets of successful devops (CAMS – Culture, Automation, Measurement, and Sharing).

It’s made me more determined to keep pressing on with both working with, and encouraging new directions within my own organisational culture – as he said, ‘If you can’t change your culture, change your culture’ and the immortal words of ‘get the hell out of dodge’.  Working towards a better organisational culture feels like the right fight to be having, but this one talk has generated me more inspiration than any other single talk at the conference.

When seeing how effective some of the guys I talked to were being with things like ‘30% time’ and how much other organisations invest in their staff, it very much feels like there are lessons I can bring home here.

### **General Thoughts - Tooling**

There are so many cool tools – too many to name, though the links I’ve put above are a good starter – there are so many people working on tools to both monitor, test and graph ‘all the things’ so that we get closer and closer to reliable, repeatable, understandable and maintainable releasing.

### Closing Thoughts

I thankfully have a solid team of developers where I work who will be very keen to be involved in this.  We’re not bad, we do automate a lot of our build pipeline, though we don’t have enough monitoring/metrics in place. 

The conference has entirely re-invigorated me and as I sit here writing up, the thing exciting me most is ‘where do I start’ – I look forward to the playtime!

This was a great conference, and was great to be around likeminded, passionate people who were all about sharing how they got to where they are, where they want to be, and how they intend to get there.

Oh, and thanks to the facebook staff who took us to the pub on thursday night – I really enjoyed the talk with you guys and learned an awful lot!

Bring it on :)
