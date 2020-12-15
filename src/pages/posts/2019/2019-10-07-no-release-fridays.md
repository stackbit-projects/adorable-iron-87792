---
title: "On 'No Release' Fridays"
date: "2019-10-07"
thumb_img_path: images/2019/2019-10-07-header.jpeg
content_img_path: images/2019/2019-10-07-header.jpeg
excerpt: >-
  My thoughts on not releasing code to production on a Friday.  It seems likely it'll spark controversy, though I hope it sparks discussion.  For any of my network who are geographically close to me who'd like to debate this, the beers are on me ;)

  What position do you take on it?
template: "post"
---

There has been a lot of discussion on twitter around software engineering, and the idea of 'no release fridays'. There are people taking either side of the debate, and it's significantly divisive at times.

Those advocating for not releasing to production on Fridays highlight that it's not fair to your customers or your staff - the risks associated with a friday release, longer hours to support any issues, your customers potentially finding bugs and issues between that long dark gap between 5pm friday and 9am monday. The points always hinge around reducing the risk to those people who are most important to us - our customers and our staff.

Those advocating for releasing on fridays have many points, which I won't delve into directly as I'm aligned to them so wanted to give my take on this topic.

### My view on no release fridays

I've long been an advocate of a team being able to release at any point of the day or night. I advocate for this position on the understsanding that releasing code creates risk - it creates risk to our customers, and it creates risk to those that would have to support that code. That in turn creates risk for business reputation.

_But, and here's the kicker - this is true of every single release of code you do into production. Risk is inherent in software releasing._

Once we accept this, we're very much into the realms of continuous improvement. Teams so often focus on 'agile' or some form of iterative rapid process, but I've witnessed a lot of teams doing this in name only. Ultimately, [kaizen](https://en.wikipedia.org/wiki/Kaizen) - or continuous improvement - should be a mantra. The agile manifesto even opens with _"We are uncovering better ways of developing software by doing it and helping others do it"_, and the principles close with _"At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly."_ If we take these two as important, what are we doing to remove risk from releasing as a team? How are we becoming more effective? Lean would have us focus on the process for delivery of products just as much as the actual delivery of products. Improve something a little every day. We could jump into the [Theory of Constraints](https://www.leanproduction.com/theory-of-constraints.html) here, though I'll just link to it for now for brevity.

I will add, I'm certainly not advocating for irresponsible releasing - if it's 5pm on a Friday, and you're not prepared to spend some time with that release ensuring that it's operating as you expect it to, then you likely shouldn't be doing it.

If something is painful and you don't have to do it, don't do it. **If something that you have to do regularly is painful, find a way to attack and minimise the pain.** Not improving your processes for "reasons" - be it 'we're too busy shipping' or 'management won't buy in' or something else isn't a good enough excuse. Take baby steps towards better, iterate, and show what better looks like - you're investing in your future competence as a software team to deliver effective products.

### _Risk and Batch Size Reduction_

Software teams aspire to reduce risk in their releasing. There is no such thing as zero risk - even not releasing has consequence and risk, as there are no systems in production currently that are bug free.

If you have an active engineering team on a product (3-5 engineers) and release into production weekly and something goes wrong, diagnosing it becomes a significant time sink and potentially reputational and profit cost for your business. Couple that with the corrolary - teams who have not yet reached the maturity level to release regularly are also less likely to be able to remediate quickly when those issues arise.

If we aspire to a [batch size of one](https://software.danielwatrous.com/software-development-and-batch-size/) when it comes to releasing code into production, then we already understand that larger batch sizes increase risk - sometimes exponentially. In reducing batch size, we're hoping to mitigate a lot of the risk that comes from code clash, overlapping and the wider implications inherent in complex systems. You can mitigate a number of these with automated testing, but as they say - software engineering is the art of shipping bugs!

**Why do I labour this point?** Because in not releasing on a friday, what you are essentially doing (I agree, this is a reductionist view) is increasing risk - your monday release becomes so much more complex because you didn't push to production on friday. Of course, we could advocate for doing no work on a Friday as a fix to this, and that is one way to solve the problem...

**I would argue though that for software houses that still write code on a Friday, you should be thinking differently.**

### Every release is risky - focus on that

Every single release we push should have approximately the same risk, be that midday Wednesday, or 5pm Friday. If we take that as the mindset, and we have already established we care about our customers and our staff, the question then becomes about how do you mitigate and de-risk _every single software release_. This is not an unhealthy mindset to have!

### Techniques to get better at releasing sofware

This list isn't exhaustive, and is merely guidance on how you can approach this as a team. Your current organisation, the health of your code base, the maturity levels of your team will all play a part in this. [Cargo culting](http://ryantomlinson.com/avoiding-cargo-cult-agile-and-watermelons/) solutions from others without considering that local context would be foolhardy at best - solve for your local problems.

We want, in our release process, to maximise confidence. Confidence that your feedback loop is catching the majority of issues found. Confidence that when issues are found they are swarmed, learned from and remediated. Confidence that we have enough quality in our coding approaches, our pipeline, and our delivery.

Some elements that may help:

*   **Feature Flagging** - this has often been cited by people advocating for releasing at any time, and in my own experience is one of the key enablers to releasing more regularly. Decoupling code releases from feature releases gives you so much power. Once you build up confidence with this approach, then a push on a Friday can regularly just be that - a push - and you can toggle on that feature for just yourself, a small % of your users, or leave it until monday. There are many commercial and OSS offerings out there for feature flagging, and you should consider these as a tool to increasing confidence.
*   **Test Automation** - it seems trite to say in 2019, but write tests! Unit tests are good, but do what gives you most confidence - I personally find that end to end tests work best for this for me.
*   **Test your Deployments / Test in Production** \- traversing key pathways in the system that customers will do as soon as that code goes live (or ideally, while it's being staged to switch over to a customer) will give you a lot of confidence. Couple that with regression testing when situations arise that were outside expected norms, and you can build up quality here significantly.
*   **Manual Task Automation** - where do manual steps exist in your value stream? Do you do enough to automate out all of those that you can do? There is no such thing as a perfect release process, but you can always strive for better - one of the key early wins for a lot of teams can be to remove humans from the value stream where possible. A lot of teams may well give the 'we have manual testers/QA in our pipeline', though this doesn't have to be a reason not to automate delivery - if you adopt feature flagging (see above), your testers can switch on features in production for themselves and validate those features and their role becomes more asynchronous to releasing code.
*   **Measurement** \- you cannot move quickly if you're not measuring. How do you know your code is working? How do you know it's being used? How do you know it's not regressing? If you do nothing else around measurement, focus in on the [four key metrics](https://www.thoughtworks.com/radar/techniques/four-key-metrics) (highlighted in [Accelerate](https://itrevolution.com/book/accelerate/) by Fosgren et al.)

### Value Stream Mapping

Do not underestimate the power of understanding your systems. Engineers, Ops, Testers, 'The Business' will all have a view of your systems - what it looks like from idea through to production. No one group has the panacea of visibility of this, so come together in order to fully understand your systems. Understand where those value add and non-value add parts of your value stream are, and attack your constraints (as per ToC) ruthlessly.

### So should you release on a friday?

You should minimise risk in whatever way you can with software releasing. You should get to a point where every release is as risky as the last. You should have enough quality in place that your confidence levels of releasing safely are as high as they can be.

What you'll likely find after getting to that level of maturity, and constantly striving for better is that you won't even think about releasing on Friday as a 'thing' - it'll just be 'releasing' and it'll become the norm.