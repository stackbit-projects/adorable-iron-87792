---
title: "re:Invent 2017"
date: "2017-12-15"
excerpt: >-
  My conference write up from one Re:Invent 2017, hosted in Las Vegas.
template: "post"
---

I feel like I only ever write up conference attendance on this blog, apologies!

I was fortunate enough to be one of the 4 developers tombola sent to re:Invent this year -

There were some seriously big announces in both of the keynotes - I won't go over them here, but you can [read about them](https://aws.amazon.com/new/reinvent/) straight from the mouth of AWS.

The keynotes are both available to watch too: - Andy Jassy [Keynote](https://www.youtube.com/watch?v=1IxDLeFQKPk) - Werner Vogels [Keynote](https://www.youtube.com/watch?v=nFKVzEAm-ts)

The conference had many different strands and covered some of the bigger hotels in Vegas, but my own particular drive was around architecture, devops, and performance.

Some of the talks I attended that I feel will have a direct impact on the future direction of the business, and will see us leverage performance and cost saving elements while broadening our approach across the organisation.

### Cache me if you can

**Markus Ostertag** [@osterjour](https://twitter.com/osterjour) [watch now](https://www.youtube.com/watch?v=WFRIivS2mpo)

_"There are only two hard things in computer science: cache invalidation and naming things" - Phil Karlton_

A really powerful talk for us - we feel we cache well, though it's clear from this talk that there is so much more that we can do.  It focused on becoming faster, having your app do less, so that you can do more (in aggregate).  Memory, we all know, is faster and cheaper than CPU, so this was one of the primary wins, and it demonstrated key caching strategies and techniques at each layer.

One thing we haven't yet entertained is caching via [cloudfront](https://aws.amazon.com/cloudfront/) of our main web application.  Even if the TTL is 0, cloudfront could help as it is optimised for that 'last-mile' delivery of your app.  Couple that with lambda@edge, and you have a potentially nice, cacheable, yet with dynamic elements means of getting your site out more easily to customers.  [lambda@edge](https://aws.amazon.com/lambda/edge/) could also give us a nice pathway into our A/B testing work.

He talked significantly about what to look for in your caching - what the big hitters were, where you were getting the hits/misses and where optimisations could be made around this, and highlighted how even small changes from monitoring these could have massive impact.

Some key guidelines:

- Choosing your TTLs on caching wisely is another obvious gotcha - even small TTLs help, but obviously aggressive caching to avoid any 'walk of shame' to the data layer is rarely a bad thing.
- Cache everything! (Sessions, Results, Aggregations, Templates, Environments, Configurations, etc.)
- Log and monitor everything - you can't optimise your caching strategy if you don't know the simple outputs like hits/misses
- If you're not using close to 100% of your ram, you have an optimisation opportunity there
- Don't worry about data duplication in caching too much - if it achieves speed
- Don't be afraid of negative caching - if a 'no results' is valid, consider caching it to avoid the next call having to do the database call

The adding up of these minor performance gains was put into sums far better than I could here, though even making a 1ms improvement when you are seeing 10,000 requests per second is still 10 seconds overall saving, which added up to 7,000+ instance hours saved per month.

There was a very good comparison on [Elasticache](https://aws.amazon.com/elasticache/) of Memcached versus Redis variants.  I can't immediately find a situation where we'd use Memcached over Redis, but if you have one, please comment.

He talked heavily on caching in front of the DB, though it's one of the bigger changes that you can make as there's a significant need to ensure the architecture is aware of it all.  You can either cache using TTL invalidation, or keeping the cache in sync at all times with synchronous writes - it works, but it's a huge change to the application.  With RDS, you can have uncoupled writes and invalidations via lambda (are we seeing a pattern here yet on lambda?), which effectively gives you DB triggers ala SQL server.  If using [DynamoDB](https://aws.amazon.com/dynamodb/), you have [DAX](https://aws.amazon.com/dynamodb/dax/) (Dynamo DB Accelerator) which seems like a no brainer if you want to eek out performance.

Consider your 80/20s when looking at caching:

- Find your heavy hitters - the bigger operations either in amount of data processed, or amount of requests
- Have them in memory as much as possible
- It pays off to do special things for them and handle them as a special case

### Scaling to your first 10million users

**Ben Thurgood** [watch now](https://www.youtube.com/watch?v=w95murBkYmU)

_"Many decisions are reversible, two-way doors" - Jeff Bezos_

This was a really interesting talk about the journey from small scale, single user sites all the way up to millions of users - things to consider, AWS services to perhaps look at, and there were certainly takeaways for us to assist with our current journey towards improving scalability. Rather than re-iterate the details of the talk, it's best to just watch through it and decide where you are in the evolution of your architecture, and what you can take away as wins.

### A day in the life of a netflix engineer III

**Dave Hahn** [@relix42](https://twitter.com/relix42) [watch now](https://www.youtube.com/watch?v=T_D1G42G0dE)

The numbers from netflix are just astounding:

- 100,000,000,000s events through their data pipeline every day
- 10,000,000,000s reqests handled by edge systems every day
- 1,000,000,000s metric time series, aggregated, collated and stored every day
- 100,000,000s hours entertainment streamed to customers every day
- 10,000,000s devices talking into our service every day
- 1,000,000s requests per second through the front door every second
- 100,000s EC2 instances answer those requests
- 10,000s auto-scaling instances every day
- 1,000s production changes every day (code pushes, feature flags - daily average about 4,000)
- 100s micro services to create that experience
- 10s terabits of video over the internet every second
- 1 goal - winning moments of truth

I found it interesting that there has been a bit of noise on twitter about cargo culting of netflix, and doing things 'just because netflix does it' - I'd agree that you should never just follow blindly (after all, you're not netflix - what works for them...), but equally, learning from some of the practices they have in place both technically and culturally I think is aspirational and really does give a focus to that passion and drive to improve.  The numbers are bigger, but the challenges are often the same.

Some really good discussion on the tooling they use to facilitate the above in this talk too, and there are certainly tools we're using already that were OSS'd by netflix, and I'm sure there will be more in future.

### Performing chaos at netflix scale

**Nora Jones** [@nora_js](https://twitter.com/nora_js) [watch now](https://www.youtube.com/watch?v=LaKGx0dAUlo)

_"Chaos doesn't cause problems, it reveals them" - Nora Jones_

A contender for 'best talk of the conference' for me and one that immediately inspired me towards both building in resilience, but also introducing chaos to see just where that resilience is, and more importantly, is not.

Chaos Engineering allows us to expose weaknesses in a way that testing in all forms doesn't.  Testing allows us to address 'knowns', and knowns are generally so much easier to plan in and predict.  Chaos deals with the unknowns - part of the reason they are termed 'experiments' rather than 'tests'.  Chaos engineering gives us a new way to increase confidence - how will our payments service handle increased latency with our third party supplier?  How would we handle half of our load balanced web pool falling over?

Chaos is inevitable - there are companies out there who make a living based on the fact it exists.  Chaos engineering attempts to bring that knowledge earlier into the flow and allow us to understand the problems before it becomes a pagerduty alert at 2am.

Nora gave an effective pathway to introducing chaos at an organisation - do not start in production, start with non-critical services, and only include services that *want* to be chaos'd.

The forces of chaos were highlighted as:

- Force 0 - [Socialisation and Monitoring](https://youtu.be/LaKGx0dAUlo?t=401)
- Force 1 - [Graceful restarts and degredation](https://youtu.be/LaKGx0dAUlo?t=805)
- Force 2 - [Targeted chaos](https://youtu.be/LaKGx0dAUlo?t=965)
- Force 3 - [Can we cause a cascading failure](https://youtu.be/LaKGx0dAUlo?t=1077)
- Force 4 - [Failure Injection](https://youtu.be/LaKGx0dAUlo?t=1261)
- Force 5 - [Chaos Automation Platform](https://youtu.be/LaKGx0dAUlo?t=1488)
- Force 6 - What's next?

Obviously, safety and monitoring key business metrics is key.  Really worth a watch.

### Summary

An incredibly motivating conference, and something with direct takeaways for the business.  Seeing others talk about and be open about operating at scale, and how they have solved the same problems that we're also solving, and being open with their knowledge (both in talks and out of them) was really empowering, and I feel sure that I and my team will be applying what I learned for the foreseeable as we work towards the future.
