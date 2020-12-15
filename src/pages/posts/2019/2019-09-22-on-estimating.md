---
title: "On estimating things"
date: "2019-09-22"
thumb_img_path: images/2019/2019-09-22-header.jpeg
content_img_path: images/2019/2019-09-22-header.jpeg
excerpt: >-
  My thoughts on estimation in software delivery.  It'd be fascinating to hear from others on how they solve for this in their own orgs - what problems they've seen, and how you've risen above them.
template: "post"
---

I've had a number of conversations around estimation within software delivery recently, and thought I'd distil my view on this into a wider post.

It's worth stating in this post that I'm not advocating for a removal of estimation in teams - the [#NoEstimates](https://ronjeffries.com/xprog/articles/the-noestimates-movement/) movement has some compelling points, though I've personally felt can sometimes be overzealous in their application. What I will instead try to show are some of the challenges I've had with estimation, and some of the things that have helped to move past the need for estimation into a space where the relationship with the business is richer, and the outcomes better.

### On Deadlines

We've all worked in organisations where deadlines are a part of delivery. Deadlines give us a target, a focus, a thing to aim towards in that delivery. What I've found over the past 25 years of my engineering career have been that there are 'Deadlines' and '_Deadlines_'.

You have a fixed 'go to market' for something? You're sponsoring a TV show? You have some big campaign going out to launch in time for Christmas? Your product is seasonal and you need to get the new killer feature out before the season? In all of these scenarios, you of course need a deadline for delivery. Your market and customers demand it.

In all other circumstances, it's prudent to ask 'why' when there are deadlines - delivery of software is a partnership, it's a collaboration - the "business" and the tech coming together to solve problems. In competitive high performing companies, tech has [long since switched and moved further](https://medium.com/featured-insights/the-path-to-devops-ec47dca758a0) on that 'tech supports the business', 'tech collaborates with the business', to 'technology _is_ the business'. If you have sales breathing down your neck to deliver on 'X' because they've just finished a call with a big client and have promised it for that date without consultation with you, you have a bigger problem and there's no amount of help I can give in this document. You have to solve for the cultural first.

'Why' something has a deadline is incredibly important to understasnd though - the '[project management triangle](https://en.wikipedia.org/wiki/Project_management_triangle)' (much updated and adapted) still has some truth in it. If you fix cost and fix time, there is very little flexibility in getting towards delivery and what you will tend to then compromise on is scope or quality. This may be acceptable to your customer and your org, but it's prudent to have the conversation.

### Why do we struggle with estimation?

There are so many complexities in our own heads before we even start with estimation. As Daniel Kahneman highlighted in his book '[Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow)', our brains have two modes of thought - "System 1" (fast, instinctive) and "System 2" (slower, deliberate, methodical). Once we've performed one similar action, we tend to [anchor](https://en.wikipedia.org/wiki/Anchoring) our view and so deliver an estimate based on our experience of a similar thing that we've done. If we couple this with a number of the other things at play during estimation: Overconfidence, Hindsight, Assumptions and Optimism, Loss Aversion. Tie that in with some of the psychological biases - illusory correlation, fundamental attribution error, priming, confirmation, framing, and we're in a situation where we really will struggle to interpret our brain for anything more than trivial.

**So, can we not estimate?**

There is evidence that of course, we can do - for non-cognitive, mechanical tasks (place the heads on the dolls on a factory line) we don't have any ambiguity in the task, it requires little thought and little engagement of our system 2 brain, and can be relatively easily estimated. If I can put 100 heads on dolls in an hour, then it's safe to say that roughly speaking over a 7 hour active work day I can do approximately 700.

### **Why does estimation in software delivery go so wrong?**

Software delivery is rarely mechanical, and is rarely the repetition of some task that you have completed to the letter in the past. It is cognitive, it is new, it is problem solving, it is unknown.

The cone of uncertainty is something I've always found useful in this space.

[![Estimation vs Uncertainty](/images/2019/2019-09-22-estimation-vs-variability.png)](http://www.agilenutshell.com/cone_of_uncertainty)

More often than not at the start of any delivery, you really don't have clarity - there's significant uncertainty. What exactly are you delivering? How will it work? What will the user see? What happens when they click that button? All of these things are uncertainty.

This is one of the reasons agile has become so popular over the alternatives of waterfall and bigger project planning methodologies (PRINCE2 et al). If we can understand our delivery in much smaller bite size chunks, it's far easier to plan, do, check, act (as one model would) in regular cycles to diminish smaller uncertainty more rapidly.

When a business requestor asks for an estimate towards the left hand side of this graph, it's often through some constraint (artificial or otherwise) around budget or other business element.

Agile/Lean/etc. would encourage us to break down the work into bitesize chunks that are understandable - and once you have a team doing this effectively, it becomes far more predictable in the patterns of delivery - though to estimate the whole is still to engage in conjecture, as each small task has in itself some ambiguity. Each of these smaller tasks will have dependencies either upon the system, upon previous tasks, or upon externalised elements. As soon as you feel you're in the land of bite size, you still have enough uncertainty as to make it dangerous to estimate the whole.

### So, people want estimates - what can we do about it?

You could employ the 'think about the longest time you could possible take on a task and double it' rule of estimation, though this has two significant flaws. [Hofstadter's Law](https://en.wikipedia.org/wiki/Hofstadter%27s_law) suggests you're still wrong:

> It always takes longer than you expect, even when you take into account Hofstadter's Law.

The second significant flaw here is that you're not serving your customer or your business well. Businesses are made or broken by their relationship with their customer. The customer whom this feature will be written for. Why would you try to protect your team with lies rather than attempt to get at the root of the problem that has put you into this situation?

### Estimation - getting to the root of the matter

Ignoring the examples we gave early in the document around fixed dates (TV air dates etc.), most desire for estimates that I've seen in the past 25 years has been solved with two key things in place:

*   **Transparency** - the requestor can see the work flowing, they can get early access to demos of some of the functionality, they have regular discussion during delivery, they get early and often discussion on risk, they find out early about delay and why. Transparency in communications with key people in the business is paramount. It doesn't happen overnight, it's a relationship build. Dominica DeGrandis' book '[Making Work Visible](https://itrevolution.com/book/making-work-visible/)' is superb in this space.
*   **Trust** - the above naturally helps towards this, but it really comes down to trust once transparency is in place. Trust is complex in the making, and easily broken, but so long as a team is working in collaboration with the business requestor, and not seeing them as a different part of a different team, trust will evolve over time.

These are complex to build up - they are not to be considered in isolation. For example if your software delivery process doesn't allow you to break out functionality and regularuly demo 'parts' of a feature that the team are delivering then your only choice is to demo towards the end of delivery. With that, you risk having gone down a direction that wasn't truly wanted, you diminish transparency, which in turn will diminish trust.

You must have processes and practices in place that allow you to iterate quickly, get feedback regularly, and be transparent about how that feedback will change the direction of the product.

**This is hard. Really hard.** The alternative is to continue with this estimation dance though, and in doing so, you are mis-serving yourself, your business and the customer. **But that puts you and your team back at day 0, with the same problems, the same estimation issues, the same troubled relationship with the business. Nobody wants that.**