---
title: "CraftConf 2015 - did someone say microservices?"
date: "2015-04-25"
excerpt: >-
  My conference write up from one CraftConf 2015, hosted in Budapest.
template: "post"
---

I’ve just returned (well, I’m sitting on a balcony overlooking the Danube enjoying the sunshine) from two days at [CraftConf 2015](http://craft-conf.com/2015) and thought I’d share my thoughts on my first attendance to this conference (it’s in it’s second year).  Firstly, lets get the cost aspect out of the way – this conference is incredibly good value for money.  Flights, conference ticket and hotel came to less than the cost of most 2 day conference tickets in London, yet the speaker line up is incredible and the content not diminished because of this economy – if you have difficulty getting business sign off on conferences in the UK, you could do worse than look at this.  That said, a conference is all about the content so lets talk about the talks.

## Themes – Microservices, microservices, microservices

Thankfully, more than one person did say that microservices for them was ‘SOA done properly’ – the talks I gravitated toward tended to be around scaling, performance, cloud, automation and telemetry, and each of these naturally seemed to incorporate elements of microservice discussion.  Difficult to escape, though I guess based on the number of people who haven’t yet adopted a ‘small, single purpose services within defined bounding contexts’ (ourselves included) in the room, it was a topic ripe for the picking.

## Talks

I won’t cover all of the talks as there was a lot of ground covered over the two days – thankfully they were all recorded so will be available to stream from the ustream site (go give the craft conf link above) once they’re all put together.

That said, there were some that stood out for me:

### Building Reliable Distributed Data Systems

**Jeremy Edberg (Netflix, [@jedberg](https://twitter.com/jedberg))**

I’m a long time fan of netflix’s technology blog, so seeing them give a talk was awesome. I think this one sat up there as one of the best of the conference for me. A number of key points from the talk:

- Risk in distributed systems – often on releasing teams look at risk to their own systems, risks in terms of time of day, but often overlooked is the risk to the overall ecosystem – our dependencies are often not insignificant and awareness of these is key in effective releasing
- A lot of patterns were discussed – bulkheading, backpressure, circuit breakers, and caching strategies that I really must read more around.
- Queuing – the approach of queuing anything you’re writing to a datastore was discussed – you can monitor queue length and gain far better insight into your systems activity.
- Automate ‘all the things’ – from configuration and application startup, code deployment and system deployent – making it easy and quick to get a repeatable system up and running quickly is key.
- ‘Build for 3’ – when building and thinking about scale, always build with 3 in mind – a lot of the problems that come from having 3 systems co-ordinate and interact well continue on and are applicable once you scale up.  Building for 2 doesn’t pose the same problems and so bypasses a number of the difficult points you’ll cover when trying to co-ordinate between 3 (or more).
- Monitoring – an interesting sound byte, though alert on failure, not the absence of success.  I think in our current systems at work we’re mostly good at this and follow the pattern, though we can, as always, do better.

#### Everything will break!

Deserving of it’s own section as this really has to be handed to netflix as an incredible way of validating their systems in live.  They have a suite of tools called [the simian army](http://techblog.netflix.com/2011/07/netflix-simian-army.html) which are purposely designed to introduce problems into their live systems.  The mantra is ‘You don’t know your ready unless you break it yourself, intentionally and repeatedly’ – they have a number of different monkeys within this suite, and some of them are run more regularly than others, but this is an astonishing way of ensuring that all of your services in a distributed architecture are designed around not being a single point of failure, or not handling things like transient faulting well. 

It is seen as an acceptable operational risk (and indeed he confirmed they had) to take out customer affecting live services if the end goal is to improve those services and add more resilience and tolerance to them.  Amazing!

#### Incident Reviews

Their approach to these fitted well with what I’d hope to achieve so thought I’d cover them:

It was all about asking the key questions (of humans):

- What went wrong?
- How could we have detected it sooner?
- How could we have prevented it?
- How can we prevent this class of problem in the future?
- How can we improve our behaviour?

Really does fit in with the ‘blameless postmortem’ well.

## The New Software Development Game: Containers, microservices, and contract tests

**Mary Poppendieck (poppendieck llc, [@mpoppendieck](https://twitter.com/mpoppendieck))**

A lot of interesting discussion in this keynote on day two, but some key points were around the interactions between dev and ops and the differing personality types between them.  The personality types were broadly broken down into two: Safety focussed and promotion focussed.  The best approach is the harness both personalities within a team, and ensure that they interact.

### Safety focussed

These people are about failure prevention - asking ‘is it safe?’ and if not, what is the safest way that we can deliver this?  Motivated by duty and obligation.  They find that setbacks cause them to redouble their efforts whereas praise causes a ‘leave it all alone’ approach.

### Promotion focussed

‘All the things!’ – all about creating gains in the ‘lets do it’ mindset. They will likely explore more options (including those new and untested).  Setbacks cause them to become disheartened whereas praise focuses them and drives them.

  

As a ‘promotion focussed’ person primarily, I’ve oft looked over the fence at the safety focussed and lamented – though really I think understanding that our goals are the same but our approaches different is something I could learn from here.

## From monolith to microservices – lessons from google and ebay

**Randy Shoup (consulting cto,** [**@randyshoup**](https://twitter.com/randyshoup)**)**

Some interesting content in this one – his discussion around the various large providers and their approaches:

#### Ebay

- 5th complete rewrite
- monolith perl -> monolith c++ -> java –> microservices

#### Twitter  

- 3rd generation today
- monolithic rails -> js / rails / scala –> microservices

#### Amazon

- Nth generation today
- monolithic c++ -> java / scala –> microservices

All of these have moved from the monolithic application over to smaller, bounded context services that are independently deployable and managed.

He was one of the first (though not the last) to clarify that the ‘microservices’ buzzword was, for him, ‘SOA done properly’.  I get that microservices has it’s own set of connotations and implications, though I think it’s heartening to hear this as it’s a view I’ve held for a while now and it seems others see it the same way.

Some anti-patterns were covered as well.

- The ‘mega service'
    - overall area of responsibility is difficult to reason about change
    - leads to more upstream/downstream dependencies
- Shared persistence
    - breaks encapsulation, encourages backdoor interface violations
    - unhealthy and near invisible coupling of services
    - this was the initial eBay SOA effort (bad)
- “Leaky abstraction” service
    - Interface reflects providers model of the interaction, not the consumers model
    - consumers model is more aligned with the domain.  Simpler, more abstract
    - leaking providers model in the interface constrains evolution of the implementation

## Consensus is everything

**Camille Fournier (Rent the runway,** [**@skamille**](https://twitter.com/skamille)**)**

Not a lot to say about this one as we’re still in the process of looking at our service breakout and on the first steps of that journey, though I’ve spoken to people in the past around consensus systems and it’s clearly an area I need to look into.

Some key comparisons between zookeeper and etcd, though as Camille highlighted, she hadn’t had enough time with Consul to really do an effective comparison with that too.  Certainly something for our radar.

Key takeaway (and I guess a natural one based on consensus algorithms and quorum) was odd numbers rule – go from 3 to 5, not to 4 or you risk locking in your consensus.

  

## Summary

A great and very valuable conference – discussion with peers added a whole host of value to the proceedings and to see someone using terraform tear down and bring up a whole region of machines (albeit small) in seconds was astounding and certainly something I’ll take away with me as we start our journey at work into the cloud.

A lot of the content for me was a repetition of things I was already looking at or already aware of, though it certainly helped solidify in me that our approach and goals were the correct ones.  I shall definitely be recommending that one of my colleagues attend next year.
