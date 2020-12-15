---
title: "2010 - A year in geek"
date: "2010-12-30"
template: post
---

I’ve found it incredibly cathartic to read a few others’ blog posts summarising not only the year that has gone, but their aims for the year ahead – this has been an incredibly busy year for me in geek terms, and I thought I’d write it up, as another hopefully cathartic exercise.

### The year starts…

2010 started for me after only four months in a new job after escaping an agency environment in August last year – I honestly didn’t know how badly I had it in my previous role until I started in my current – I took quite a hefty pay cut to switch jobs, but the previous role (I should really say roles, as I was stupidly doing the IT Manager and Dev team lead roles) had me in the last 6 months of it working comfortably 60 hour weeks – I was knackered, home life was suffering, I couldn’t switch off, I was stressed (and anyone who knows me knows I just don’t do stress).

My current role is pretty much idyllic for me – job description is Senior Developer, but we all know that hides a multitude of sins.  Basically, I get to specify technical direction, I get to do staff mentoring/staff support, I get to be involved in the community, but (best of all) I get to spend about 75% of my usable time developing.  Pig in shit I believe is the term they use ![Winking smile](/images/wlEmoticon-winkingsmile.png)

### Legacy Code

Oddly, the first real achievement this year involved minor improvements to our payment system (based upon  legacy code – classic asp – ewww!)  I write it here not because I’m proud of the technology, but of the analytical approach we took, the change process we had in place for the little and often changes to it, and the overall effect of those changes – conservative estimates by our financial officer put us at just over 1% extra turnover.  Now that doesn’t sound a lot, until you see how much the company turns over – needless to say, they were very happy with the work!

## Site Rewrite

This has been the big focus for me from around April, and it’s been huge – our existing site is a mix of a lot of classic ASP with a number of .net projects dotted around – the technical debt in there is huge and changes, be it new functionality or modifications to existing functionality are just incredibly costly.  The aim (and I’ve read any number of posts that say this is a bad idea) was to re-write the whole thing into something that was:

a) more maintainable

b) easier to deploy

c) of a far higher overall quality

d) minimised technical debt

e) easier to extend

With that in mind, the technologies that myself and the team have worked on this year have been wide ranging.

#### ASP.NET MVC2

The move away from web forms and into MVC has been a revelation.  I lament now the occasional need to maintain our legacy code as once you grok the separation of concerns involved in MVC2 (I heartily recommend both the [Steve Sanderson book](http://www.amazon.com/ASP-NET-Framework-Second-Experts-Voice/dp/1430228865) and the [TekPub video series](http://tekpub.com/productions/aspmvc) as learning resources). moving back to web forms (especially legacy) is a mare.  I’d say out of all the things covered this year, this is the biggest ‘win’ for me – I can see me using this pattern (and asp.net mvc) for a long time to come as my primary means of delivery over the web.

#### Testing Software (Unit, Integration, n’all that jazz)

I daren’t call this test driven development as we tend to write our tests after we’ve got the functionality in place – our specifications and business rules in most areas of the rewrite haven’t carried over verbatim, so writing unit tests ahead of time was rarely practicable.  That said, the project is now up to 290+ unit/integration tests, and I suspect before launch that number will nearly double.

It’s very easy during code reviews for team members to validate the logic, outcomes and goals in the unit tests up front so that they form almost a code contract which then goes on to define behaviour and functionality within the code.  It also (assuming business knowledge of the area under test) allows people to highlight potential missing tests or modifications to existing tests.

Learning wise, blogs have been the most use during the year for unit testing, though I would say a must purchase is ‘[The Art of Unit Testing’ by Roy Osherove](http://www.manning.com/osherove/).  It got me thinking about unit testing in a very different way and has led (I hope) to me simplifying unit tests but writing more of them, using mocking frameworks to deliver mocks/doubles, and generally being a big advocate of testing.

#### Design Patterns

Obviously MVC goes without saying, though this year has seen me read a lot around software design and the patterns used therein.  I feel I now have a solid handle on a great deal more software design from an implementation point of view (the theory was never really that difficult, but turning that into an implementation…).  We’ve used the Service pattern extensively, Repository, I’d like to think we’ve used Unit of Work in a few places, the Factory pattern.  They’ve all seen the light of day (necessarily so) in this project.

There’s a fantastic post by Joel Spolsky about the [Duct Tape Programmer](http://www.joelonsoftware.com/items/2009/09/23.html) which I’d urge everyone to read if they haven’t done so, and it’s about finding that balancing act between software design for software design’s sake (the pure view) versus getting the job done – there’s always a balancing act to be had, and hopefully I’ve stayed on the right line with regards to this.  It’s very easy when focussing on the design of the software to over engineer or over complicate something that should be (and is) a relatively straight forward task.

Uncle Bob must get a mention this year, as his [SOLID principles](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) have been a beacon – you don’t always adhere to them, you don’t always agree where they apply, but you can’t deny that as underlying principles of OOD they are a good foundation.

#### Business Exceptions

Two talks immediately spring to mind when I look at the approach we’ve taken with business exceptions, the first was delivered at DevWeek which I was lucky enough to attend in April ([see the post here](http://idisposable.co.uk/2010/05/business-exceptions-in-c-as-i-understand-them/)), the second was delivered by Phil Winstanley (@plip) at DDD Scotland this year.

We’ve very much using exceptions as a means of indicating fail states in methods now, and I love it – coupled with our logging, it feels like we will rarely have unhandled exceptions (and when we do, they are logged), and the overall software quality because of this feels far superior.

I understand the concerns that have been raised around the [performance of exceptions](http://idisposable.co.uk/2010/05/the-performance-of-exceptional-things/) (cost to raise etc.) and the desire to not use exceptions for program flow, though I think we’ve struck a happy balance and my testing (albeit rudimentary) earlier in the year suggested to me that the performance of these things was something that just wasn’t a concern.

#### Continuous Integration

Something that’s been on the back burner for too long now, and only the past week have I [made any headway](http://idisposable.co.uk/2010/12/teamcity-install-and-setup-basics/) with it, but already it’s a love affair.  I suspect the quality of the information we get out of the system as we move forward will pay dividends, and as we begin to automate deployment/code coverage, and I get more heavily into MSBuild, this is going to be something that I don’t think I’ll want to give up on larger projects.

### Community

I now subscribe to approximately 160 blogs, which sounds like a lot, but thankfully not everyone posts as often as [@ayende](http://twitter.com/#!/ayende), so jobs a good un with regards to keeping up – I find 5-10mins at the end of the day lets me have a quick scan through those posts that have come in, discount the ones I’m not interested in, skim read the ones I am and star them (google reader stylee) ready for a more thorough read when I get to work the next day.  This may seem a large commitment, but remember I’ve come from a job where approximately 60hrs a week I was ‘working’ (not geeking I hasten to add, just client liaison, product delivery, bug fixing, and sod all innovation)  I now find my working week is down to approx 40hrs work, and between 5 and 15hrs per week on geek stuff depending on the week and what’s on – the extra time I get for self development is just my investment in my career really, and I talk to so many other people on twitter who do exactly the same.

#### Events

Getting our own local microsoft tech user group ([@NEBytes](http://twitter.com/#!/nebytes), [http://www.nebytes.net](http://www.nebytes.net)) has been fantastic this year – we’ve had some superb speakers, and I know that once a month I get to catch up with some cracking geeks and just talk random tech.  The guys who run it Andrew Westgarth ([@apwestgarth](http://twitter.com/#!/apwestgarth)), Jon Noble (['@jonoble](mailto:'@jonoble)), Ben Lee ([@bibbleq](http://twitter.com/#!/bibbleq)) and Damian Foggon ([@foggonda](http://twitter.com/#!/foggonda)) do a fantastic job, and I look forward to more of this in 2011.

I managed to attend DevWeek this year, and [wrote up a number of things from it](http://idisposable.co.uk/2010/03/dev-week-2010/), but it was a fantastic week.  Thankfully work saw the benefit so are sending me again in 2011, so hopefully I’ll meet up with folks there and learn as much as I did this year.

Developer Developer Developer days.  These are superb!  Hopefully we can get one organised closer to home in 2011, but the two I attended this year ([Scotland](http://idisposable.co.uk/2010/05/developer-developer-developer-scotland-or-summer-arrives-early-in-glasgow/) and Reading earlier in the year) were packed full of useful stuff, and the organisers need to be praised for them.

### Geek Toys – The iPad

I couldn’t round off the year without humbly admitting that I was wrong about the iPad when it launched – I didn’t see the point at all, and was adamant it was going to flop.  Then in October I found myself the owner of one (erm… I actually paid for it too – I have no idea what was going on there!).

Well, revelation doesn’t do it justice – it’s the ultimate geek tool!  Thankfully a lot of the books I buy are available as ebooks also, and I’ve found more and more I’m moving away from print and reading geek books on my ipad – epub format is best (for annotations and the like), though PDF works a treat too.  Aside from that, tweetdeck is a cracking app on the ipad, and it lets me stay in touch with geeks more regularly than I would otherwise have done.  Reeder is my final tool of choice, and the way it represents blogs you’ve not read yet is fantastic.

I’d suggest any geek that loves quick access to their blogs, their books, and tweetdeck (though naturally the ipad does a whole lot more) have a play with one and see if it could be the answer for you too – I’m hooked.

### And what of 2011?

Well, I’m over the moon with the way 2010 has gone really – all I can ask is to maintain my geek mojo, my thirst for learning, and a cracking bunch of people to work with and life will be grand ![Smile](/images/wlEmoticon-smile1.png)

A very quick PS to add a technoarti tag **VBXP4MC892BG so that I can claim my blog via them**
