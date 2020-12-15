---
title: "#DDDnorth 2 write up - October 2012 - Bradford"
date: "2012-10-14"
excerpt: >-
  My conference write up from one DDD North 2012, hosted in Bradford.
template: "post"
---

[![#dddNorth crowd scene, waiting for swag!](/images/a9_thumb.jpg "#dddNorth crowd scene, waiting for swag!")](http://idisposable.co.uk/wp-content/uploads/a9.jpg)

Stolen from Craig Murphy ([@camurphy](http://twitter.com/camurphy)) as it’s the only pic I saw with me on it (baldy bugger, green t-shirt front right) – thanks Craig!

Another 5:45am alarm woke me on a cold morning to signal the start of another days travelling on a saturday for a [developer developer developer](http://www.developerdeveloperdeveloper.com/) event, this time with [Ryan Tomlinson](http://twitter.com/ryantomlinson), [Steve Higgs](http://twitter.com/shiggsatwork), [Phil Hale](http://twitter.com/philjhale) and [Dominic Brown](http://twitter.com/dominicsbrown) from work.  I’ve been to a fair few of these now, and it still overwhelms me that so many people are willing to give up their Saturdays (speakers and delegates alike) and attend a day away from friends, family (and bed!) to gather for a day with their peers to learn from each other.

## Lions and tigers and hackers! Oh my!

##### Phil Winstanley, [@plip](http://twitter.com/plip)

Phil highlighted that the threat landscape has and is changing now – we’re moving away from paper and coin as our means of transactions and everything is existing in the online space, it’s virtual, and it’s instantaneous.  Identity has become a commodity, and we now all exist in the online space somewhere – facebook are making the money they are because our identities and those of our relationships are rich with information about who we are and what we like.

He brought over some very good anecdotal evidence from Microsoft around the threat landscape and how it’s growing exponentially, there are countries and terrorist organisations involved in this (more in the disruption/extraction space) but everyone is at risk – estimated 30% of machines have some form of malware on them and a lot of the time it’s dormant.

Groups like anonymous are those that folks should be most scared of – at least when a country hacks you there are some morals involved, whereas groups like anonymous don’t really care about the fallout or whom and what they affect, they’re just trying to make a point.

The takeaway from this rather sobering talk from me was to read the [Security Development Lifecycle](http://www.microsoft.com/learning/en/us/book.aspx?id=8753&locale=en-us) – we all agreed as developers that although we attempt to code secure software, none of us were actually confident enough to say that we categorically do create secure software.

I’ve seen Phil give presentations before and really like his presentation style and this talk was no different – a cracking talk with far more useful information than I could distil in a write up.

## Asnyc c# 5.0 – patterns for real world use

##### Liam Westley, [@westleyl](http://twitter.com/westleyl)

I’ve not done anything async before and although I understand the concepts, what I really lacked was some real world examples, so this talk was absolutely perfect for me.

Liam covered a number of patterns from the ‘[Task-based Asynchronous Pattern](http://www.microsoft.com/en-gb/download/details.aspx?id=19957)’ white paper, in particular the .WhenAll (all things are important) and .WhenAny (which covers a lot of other use cases like throttling, redundancy, interleaving and early bailout) patterns.  More importantly, he covered these with some cracking examples that made each use case very clear and easy to understand.

Do I fully understand _how_ I’d apply async to operations in my workplace after this talk? No, though that wasn’t the aim of it (I need to spend more time with aync/await in general to do that).

Do I have use cases for those patterns that he demoed and want to apply them?  Absolutely, and I can’t wait to play!

Fantastically delivered talk, well communicated, and has given me loads to play with – what more could you want from a talk?

## BDD – Look Ma, No Frameworks

##### Gemma Cameron, [@ruby_gem](http://twitter.com/ruby_gem)

I approached this talk with some scepticism – I’ve read a lot about BDD in the past, I’ve seen a talk by Gojko Adzic very recently at Lean Agile Scotland around ‘busting the myths’ in BDD, and although the concepts are fine, I just haven’t found BDD compelling.  Gemma’s talk (although very well executed) didn’t convince me any further, but the more she talked, the more I realised that the important part in all of this is DISCUSSION (something I feel we do quite well at my workplace).  I guess we as a community (developers) aren’t always ideal at engaging the product owner/customer and fully understand what they want, and it was primarily this point which was drilled home early in the talk.  Until you have a clear understanding early on by bringing stakeholders together, arriving at a common understanding and vocabulary, how can you possibly achieve the product they wish.  I buy this 100%.

This is where the talk diverged for some it seems – a perhaps misplaced comment about ‘frameworks are bad’ was (I feel) misinterpreted as ‘all frameworks are bad’, whereas really to me it felt like a ‘frameworks aren’t the answer, they’re just a small part of the solution’ – it jumps back to the earlier part about discussion – you need to fully understand the problem before you can possible look at technology/frameworks and the like.  I’m personally a big fan of frameworks when there is a usecase for them (I like mocking frameworks for what they give me for example), but I think this point perhaps muddied some of the waters for some.  She did mention the [self shunt pattern](http://www.objectmentor.com/resources/articles/SelfShunPtrn.pdf) which I’ll have to read more on to see if it could help us in our testing.

A very thought provoking talk, and I can imagine this will generate some discussion on monday with work colleagues – in particular about engagement with the client (product owner/customer) in order to ensure we are getting the requirements correctly – hopefully we’re doing everything we need to be doing here.

## Web Sockets and SignalR

##### Chris Alcock, [@calcock](http://twitter.com/calcock)

I’m sure chris won’t mind a plug for his [morning brew](http://blog.cwa.me.uk/) – a fantastic daily aggregation of some of the biggest blog posts from the previous day.  This is the first opportunity I’ve had to see Chris talk, and it’s odd after subscribing to morning brew for years now you feel like you know someone (thankfully got to chat to him at the end of the session and ask a performance related question).

I’ve played recently with SignalR in a personal project so had a little background to it already, though that wasn’t necessary for this talk.  Chris did a very good job of distilling websockets both in ‘how’ and ‘what’ and covered examples of them in use at the http level which was very useful.  He then moved on to SignalR both in the Persistent Connection (low level) and Hub (high level) APIs.  It’s nice to see that the asp.net team are bringing signalR under their banner and it’s being officially supported as a product (version 1 anticipated later this year)

This was a great talk for anyone who hasn’t really had any experience of signalR and wants to see just what it can do – like me, I’m sure that once you’ve seen it there will be a LOT of use cases you can think of in your current work where signalR would give the users a far nicer experience.

## Event Driven Architectures

##### Ian Cooper, [@ICooper](http://twitter.com/icooper)

The talk I was most looking forward to on the day, and Ian didn’t disappoint.  We don’t have many disparate systems (or indeed disparate service boundaries) within our software, but for those that do exist, we’re currently investigating messaging/queues/service busses etc. as a means of passing messages effectively between (and across) those boundaries.

Ian distilled Service Oriented Architecture (SOA) well and went on to different patterns within Event Driven Architectures (EDA) and although the content is indeed complex, delivered as effectively as it could have been done.  I got very nervous when he talked about the caching of objects within each system and the versioning of them, though I can see entirely the point of it and after further discussion it felt like a worthy approach to making the messaging system more efficient/lean.

The further we at work move towards communication between systems/services the points in this talk will become more and more applicable and have only helped validate the approach we were thinking of taking.

**This talk wins my ‘talk of the day’ award* (please allow 28 days for delivery, terms and conditions apply) as it took a complex area of distributed architecture and distilled into 1 hour what I’ve spent months reading about!**

And Ian – that’s the maddest beard I’ve ever seen on on a speaker ![Winking smile](/images/wlEmoticon-winkingsmile3.png)

## Summary

Brilliant brilliant day.  Lots of discussion in the car on the way home and a very fired up developer with lots of new things to play with, lots of new discussion for work, and lots of new ideas.  Isn’t **this** why we attend these events?

Massive thanks to [Andrew Westgarth](http://twitter.com/apwestgarth) and all of the organisers of this, massive thanks to the [speakers](http://developerdeveloperdeveloper.com/north2/Speakers.aspx) who gave up their time to come and distil this knowledge for us, and an utterly huge thanks to the [sponsors](http://developerdeveloperdeveloper.com/north2/Default.aspx) who help make these events free for the community.

I’ll be at [dunDDD](http://dun.dddscotland.co.uk/) in November, and I’m looking forward to more of the same there – will be there the friday night with Ryan Tomlinson, Kev Walker and Andrew Pears from work – looking forward to attending my first geek dinner!
