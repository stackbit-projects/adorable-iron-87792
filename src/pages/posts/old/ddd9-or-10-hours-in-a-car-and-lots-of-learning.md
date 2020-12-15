---
title: "DDD9 - or 10 hours in a car and lots of learning"
date: "2011-01-31"
excerpt: >-
  My conference write up from one DDD 2011, hosted in Reading.
template: "post"
---

This weekend saw myself and a few of the developers from work take the long drive down from the relative comfort of the north east down to that there Reading for a day full of community driven talks about our craft.  I won’t give you any real background on DDD9 as [@philpursglove](http://twitter.com/philpursglove) has a cracking post on this [here](http://philpursglove.blogspot.com/2011/01/whats-ddd9.html).

The sessions I attended were as follows:

### .Net Collections Deep Dive

**Gary Short (@GaryShort)**

Having not seen Gary present before, this talk came as a fantastic start to the day – his presentation style is superb, and the content was perfect for me.

He covered the different collection types, and I got an awful lot from the flow of the talk on which collection types to use in different situations.

Key takeaways for me on this one were:

- the performance aspects of growing collections (the doubling of the arrays, and more problematically the CopyTo that goes on to enable that growing).
- if you know the size of a collection before you initialise it, specify it (IList<Stuff> stuff = new List<Stuff>(12))
- Prefer .AddRange() to looping through a collection and using .Add().

He covered a lot more in this talk (sorting algorithms and when to consider using your own sort etc.) but all in all, cracking start to the day.

### CQRS – Fad or Future

**Ian Cooper (@ICooper)**

I arrived at this talk having seen Ian present before on different subjects so knowing he was good, and having utter cynicism on CQRS (Command Query Responsibility Segregation).  It seemed to me (note the past tense) like an utter waste of time and something that allowed/supported a weaker architecture.  Very much a toy for the cool kids.

Well, the talk has convinced me that I need to look into this as a lot of what Ian said resonated with me.  Having a thin ‘read’ layer that (in our case) would return our View Models completely away from the domain objects makes so much sense – do I really need a 7 table join ‘User’ object *just* to present the pertinent details to the user allowing them to change their password (caching in place or no!).

The domain object would get involved on the commands – the changing of something, and at this point the domain model is a godsend naturally as it validates whether or not what you are doing is valid.

I like that it simplifies down our Service and Repository layers, and can see some real potential from it all.

It’s not something I’m going to rush out and implement tomorrow, but it’s something that has now hit the reading list as something that I must understand with an aim to be better informed when I make architectural design decisions in our software – I will no longer rule it out as a fad that’s for sure.

### Functional Alchemy – how to keep your c# code DRY

**Mark Rendle (@markrendle)**

This guy was a great speaker – fantastic talk, his knowledge of the functional aspects introduced to the .net framework was huge, and he certainly used them well in his examples.

What this talk highlighted is just how shit I am!  There are aspects of the .net framework that I have very little understanding of (am I supposed to admit this publicly? lol).  I use and consume Func<T> and Action<T, TResult> on a day to day basis on the framework with no problem (and love them).  Does not knowing how to ‘roll my own’ affect my day to day job? Not really.  Do I want to know them to add to my toolbelt?  Damn sure.  Some of the stuff he was doing with (in his own words) abuse of Actions and Functions was incredible.  There are some really nice patterns that come out of this, and it’s linked for me to the Monads talk that Mike Hadlow gave as things I ‘Must try harder’ at.

I suck ![Smile](/images/wlEmoticon-smile2.png)

### Is your code SOLID?

**Nathyn Gloyn (@nathyngloyn)**

Very good talk covering the origins and usages of SOLID, including code samples that demonstrated it.

I would encourage anyone that doesn’t understand these principles to read up on them (a google search will reveal much), they very much apply to all software development and even a high level understanding of them *will* make you a better software developer.  They’re not all prescriptive, they are tools to use as and when you feel it applicable, but having them in your mind while you design software is gold dust.

Thankfully the talk for me helped solidify the approaches we are taking at my current employer are the ‘right’ ones, and it was a ‘warm blanket’ type talk that made me feel like I wasn’t an utter numpty.

### CSS is code, how do we avoid the usual code problems?

**Helen Emerson (@helephant)**

I felt like a lone sheep during this one, as I use (and really like) reset.css files (though I understand why Helen doesn’t), I thankfully work in an environment where backward compatibility means that if it doesn’t have rounded corners in IE6 but it ‘works’ then jobs a good un, so I very much felt Helen’s pain when she explained some of the hoops she has to jump through to ensure cross browser remains as similar as possible.

Although a good talk, the key gain from this talk for me was at the end when the community chipped in.  So for example there’s the following products/projects I need to look at:

- dotLess/SASS – means of treating CSS as a programming language with variables/mixins etc.
- Selenium, Browserlabs and Mogotest as means of testing UIs

What I did also get from this was [Helen’s blog](http://helephant.com/) which I’ve subscribed to – she has a lot of very good stuff to say and I’d recommend folks that have any interest in front end have a read of it.

### Beginners Guide to Continuous Integration

**Paul Stack (@stack72)**

This guy has been helping me a lot over Christmas with setting up our CI build, so was nice to finally meet him and say hello (surprising how many people just recognised me yesterday – who’d have thought that I stand out at 6’ 9”! Lol).

He didn’t really cover anything new for me, though really again helped solidify that continuous integration is the ‘Right Thing’ to do.

Most importantly from this talk (and the conversations I had with him over Christmas) – do it in small steps – don’t try to achieve everything straight off.  Set it up, get it checking out and building first – light stays green?  Do a run through of unit tests next.  Light stays green? Look at code coverage and other tasks.  Light stays green? Deployment… etc. etc. etc.

This way, over time you’ll build up the build that you *want* without all that significant up front cost.

### Close

Another brilliant day run by the community, for the community, and I can only thank all the organisers and speakers for taking the time out to organise it, along with a huge thanks to Microsoft for the venue – the cookies were ace!

Loads of learning points for me, but that’s a huge positive, not a negative!

It was incredible to see on one of the first slides of the day that the North East is getting a DDD event in the Autumn – yay, I can do the geek dinners, the beers, and still get home to a comfy bed!

Roll on [DDD Scotland](http://www.developerdeveloperdeveloper.com/scotland2011/)!
