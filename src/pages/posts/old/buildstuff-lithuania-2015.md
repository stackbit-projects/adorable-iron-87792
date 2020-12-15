---
title: "BuildStuff Lithuania 2015"
date: "2015-11-23"
excerpt: >-
  My conference write up from one BuildStuff 2015, hosted in Lithuania.
template: "post"
---

![](/images/1448273687_thumb.jpeg)

Just returned from a fantastic trip to Lithuania to attend [BuildStuff 2015](http://buildstuff.lt/) and thought I'd get my notes down into a blog post to help distill and to build a brown bag session for the team at work.

The focus this year seems to have been heavily around a few key topics:

- Functional programming played a big part and it was clear from even those talks that weren't functional that there is a shift across to this paradigm in a lot of people's work.
- Agile process and approaches featured heavily as an underpinning, and indeed one of the best talks of the conference for me was Liz Keogh's talk on 'Why building the right thing means building the thing right'
- Micro services (micro services, micro services, micro services) is still the hipster buzzword, though at least there were hints that the golden gooses' egg has cracks in it (they're still seen as a very positive thing, though they're not without their own costs and limitations)
- APIs naturally featured heavily in a few talks as people move more towards service orientation/micro services, and there are now a healthy set of talks on the 'how do do this part right'
- Continuous Integration/Continuous Delivery seems to have become less popular/less cool as a topic, but I was able to get some very useful insights on the conference that helped a lot.

You can see the full list of talks I attended [here](https://buildstuff15lithuania.sched.org/terrybrown1).

My tweet stream for the conference is [here](https://twitter.com/search?f=tweets&vertical=default&q=terry_brown%20buildstufflt&src=typd), and the full tweet stream for the #BuildStuffLT hashtag is [here](https://twitter.com/search?f=tweets&vertical=default&q=buildstufflt&src=typd).

I attended some talks based upon the calibre of the speaker, and in some cases that was a disappointment - I of course won't mention names, though there were a few of the bigger personalities that disappointed in presentation.

Couple of the talks I took more notes at (in chronology order);

### 5 Anti-Patterns in Designing APIs - Ali Kheyrollahi ([@aliostad](https://twitter.com/aliostad))

I loved the visual metaphor presented early in this talk of the [public API as an iceberg](http://www.oreilly.com/pub/e/2206) where the vast majority of the activity is under the surface in either private APIs or business logic, and the public facing element is a small part of it.

The anti-patterns were listed as follows:

- The transparent server - Exposing far too much information about the internals or the implementation. Having to request resources with your userId in the URL (get-details/12345 instead of /get-details/me) for example.
- The chauvinist server - Designing the API from the servers perspectives and needs and pushing that thinking and process to any clients if they wish to consume it. Interestingly, Ali came off the fence and suggested HATEOS as an anti-pattern in this regard - I'm not convinced, but it was refreshing to see a strong opinion on this.
- The demanding client - where certain limitations are enforced from a client perspective (e.g. forcing versioning into the URL as opposed to the headers)
- The assuming server - where the server assumes knowledge on issues that are inherently client concerns. Good example here was pagination - /get-winners/page=1 versus /get-winners?take=20&skip=0 - we don't know anything about the form factor on the server, so a 'page' has no context.
- The presumptuous client - a client taking on responsibilities that it cannot fulfil (e.g. client implementing an algorithm that the server should handle, client acting as an authority for caching/authorisation etc.)

Another analogy I liked was in thinking of the API like a restaurant. The front of house is pristine, controlled, serene, structured. How the food arrives at the table is unimportant, and the kitchen (the server side of the API) could be a bed of chaos and activity, so long as the delivery to the front of house is pristine.

### Service Discovery and Clustering for .net developers - Ian Cooper (@icooper)

This was listed as .net developers, though in reality the concepts equally applied across other technology stacks but it was nice to see code examples in .net for some of these.

He covered some of the fallacies of distributed computing:  

- The network is reliable  
    
- Latency is zero  
    
- Bandwidth is infinite  
    
- The network is secure  
    
- Topology doesn't change  
    
- There is one administrator  
    
- Transport cost is zero  
    
- The network is homogenous  
    

And also covered a number of things around Fault Recovery:  

- Assume a timeout will happen at some point  
    
- Retry pattern (http status code 429 - 'Retry-after')  
    
- Circuit breaker pattern (another mention for [Polly](https://github.com/michael-wolfenden/Polly) here, which is an awesome library)  
    
- Introduce redundancy (be careful where state is stored)  
    

Discovery was discussed at length (naturally), and he covered both Server and Client side discovery, as well as the general tooling available to help manage this ([Consul](https://www.consul.io/), [Zookeeper](https://zookeeper.apache.org/), [AirBnB SmartStack](http://nerds.airbnb.com/smartstack-service-discovery-cloud/), [Netflix Eureka](https://github.com/Netflix/eureka), [etcd](https://github.com/coreos/etcd), [SKyDNS](https://github.com/skynetservices/skydns)) and covered the importance of self registration/de-registration of services.

A lot of practical/good content in here and a cracking speaker. Really liked the way he delivered demos via screencast so that he could talk rather than type - I think a lot of speakers could benefit from this approach.

### Why Building the Right Thing means Building the Thing Right - Liz Keogh (@lunivore)

A lot of this talk focussed around [Cynefin](https://en.wikipedia.org/wiki/Cynefin), a framework that seems to have arrived from [Dave Snowden](https://www.youtube.com/watch?v=N7oz366X0-8) and describes a system for understanding and evaluating complex systems as they evolve. This talk covered a number of known concepts to me, but in a new way, so it very much hit upon my 'must learn more about this'. It covered massively more than I could do justice to (though the link to the talk above from Liz is very similar to the one she presented), and she covered a whole pathway through an organisations agile fluency.

One of two talks at the conference that really gave me 'take aways' to go and learn and get better at - so massively happy I attended.

### ASP.NET 5 on Docker - Mark Rendle (@markrendle)

This is the first time I've seen Mark present and I hope it shan't be the last. Brilliantly clever bloke, fantastic presentation style, and clearly knows his topic areas well (he gave a closing keynote too which was equally good).

I played with vNext of asp.net in early beta, so it was incredible to see how far it's come since then. He had brought it all the way up to date (RC1 of the framework had been launched the day before, and he included it in the talk), and the flow and interaction has become really polished.

I have to admit to being behind the curve with regards Docker - understand it conceptually, have kicked up a few docker images, but nothing anywhere near production or usable at any scale. I don't really have any solid need for it right now, though the talk did demo how easy it was to fire up and deploy the code to a docker container and it's possibly something to look at once the container/unikernal platform settles down.

All of the demo's were given on linux/mono, though that evening (tragic I know) I re-worked through the talk on OSX and it all worked a treat so it does indeed seem like Microsoft has the open source/multi-platform delivery message correct here. I'll do a follow up post on this as it's now the topic that will take up most of my play time in the evenings.

### Continuous Delivery - The Missing Parts - Paul Stack (@stack72)

I talk with Paul at most conferences and have been to his talks in the past, so I hadn't really thought I'd attend this talk (I've heard all he has to say!) - so glad I did. It started after [a twitter conversation pre-talk](https://twitter.com/Terry_Brown/status/667682964239708160) with him and Ryan Tomlinson around where the complexity in micro-services exists (away from the code, and more towards the wiring/infrastructure of it all). Thankfully, Paul's talk focussed around exactly those topics and it was almost a rant towards the micro-services fandom that is exhibited heavily at conferences currently.

He covered the key tenets of Continuous Delivery:

- Build only once (never ever build that 'same' binary again once you've shipped it)
- Use precisely the same mechanism to deploy to every environment - that doesn't mean you can use right click, publish to push up to production ;)
- Smoke test your deployment - this is key - how do you know it works?
- If anything fails, stop the line! It's imperative at any stage that you can interject on a deploy that fails

Covered some common misconceptions about continuous delivery:

- It's something only startups can do - it's true that starting in greenfield makes it easier to build upon, but anyone can move towards continuous delivery
- It's something that only works for nodeJS, Ruby, Go developers - any ecosystem can be pushed through a continuous delivery pipeline
- We can hire a consultant to help us implement it - domain knowledge is crucial here, and someone without it cannot come in and help you solve the pain points
- Continuous delivery is as simple as hooking up github to your TC account - all parts of the pipeline really need to be orchestrated and analysed

There was a really good example of successful continuous delivery and it was a quote from facebook. They deploy new functionality to 17% of the female population of new zealand. Basically, by the time the major metropolitan cities come online, they already know if that feature is working or not.

Some other key takeaways from this talk - you have to ensure you deliver upon the 4 building blocks of DevOps (Culture, Automation, Measurement, and Sharing) in order to ensure you have a strong underpinning. Again, this harks to the micro-services talks - just moving your auth system into a separate service doesn't give you a micro-service. You need solid infrastructure underpinning it, you need orchestration, you need instrumentation and logging, you need some way of that service being discovered, etc. etc.

Continuous Delivery (to me) feels like a solid building block that needs to be in place and working well in order to act as a feeder for things that micro-services would hinge upon.

He mentioned the [Continuous Delivery Maturity Model](http://www.infoq.com/articles/Continuous-Delivery-Maturity-Model), and it's worth everyone reviewing that to see where they sit in each category. One of the key things for my organisation is to review our [cycle time](http://www.isixsigma.com/dictionary/cycle-time/) and see just what our flow looks like, and if there are any key areas that we can improve upon.
