---
title: "LeadDev London - 2022"
date: "2022-04-16"
thumb_img_path: images/2022/2022-06-08-header.jpeg
content_img_path: images/2022/2022-06-08-header.jpeg
excerpt: >-
  A write up of my first in person conference since before the pandemic, for what was a superb conference.
template: "post"
---

I was fortunate enough to attend this years’ LeadDev conference with 4 of my colleagues from [Healx](https://healx.io), which marked a return to in-person conferences for me.  LeadDev has been a firm favourite of mine as a conference for many years, so as Nick Means highlighted in his talk on Day 1, “I’ve been really looking forward to this moment”.

Below are my thoughts from the single track (a tiring, but powerful format that ensures you miss nothing), two day conference, including some details from talks that really resonated or generated great discussion with the team.  There was so much of the two days that fit into “confirmation bias”, but also a good smattering of “new”.  **The key to conferences like this is perhaps in the ‘getting out of your regular environment, deliberately to learn, reflect, and understand your own situation.**

These are in chronology rather than importance order.  If it’s TL;DR, you can also look through the tweet stream for the hashtag [#LeadDevLondon](https://twitter.com/search?q=%23LeadDevLondon&src=recent_search_click&f=live), which has some great takeaways too.

### Navigating the Chaos of Scaling

**Vitor Reis, @vitorreisdev**

Vitor shared a common challenge of scaling organisations, and individuals finding themselves “grow” into necessary new roles, and how they navigate that as the organisation continues to find success, new product market fit, and growth.

He highlighted that key focus areas should be:

- **Self Awareness** - perhaps one of the most important skills in your career for success. Knowing you likely aren’t the first person to have felt like this, or asked this question.
- **Be Replaceable** - this one may seem counter productive, but Vitor connected us to a great post around ‘[giving away your legos](https://review.firstround.com/give-away-your-legos-and-other-commandments-for-scaling-startups)’.  If you are in a scaling environment, be prepared to give away your job every few months, you will be focussing more on the right things - looking for new opportunities, and ensuring those around you have the skills to step into your area.  In reality in a lot of scaling companies, there is a LOT of lego to play with!
- **Focus on Communication** - if you’ve been there for the scaling journey, you likely have a lot of context.  But new starters will not - maximising communication is key.  He highlighted “writing is thinking” which was a great way to think about it - having those ideas written down is crucial to scaling.  He also highlighted you cannot over communicate - when you feel like you *are,* you are likely just touching on ‘enough.
- Be Efficient with Your Time - “Tell me how you spend your time, and I will tell you what your priorities are”.  What would happen if you didn’t attend that meeting? Or do that project? It’s a powerful tool to get on the right track.  How do you get better?
    - Anticipation - “high performing teams are teams with boring routines” - they’ve already anticipated and adapted things.
    - Be careful with over staffing - the easiest thing to do is hire people, but there’s a natural nod to the mythical man month here.
    - Poor organisational design - if you’re spending a lot of time in meetings, you may have an org design smell.  Meetings should never become the main demand of your time.

He closed out with an important point though - **“Chaos is part of the journey”**.  You will always be chaotic, things may feel very disorganised, but that’s ok.  You have to keep moving.

Try to enjoy the ride!

### Keeping your Codebase Fun at Scale

**Raul Chedrese, @raulchedrese**

One of a few talks that focussed on Developer Experience (DX) as a pathway to high performance, Raul’s talk focussed on:

- Understanding the developer experience
- Forming a vision to address the gaps
- Iterate towards the vision

He highlighted that the vision should be simple and memorable - something as simple as: Fast Developer Feedback, Strong Foundational Tools, and Fast Consistent, Self-contained architecture.  You’re creating a narrative people can get behind and iterate towards.

As a company focussing some of our own growth around how we address developer experience at the moment, there was much here that resonated.

### **CSS: Cascading Support Systems**

Phil Bennett, @phil_bennett

> What do Mark Zuckerberg, Steve Jobs, and Elon Musk all have in common? All three have demonstrated borderline traits of psychotic behaviour.
> 

This was a great opener to a talk on empathy in leadership.  We understand from much of the literature that empathy is essential to leadership and teamwork, and the data shows it’s a superpower.  Yet there are very few real life examples of tech leaders where empathy is one of their superpowers.  It seems success doesn’t play out in the big names we all hear about.

As an empath myself, who certainly absorbs much of what they interact with each day, Phil’s telling that even therapists have limits because of the emotional burden of handling the load from too many people.

He touched upon Solution Focussed Grief Therapy, something I’ve been a huge fan of since I was introduced to it by a friend who was a mental health nurse at the time - “If you wake up tomorrow and everything is perfect, you’re looking forward to X, you feel good about Y, what would be different to now? What would be in place?” etc. - it’s a great way of exploring a future state not by focussing on the problem, but on focusing on what the solution looks like.

The important part of all of this, and it was the ‘C’ in the title, is cascading it.  In larger teams, he encouraged us to have those people we work with ‘pay it forward’, and start to lean in to others in the team, creating a self perpetuating support network within them.

He closed with a challenge - start to lead with empathy, so that when someone googles “Tech leads who lead with empathy” we start to get some real results of people doing so.

### What Dashboards Don’t Tell You

**Laura Tacho, @rhein_wein**

Measuring productivity is a great thing, tracking against some of the bigger metrics (e.g the ~~four~~ five key metrics from DORA), but Laura highlighted that we needed to ensure that we are looking not only at the quantitative metrics, but also the qualitative.  Your dashboard looking at team performance is all well and good, but if your team are telling you “we’re moving so slow”, you have a datapoint that isn’t being surfaced and you should understand.

She highlights it’s often an XOR world between measures of activity and self-reported metrics, and we really should transition to an AND world.  Dashboards routinely don’t tell you anything about the self-reported metrics.

She had great calls out to Goodhart’s Law:

> "When a measure becomes a target, it ceases to be a good measure”
> 

She also had a great call out to vanity metrics (those that don’t actually mean anything, but are often tracked - e.g. ‘pull requests closed’, or ‘deployment frequency’) - she highlighted it is important to add friction by measuring it against another vector - for example, adding ‘change failure rate’ to ‘deployment frequency’.

She listed 3 papers that were great additional reading in this space - two of them I’ve read previously and wholeheartedly agree:

- [The SPACE for Developer Productivity](https://queue.acm.org/detail.cfm?id=3454124)
- [Mind the Gap: On the Relationship Between Automatically Measured and Self-Reported Productivity](https://arxiv.org/abs/2012.07428)
- [How to Misuse and Abuse DORA Metrics](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=883791)

She also connected this back to DX with a link to [Pick the right developer productivity metrics](https://maven.com/high-performing-software-teams/measuring-development-team-performance)

### **Scale, Scale, Scale! (Lessons from an engineering recruitment drive)**

**Jenny Sivapalan, @jenny_sivapalan**

One of the strong ‘confirmation bias’ talks, though still with some useful takeaways.  They had experienced many of the challenges many companies have around effectively getting people to join the company and she covered a number of areas:

- External recruiters
- Growing an internal talent team
- Sourcing candidates
- Process improvement to increase the ability to scale

Most of this we’d already done within our own org as we’d faced similar challenges, though it was good to hear that it was working well for others - especially in standardising and optimising the hiring funnel so that there was more consistency, and more ability to scale the steps out to the broader team so that the overall load was distributed more effectively.  This covered things like question templates, more effective technical tests, parallelising steps, etc.

There are some of the steps they’ve taken that I’ll definitely be bringing back to our own org for discussion.

### **People Building: Career Planning for your Direct Reports**

**Daniel Burke, @d2burke**

This talk highlighted some very real numbers from our field - 73% of staff were considering quitting their job in 2022, and voluntary attrition is estimated to be a $1trillion problem in the US.

He had a model around three steps:

- Position - where are you now?
- Plan - where are you headed?
- Progress - helping you get there

And there was a lot in here around measurement and accountability to each other as leads and ICs for part of the journey. 

I’ve written about career growth advice in the past, and Burke highlighted something I’d done too - ICs - your career growth is YOUR responsibility.  Though he qualified it with a useful message for managers - “your team’s career growth is your OPPORTUNITY.

Super important points too - just because there aren’t opportunities there at the ‘next step’ for an employee, that doesn’t mean they shouldn’t get to grow and plan into that space, and as managers, we should look for ways to facilitate that.

### Taking the 737 to the MAX!

**Nick Means, @nmeans**

I won’t try to do this justice by writing about it, Nick is a superb story teller, and it’s worth watching as soon as it’s released.  He uses the language and measurement in systems thinking to connect and understand the tragic events of the 737 Max a few years ago.  Hugely recommended!

### **A Commune in the Ivory Tower? - A New Approach to Architecture Decisions**

**Andrew Harmel-Law, @al94781**

Andrew explored the role of “architect” in an organisation, and ways to mitigate and remove the ‘role’ and bring everyone into the process.

He highlighted the [ADVICE process](https://www.idealist.org/en/careers/advice-process-seeking-feedback-decision-making), simplified to: Anyone can make a decision, but before doing that they must seek advice from all affected parties & people with expertise in the matter

As a lightweight process, it encourages discussion and input.  He supplemented this with lightweight Architecture Decision Records (ADRs) which incorporated:

- The title of the decision
- The decision
- Background context - the problem space
- Consequences - what could go wrong (this is where the input was captured)
- Advice - more input from the wider audience

He highlighted a quote from Ruth Malan on architecture - “it is very much about ensuring that conversations that are needed to be happening are happening.”

He then talked about some potential pitfalls in adoption:

1. - “Bad” Decisions - everyone thinks someone else's decision is bad.  Letting the team know (even via body language).  Let these turn into learning situations.
2. - Old guard == New guard.  Where people have “adopted” the process, but the people making/taking decisions, are the same people who used to do this - you’re left where you are, you don’t have new decidees.
3. - Off-the-grid decisions.  It’s a signal that #2 is happening.  Introspect to understand why that decision wasn’t brought forward and shared.
4. - No trust.  “Teal orgs”. If there’s no trust, this won’t work.

He gave a closing link to an article that he wrote that goes into the detail behind some of this: “[Scaling the Practice of Architecture, Conversationally](https://martinfowler.com/articles/scaling-architecture-conversationally.html?utm_source=LeadDev&utm_medium=Slide+deck&utm_campaign=LeadDev+London+2022)”

### Compassionate Refactoring

**Clare Sudbery, @claresudbery**

> Most people wish they made more refactors than they did, and most wish they made more improvements than they did

Clare brilliantly got to the core of refactoring, then explored it - put simply, refactoring “aims to make the code easier to understand, and cheaper to modify”.  She broadened this out though to ensure that we think about it holistically, across processes too - we can refactor our ways of working just as effectively as we can our code.

She covered a number of typical blockers to refactoring:

- External pressures (e.g. deadlines)
- Impatience (usually our own)
- Seeking of perfection - you have an idea about what good practice looks like, you measure yourself against it, then we get into guilt, shame and despair.  You’re not as good as the book, or the speaker.  None of these emotions are useful.
- When we lack self belief
- Lack of compassion

and highlighted we should apply compassion in these broader areas:

- Mitigate external pressure… “Ask for more time”.  Question deadlines, a lot of them are arbitrary.  It’s an investment in the future - it’ll be easier to work with in future.
- That you can forgive yourself for not doing a perfect job, or getting into a mess in the first place, because we can always refactor.
- We are fallible, and should use techniques to take account of the fact that we are fallible.  Dealing with things in small chunks.
- It’s ok for that first code to be rubbish.  It’s ok to not get everything right first time.
- Many more much smaller steps (MMMSS) - podcast - Geepaw Hill
- “Learn how to make the tiniest improvements to make the tests green.  Compassion is expecting just the smallest thing from ourselves”
- “Everyone is worried that they don’t know enough” - don’t let that block you making changes. That code may not have been refactored because someone didn’t have confidence in themselves.
- Show self compassion, believe in those little safe steps, and you can make a difference.

She linked off to [an article by Ron Jeffries](https://ronjeffries.com/articles/-z022/0222ff/my-mistakes/) where he talks about some of this and his own fallibility in this process.

## Closing Thoughts

The conference did exactly what it’s done in the past - that is a great balance between food for thought and reflection, some immediate “I want to go and change all the things!” and then, as Meri highlighted at the end, some very real thoughts and plans to bring back to my teams to discuss and look at continuing the improvement journey.

**I shall be back next year for sure.  If my team get their way, I shall have submitted a talk too!**