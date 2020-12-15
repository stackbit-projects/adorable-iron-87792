---
title: "Dev Week 2010"
date: "2010-03-19"
excerpt: >-
  My conference write up from one DevWeek 2010, hosted in London.
template: "post"
---

Well, I was lucky enough to have my employer pay for a trip for me and the dev team lead to [DevWeek](http://www.devweek.com/) this year.  First time I’ve been to DevWeek, and hopefully not the last.  I attended the 3 days of the full conference and from the outset it showed itself as a very well organised and run conference.  [The Barbican](http://www.barbican.org.uk/) was a cracking venue, and I found the overall structure of the event very useful.

My mindset at the start of the week was very much about attending those sessions I felt I’d learn the most from (well duh!), and those that would have the most useful impact on the current dev stream I’m in.  We’re in the process of re-architecting the site, both hardware and software, and part of that re-write will be the move from a predominantly classic ASP (with asp.net elements thrown in for good measure) across to using: [MVC2](http://www.asp.net/mvc/); [Entity Framework 4](http://geekswithblogs.net/iupdateable/archive/2009/09/23/entity-framework-4.0-resources-ndash-documentation-links-best-blog-posts.aspx)/a.n.other ORM or indeed linq-to-sql; intelligent caching; automated builds/continuous integration; and bringing in elements like test first development, etc.  So the talks were about targetting those areas to maximise gain. 

I’ll cover my thoughts on the talks that had the most impact on me.

## Day 1

### Keynote – 97 Things Every Programmer Should Know

**Kevlin Henney –** [**Curbralan**](http://www.two-sdg.demon.co.uk/curbralan/) **-** [**@KevlinHenney**](https://twitter.com/KevlinHenney)

A cracking opening keynote which delivered a talk from the above title, one of a few in the O’Reilly [97 Things](http://97things.oreilly.com/wiki/index.php/Links_to_other_97_Things_books) series.  I confess to never hearing about this series, though I shall indeed be purchasing the book.  The 97 things are covered on [their wiki](http://programmer.97things.oreilly.com/wiki/index.php/Contributions_Appearing_in_the_Book), and Kevlin for his part distilled a number of them as part of the talk, interspersing with personal experience (of which the guy has a bucketload!).

Some of the key premises that stuck for me in this talk were:

[Do Lots of Deliberate Practice](http://programmer.97things.oreilly.com/wiki/index.php/Do_Lots_of_Deliberate_Practice) – very much the idea that performing a task with the sole aim of mastering and improving your ability to do that task is what makes us (essentially) better at our jobs.  The obvious geek term that springs to mind here is [grokking](http://catb.org/jargon/html/G/grok.html), and I think that any developer who actively involves themselves with deliberate practice will be the richer for it.

[Learn to Estimate](http://programmer.97things.oreilly.com/wiki/index.php/Learn_to_Estimate) – struck a chord merely because we all face this, and I’ve never worked in a job when I haven’t had to estimate (and then subsequently commit to) timelines.  As [Giovanni](http://programmer.97things.oreilly.com/wiki/index.php/Giovanni_Asproni) points out in his contribution, the difference between estimation (“that’ll take me 4 weeks”) versus target (“I need that in 2 weeks”) versus commitment (“I can’t do that in 2 and a half weeks but no less”). We as developers will always face this, and as we discuss with our managers, what they are after is a commitment of time – it’s how we arrive at that that is important.

There were many other points that sat well with me, and I’d really recommend grabbing the book to pickup on quite a stash of collective wisdom.

### Objects of Desire

**Kevlin Henney –** [**Curbralan**](http://www.two-sdg.demon.co.uk/curbralan/) **-** [**@KevlinHenney**](https://twitter.com/KevlinHenney)

I don’t think I’ve seen a room so packed!  There were as many people on the floor as there were on chairs – clearly this one struck a major chord with us all.  The concept was an interesting one, especially for someone who’s programmed on the .net stack since 1.1, and has attempted to be OO since day one.  The aim was to relay (among other things) effective OO practice, pitfalls, and techniques.

This was one of those talks that helped reinforce the direction that I’m steadily taking (loose coupling, the effective use of patterns, etc.) isn’t far off the beaten track, and the talk really solidified my thinking.  These first two talks were the first time I’d seen Kevlin talk, and I hope to see more in future – an incredibly accomplished talker, buckets of experience, and someone who clearly fully understands their subject matter.

### Design for Testing

**Kevin Jones -** [**Rock Solid Knowledge**](http://rocksolidknowledge.com/Home.mvc/us#Kevin%20Jones "http://rocksolidknowledge.com/Home.mvc/us#Kevin%20Jones") **-** [**@KevinRJones**](http://twitter.com/kevinrjones)

After reading through [The Art of Unit Testing](http://www.artofunittesting.com/) and playing around with testing myself, I found this talk again helped solidify that my thinking on the subject was going in the right direction – [loosely coupling](http://en.wikipedia.org/wiki/Loose_coupling), staying away from concrete types preferring interfaces/contracts, [separate your layers/concerns](http://en.wikipedia.org/wiki/Separation_of_concerns), test a single element of the code, dependency injection is your friend and the use of inversion of control containers.

I’d not seen [Unity](http://unity.codeplex.com/) in practice, so to see the syntax/usage of that was particularly useful, and I think I’ll give that one a whirl as we move forward with our re-architecture. Expect a separate blog post from me on this one as I document the setup we finally arrive at.

Great talk, great demos.

## Day 2

### Entity Framework in the .NET Framework 4 and Visual Studio 2010

**Eric Nelson –** [**Microsoft**](http://geekswithblogs.net/iupdateable/Default.aspx) **-** [**@EricNel**](http://www.twitter.com/ericnel)

Another cracking talk from Eric – it’s always nice to feel you’re getting a genuine (not marketing led) talk on any microsoft related product, and where it’s good there will be gushing, but where it’s not, you can be sure you’ll hear about it.  Entity Framework 1 clearly caused Microsoft no end of trouble in terms of adoption rates, and it seems to have used this as a clarion call to improve EF4 in every way possible.  Are there still issues? Yup, without doubt.  Does it now look like a viable provider for a solid data access strategy – absolutely!

I think the key things from this talk for me were:

- play with it in more anger, and attempt to model our existing schema on it (thankfully a weeks holiday will allow this, I’ll try to spend some of it sat coding in the sun!)
- [Investigate](http://elegantcode.com/2009/12/15/entity-framework-poco-ef4-a-simple-mapping/) [POCO support](http://www.robbagby.com/entity-framework/ef-4-implementing-poco-objects/) – I like the idea that the domain model is designed and written as a separate concept away from the data access strategy, and then (with the clever use of T4 and some other shenanigans that I’ll have to play with) the coupling is brought in (though it doesn’t strictly ‘muddy’ your domain model)
- [Investigate T4](http://www.hanselman.com/blog/T4TextTemplateTransformationToolkitCodeGenerationBestKeptVisualStudioSecret.aspx) – seriously, why haven’t I started playing with this – Eric mentioned the [Tangible T4 Editor](http://t4-editor.tangible-engineering.com/T4-Editor-Visual-T4-Editing.html) which I’ll have a look at, and investigate any other tooling that may help.

I feel almost convinced that the use of Entity Framework 4 is the data access strategy that we need as we re-architect our site, and I look forward to getting past the testing and proof of concept stages to see what it can really deliver.

### Exception Handling

**Jeffrey Richter –** [**Wintellect**](http://www.wintellect.com/) **-** [**@JeffRichter**](http://twitter.com/JeffRichter)

Superb talk, and this highlighted that I need to start thinking about exceptions differently to how I currently do.  He highlighted the myth that “Exceptions should only be used for exceptional situations”, and an exceptional situation isn’t something that rarely happens, it’s when a method doesn’t do what it says it’s going to do.

ProcessPayment(Customer, Order, CardDetails)

If the above method does not actually process the payment (for any reason), then throw an exception – hopefully of a type that is useful/meaningful.  The caveat to that is that you should only catch exceptions that you can meaningfully do something about.

So what if the customers payment was declined?  What if the customer is blocked from placing orders? What if the card has some issue with it?

All of these feel very much like reasons to throw business related exceptions.

There was an awful lot more to this talk, and I feel bad distilling it to the above, but for me, this was the key gain from that talk – that I need to start thinking about exceptions in a wholly different way.

## Day 3

### Improving Quality with an Automated Build Process

**Simon Brown –** [**Coding the Architecture**](http://www.simonbrown.je/) **-** [**@simonbrown**](http://twitter.com/simonbrown)

Another of those ‘it’s obvious, but I bet not many of us are doing it’ talks – the talk focussed on Simons work on an internet banking site, what they used in order to help them improve quality, streamline their processes in terms of software delivery, and just generally make their lives easier.

There was a lot of discussion in this talk around tooling, and I shall have to do a thorough investigation of those tools available with regards continuous integration and build management.  Simon used [Nant](http://nant.sourceforge.net/), [Nant Contrib](http://nantcontrib.sourceforge.net/), [Cruise Control.Net](http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET), [NCover](http://www.ncover.com/), [NCover Explorer](http://www.kiwidude.com/dotnet/DownloadPage.html) and a number of other tools.

If I had one criticism of this talk it’s that I’d have liked to see a bit more hands on/working with the tools, though I can only imagine how sensitive their code base is, so can understand if this was the reason this wasn’t possible.

Overall though a very thought provoking talk, and one that will see me doing an awful lot more reading and playing in the coming weeks.

## Closing Thoughts?

### What about the rest then?

The other talks I attended were all good too, though obviously the blog post would have gotten stupidly long (well, it is stupidly long, but it would have been far more painful to read than it already is!).

One of the big things for me from all of this (and I apologise unreservedly to [@ericnel](http://www.twitter.com/ericnel) for this), Azure – I’m just not convinced.  I’ve joined the [UKAzure fan site](http://ukazure.ning.com/) in order to monitor developments on this, but it just doesn’t feel mature enough to be a production platform.  Strategically I can see where Microsoft are going with this, and over time clearly improvements will be made.  I’d just feel if I got involved now, I’d be beta testing in order to feedback for the next version of the product, and with so many other technologies available for me to play with, this one has been bumped off the list.

All in all though, a fantastic conference, and one that leaves me feeling significantly fired up about the technology that I’m going to be employing over the coming months – thanks!
