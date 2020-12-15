---
title: "DDD Scotland 2016 – A sunny day in Edinburgh"
date: "2016-05-17"
excerpt: >-
  My conference write up from one DDD Scotland 2016, hosted in Edinburgh.
template: "post"
---

Saturday saw an early start to travel from the north east up to Edinburgh for the first DDD Scotland in a number of years and the [hashtag](https://twitter.com/search?f=tweets&vertical=default&q=dddscot&src=typd) was already seeing activity, so it was clearly going to be a good day.

First, and only, disappointment of the day – no coffee at the venue for breakfast!  They made up for it later in the day, though a cup of rocket fuel would have helped after starting at 5am.

tl;dr

Some very good talks, and some real takeaways from the day – as with any event of this type, a re-firing of the engines is definitely part of the aim – new ideas, new directions, new approaches – and the day most certainly delivered on this.

I was particularly impressed with the guys from [Skyscanner](http://codevoyagers.com/) – both culturally and technically they have identified their problems well, and effectively delivered solutions and organisational change in order to minimise pain – a success story in the making.

  

### A Squad Leaders Tale – the Skyscanner squads model

**Keith Kirkhope ([@kkirkhope](https://twitter.com/kkirkhope))**

The [squads model](https://labs.spotify.com/2014/03/27/spotify-engineering-culture-part-1/) [from spotify](http://blog.crisp.se/2012/11/14/henrikkniberg/scaling-agile-at-spotify) has been [widely](http://techcrunch.com/2012/11/17/heres-how-spotify-scales-up-and-stays-agile-it-runs-squads-like-lean-startups/) [discussed](https://www.scrumalliance.org/community/articles/2015/december/scaling-agile-using-spotify-s-framework) and is a model that Skyscanner has adopted (and adapted) that model during a period of organisational and architectural change, and it would appear that they have done so to good effect.

They had the typical growing pains of any organisation that has gone from early success and grown significantly really:

- They’d hit product gridlock
- Their source control/release process was unwieldy
- They were broken into functional teams (front end, etc. etc.

They were able to apply a lot of thinking around the [theory of constraints](https://en.wikipedia.org/wiki/Theory_of_constraints), and indeed highlighted that they realised they were only as fast as their slowest unit. 

They adopted the squads model, though included a few modifications to better fit their organisational structure (they included squad leads at the top of each squad, but also brought in a tribe lead, a tribe engineering lead, and a tribe product lead to give better oversight across each squad).

Each squad is essentially self managing and self directing – they come up with their own goals, metrics, and success criteria (and example given was 'to help users find their ideal flight(s) and book it as easily as possible’)

Some really positive side effects from this empowerment – for example, project leads become redundant, the product owner becomes one of the key foci.

I managed to ask a number of questions in this talk to better grasp the model, though unfortunately the one I didn’t ask was around [Conways Law](https://en.wikipedia.org/wiki/Conway%27s_law).  This organisational change seemed to be fundamental to their move from monolith to micro services, and I suspect without it they could not have so effectively broken down that monolith.  This change was a top down led change, and it’d be fascinating to learn more about the drivers behind it.  It’s the first time I’ve seen the direct impact of the communication structures of an organisation directly impacting the design of the systems.

### Breaking the monolith

**Raymond Davies** ([@radyrad88](https://twitter.com/radyrad88))

Another talk from Skyscanner, this one a very detailed history of skyscanner’s journey from inception through to current day and covering a great deal of the technical decisions made along the way – some of which I shall investigate as part of our own journey at [tombola](http://ops.tombola.co.uk/) as we face some similar issues/growing pains.

They moved from classic asp, through webforms/mvc, to mvc, and eventually arrived at their current architecture which is evolving towards a micro service model.

Some key takeaways from this one:

- Aggressively decommission older/legacy ‘kill it with fire’
- Theory of constraints played a bit part in their evolution
- They weren’t affraid to look at alternative team structures and architectures

Some technologies to look at:

- varnish and esi, riverbed traffic manager

This and the squads talk were the high point of the day for me.

### Other talks

**Windows brings docker goodness - what does it mean for .net developers (Naeem Sarfraz)**

A great talk and the speaker was very knowledgeable – the current state of the nation for docker looks good.  Certainly not yet at the point where you’d want to deploy (far from it), but the technology is maturing nicely.

**Versions are evil – how to do without in your APIs (Sebastian Lambla)**

The holy wars on RESTful endpoints, and his points were very well argued.  Worth seeing the video below.

### Slides From Talks

[ASP.NET Core 1.0 Deep Dive](https://speakerdeck.com/cmatskas/asp-dot-net-core-1-dot-0-deep-dive) – Christos Matskas

[You Keep Using the word agile…](http://www.slideshare.net/Nathangl/you-keep-using-the-word-agile-i-do-not-think-it-means-what-you-think-it-means) – Nathan Gloyn

[Versions are evil – how to do without in your API](https://serialseb.com/speaker/versions-are-evil/) – Sebastian Lambla

[“Advanced” Functional Programming for Absolute Beginners](http://slides.com/richardadalton/advanced_fp_for_beginners#/1) – Richard Dalton

[CQRS and how it can make your architecture better](https://github.com/trailmax/CQRS.Talk) – Max Vasilyev

[Ladies and Gentlemen the plane is no longer the problem](http://www.slideshare.net/chrisvmcd/ladies-and-gentlemen-the-plane-is-no-longer-the-problem) – Chris McDermott

[Breaking the Monolith](https://drive.google.com/file/d/0Bw_MpRB8grjkQ0hFSU13YkRaazQ/view) ([video](https://www.youtube.com/watch?v=DI7Rb8WRAFE)) – Raymond Davies
