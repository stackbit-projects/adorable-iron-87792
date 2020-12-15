---
title: "DDDNorth - a day of free learning in Bradford"
date: "2017-10-15"
excerpt: >-
  My conference write up from one DDDNorth 2017, hosted in Bradford.
template: "post"
---

It was a 5am alarm that woke myself, and likely my colleagues, on a saturday morning when most people would be comfortably in the land of nod, or contemplating how best to laze away their saturday. For these tombola developers though, it was a drive down to Bradford to attend [DDDNorth](https://www.dddnorth.co.uk/) \- a day long free conference setup and run by the community and supported by some brilliant sponsors. The drive down was uneventful, and we were presented with caffeine and brekky before the talks commenced.

Myself, Michael Tomaras, and Luke Hill were in attendance - I'll relay the talks that were most inspiring to me.

There were two key talks for me - one, which I've heard and read a bit about anyway, was around the Spotify model for scaling agile by [Stephen Haunts](https://stephenhaunts.com/), and the second was a war story from [Nathan Gloyn](https://twitter.com/nathangloyn) after 18 months of working on a number of projects where microservices played a part.

### Microservices - Nathan Gloyn

We're on a journey of growth at tombola that is seeing us diversify our software products in order to facilitate growth more readily - and although I've studied significantly around architecting, building, and supporting microservices, I thought a talk dedicated to 'what I've learned after a year of building a system' would be right up my street.

There was a bit of background about microservice patterns (and anti-patterns), and discussions around indetification of bounded contexts, fat vs thin microservices and just some key gotchas - security, service discovery, logging (and logging, and logging, and logging some more).

Some key takeaways:

- Deployment (deploy small, avoid single repo for multiple services),
- Identity and Authorisation (get these right up front - don't attempt to retro fit it, it'll get inordinately harder),
- Build based upon need (not because it's cool),
- Configuration (strongly consider configuration management - consul/zookeeper/et al),
- Logging (you can never log too much),
- Monitoring (ensure you understand the baseline and health of each component, but ensure you are monitoring the system as a whole too),
- System flow (correlation / session tokens in order to track journeys and requests through various systems is crucial)

None of these new, though distilled well by Nathan and he delivered an effective talk. The only thing missing from this for me was around the organisational change required to support microservices - a move we're currently undertaking in terms of a shift away from a more monolithic single deploy application into many more smaller, co-ordinated, API driven services. Conways Law and team structure vs architecture design within an organisation is of key interest to me, and I think it'd have been nice to see a little more around this in the talk.

### Scaling Agile with the Spotify Model - Stephen Haunts

Another useful war story about how Stephen and the team at his previous employer had managed the growth of the organisation via the spotify model which they modified in a rather comic 'lord of the flies' motif, with islands (multiple companies) and lookouts (marketing/sales type roles that protected the developers from the external landscape that was very much waterfall / deadline driven).

Some really refreshing pointers during this for me on just how best to empower and inspire the workforce while adapting to the growth and change of the organisation.

Key slide of the day for me though was one presented from a [Harvard Business Review article](https://hbr.org/2015/12/engaging-your-employees-is-good-but-dont-stop-there).

![](/images/W151201_MANKINS_PYRAMIDOF-850x598.png)

This is such an incredible visual metaphor for just how satisfied, engaged, and inspired employees would be within an organisation, and I think this will be the one image that goes up on the wall in the office - definitely something to aspire to.

### Crosspost

Post is also available at [ops.tombola.co.uk](http://ops.tombola.co.uk/) (or will be, soon!)

## Roundup

A brilliant day of learning, some really useful talks, and a day to get some discussion with peers from the industry - all for the bargain price of £0.00. Further discussions with peers in other sectors who highlighted that recruitment for them was as difficult as it was for us, no matter how cool or interesting the work is you are doing (by the way, we're hiring! see our [careers site](https://www.tombola.co.uk/careers))

Free learning, free food, free chat, free inspiration - what's not to like? Thanks DDDNorth.
