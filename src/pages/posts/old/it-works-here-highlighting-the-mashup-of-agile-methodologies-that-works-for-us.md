---
title: "\"it works here” - highlighting the mashup of agile methodologies that works for us"
date: "2013-02-24"
excerpt: >-
  A write up of what 'agile' looks like for us in 2013.
template: "post"
---

Some would say the following post demonstrates a failure of process and that we’re ‘not doing scrum right’.  Some would say that if we only did X differently or spent some time focussing on Y then this would all click into place for us. On some of those points I’d be likely to agree.  In all other aspects though, I’m writing this up as I really am a fan of the approach that we have adopted (mostly organically) when it comes to dealing with our projects and the agile approaches that we undertake.  I’ll give you a bit of background around our codebase and sites so that you can get a feel for how we’ve arrived at the processes we have.  It will become abundantly clear that I’m not a ScrumMaster or formally trained in any of those, nor is it solely led by me – I have a cracking team of devs who contribute and innovate the process as much as I do.

## TL;DR

I’ll highlight that although we started out primarily using SCRUM as our methodology, the evolution of that process into something that works for our organisation by picking and choosing, and then honing various agile practices that work well within our organisation has led to a far more flexible project management methodology.

### Our Codebase

Out codebase is not small – it’s an MVC4 front end to a pretty sizable c# service/domain layer.  It’s multi-tenant for both our [UK](http://www.tombola.co.uk) and [Spain](http://www.tombola.es/) websites with a massive amount of shared/reused code (our [Italian](http://www.tombola.it/) website shares a similar codebase but was implemented before we went with a multi-tenancy solution so lives separately).  The solution checks the scales at 89 projects, rebuild time from cold is approximately 45seconds (SSD), and we practice continuous integration (with unit tests) and use team city currently to deploy.  From commit to release we can go live within 30mins if needed, though with our change and approval process we tend to take longer than that (business signoff etc.)

### Our sites

As britains biggest bingo site (and indeed spains) you can imagine that updates are frequent anyway, though we’re undergoing a project that sees us phase out the classic asp/asp.net on the UK site and deliver the MVC4 replacement.  This absolutely has to be done in phases and has to be done ‘feature at a time’ to ensure business continuity whereby we have both sites interoperating with each other, new features via MVC4, old via classic/asp.net.

These regular updates really do require frequent releasing – time critical elements to the site, bigger promotions, etc. etc. all need to get out of the door quickly and be controlled (either via feature toggles/time toggles or something equivalent) and they don’t constitute part of this phase shift over to MVC4 so we have multiple streams of work ongoing as well as delivery to both sites (spain + uk) from the same codebase.  If this was a greenfield site there’d be no real problem (as we did with out spanish solution) in just doing one big up front release at ‘go live’ – though that’s not an option when we’re talking about a site that when quiet still has thousands of people actively using it.  Equally, we can’t afford not to release to our customers just because there is risk involved and hence we’ve gone with at least daily releasing of the codebase.

### What was the problem with SCRUM for us?

Took me a while to write that heading, and it’s still not right – there’s nothing wrong with SCRUM, nor indeed was there really anything wrong with SCRUM in our environment.  We have a few areas where SCRUM just doesn’t work perfectly:

#### The Product Owner (or lack thereof)

Getting a product owner in our environment isn’t always easy – we have people who care about what we release, though getting the level of involvement that really warrants the ‘product owner’ title is consistently difficult.  I suspect a lot of organisations find the biggest problem with SCRUM in this one area – someone to drive ownership of the deliverables, champion and represent the customer, and more importantly, constantly review things like ROI, Customer Needs, and the ongoing work and on a daily basis work with the project team to ensure they were working on the right features at the right time.

#### The “Sprint” cycle and unknown unknowns

You’d think with this being brownfield the requirements would be known up front and it would be far easier to estimate the work in delivering (say) our registration process over to the new architecture would be a straight forward and plannable activity.  For some areas of the site, this has proven to be the case (and has indeed fit into the scrum ‘plan, develop, test, release, review’ pattern nicely).  Some on the other hand, including our most recent sprint have proven that fixed time windows, the ‘though shalt not change the deliverables in a sprint’ and ‘you shall attempt to estimate very well or you’re going to have headaches with the first two’ have proven overwhelmingly difficult to get around.

#### Hold on, this is all solveable!

Yes, I know there are [many ways to solve problems the key problems with sprints](http://www.scrumshortcuts.com/blog/planning-metrics/sprint-issues-when-sprints-turn-into-crawls/), though after completion of a 4 week sprint that had initially been estimated as 2, I feel pretty good about the fact that we are employing agile principles and practices but not rigidly adhering to any one particular approach.

In this most recent sprint (delivery of an affiliates system whereby the legacy implementation was fragmented, adhoc and entirely non-systematic), where project resource changed 3 times even during that 4 week period (business priorities can and do change all the time) we’ve come to the understanding of what works for us and what doesn’t.

### The New Process – “works for our organisation™”

I hasten to add that what works for us may not work for you – but that’s the overwhelmingly positive thing about agile in general.  Something works? Embrace it.  Something doesn’t work for whatever reason? Hone or abandon it.  You can pick and choose from the full gamut of agile practices, so long as you are embracing that core set of principles that underpins agile.

#### Planning

We do (as agile would have you do) just enough planning to understand the problem and start work.  Though we’ve stopped sweating the fact that it’s likely that in 4 days some new understanding of the product/deliverable may well surface that changes things – gaining that core/shared understanding early so that we can progress is key, but the minutiae isn’t.  It’s odd, as if you speak to any seasoned agile practitioner they’d tell you this is what you should have been doing anyway.  With our regular releasing it means that something that happens to customers on Monday within the released software could well become the new priority on Wednesday.  I think there are times when we attempted to get more detail into that up front understanding (with no great benefit) because of the risk of releasing something to a massive audience or indeed in just attempting to understand more than we needed to to ‘crack on’.

#### Taskboard

We use one, and it works a treat.  We don’t have a whiteboard up in the office, we use software tools – either [Scrumwise](http://www.scrumwise.com) or [Trello](http://www.trello.com) depending upon the project and what the lead feels will work best for them.  We have big TVs throughout the organisation in the various meeting rooms/cafe and will eventually get to the point where the boards are easily shown on any of these.

#### Communication

We still don’t have product owners – the operations team involved in the project almost always become that role along with the development role they are undertaking.  That said, communication with the core areas of the business is significant and we involve them as often as is practicable (and certainly more than they have been in the past).

We still very much adopt dailies within the team as a means of what we’ve both been working on, and are going to be working on.  I’d encourage anyone adopting agile to bring in daily stand ups as a no-brainer.  When you have a project team who are all working on their own deliverables, that short daily discussion adds a massive amount of shared context and ownership to the work we’re all undertaking.

#### Non-fixed ‘sprints’

We do still initially plan out our deliverables in terms of ‘sprints’ but I guess the more correct way of defining them to be generically agile would be ‘timeboxes’.  We’ve given up trying to make them fixed though.  We do initially estimate for roughly 2 weeks.

We will do our best to understand and solve that one problem during the timebox – if some new understanding comes along that would make delivery of the product within that timebox unachievable, then the timebox rather than the deliverable changes.  We no longer worry about adding to the timebox while we’re still focussing on delivery of the product for that particular window.

Our most recent sprint is a classic example of this – our affiliates handling system has brought so much out of the woodwork in terms of ‘hidden details’, things that if we’d planned up front we’d have been planning for half of the sprint to attempt to find everything, and only after we actually shipped some of the product did we find out half of the issues that arose – none of this was a problem of under delivery or over commitment against the timebox but simply became ‘something else we had to deliver as part of our affiliates work’.  It sounds more adhoc, but it just feels more flexible.

**Releasing**

This is where our approach feels far more ‘kanban’ than ‘scrum’ to me,   Because we have to release regularly anyway (as highlighted further up, we need to keep releasing to the live site both new functionality and bug fixes against existing), and because working from the trunk keeps our CI process happy and because we want to keep things shipping then it felt natural to release our functionality as often as possible.

We use feature toggles extensively (both in our new codebase and classic codebase) so that we can easily switch on/off functionality – we can activate new functionality for our own staff only so that those new features will be as thoroughly tested in live before our customers see them.

Any risk involved? Show the new feature to only a small percentage of our customers to ensure that it’s behaving as expected.

Getting our functionality out of the door every day though (even if it’s not switched on) brings a remarkable amount of confidence.  Knowing that we’re not pushing out something ‘big’ every 2 weeks but are pushing new functionality to our customers every day (and getting feedback on that quickly) really is the essence of agile I know, but I suspect had we blindly followed a single process we’d have released at the end of each timebox and not at the start of each day.

#### Monitoring/Reviewing

We’re not there yet with this, it’s an ever improving aspect of our work and an area where automation will play a big part in future.  That said, we have a massive amount of logging in place, as well as a custom set of business exceptions that make it very clear what has happened and why.  This is monitored every single day and at key flashpoints (releases being one of them) – a spike in Registration exceptions? dig in, see what it is, fix it if necessary and ship quickly.

Again, agile would have you ensure that you ‘review’ regularly, so this isn’t necessarily something that we’re doing that isn’t really ‘scrum’ or agile, but is instead just the specifics of how we are doing it.

Knowing on a Tuesday that we had 22 Affiliates exceptions on the Monday, none of which affected the user experience and all of which are resolvable, though 5 of those indicate a potential issue with a section of code… there’s something massively comforting about that.

As I’ve said to one of the guys at work – “_Everyone ships bugs, it’s how you find out about and deal with them that counts_”.  [Version 1 of your software will always suck](http://www.codinghorror.com/blog/2009/12/version-1-sucks-but-ship-it-anyway.html), but until you get it in the hands of real customers, who knows which aspects suck and which the users will love?  One developers ‘killer feature’ is another customers ‘meh’ (and indeed vice versa).

## Moving forward – honing the process

The good thing about where we are now is that it’s a start – you’d think if I were happier about it I’d wax lyrical a little more.  I’m over the moon with the way we manage projects, it works really well for us, and the cross pollination between scrum/kanban and other agile methodologies works a treat.

That said, we’ll never stop improving it, and we’ll never stop reviewing the process itself – if something isn’t contributing we’ll change it or remove it.  If someone comes up with a new way we could do X we’ll try it for a timebox or two and see if it can work.

Those who more practiced in agile will tell you that we’re embracing what agile is about I guess, and that it’s about adopting what works for you and your organisation and not to rigidly adhere to any one particular methodology.  I’d now agree with them and hopefully the above gives some indication of what works for us in tangible terms in a high impact, high release, high priority changing environment.
