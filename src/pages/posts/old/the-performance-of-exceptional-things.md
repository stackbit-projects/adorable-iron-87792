---
title: "The Performance of Exceptional Things"
date: "2010-05-14"
template: "post"
---

Following up from my [previous blog post](http://idisposable.co.uk/2010/05/business-exceptions-in-c-as-i-understand-them/), I’ve had some cracking feedback from a number of people both for and against the use of exceptions – it’s one of those areas (as so many are in coding) that really does seem to have its own holy war.

On one side, those that are against the use of exceptions for ‘program flow’ (though I suspect if I looked at use cases in detail, I probably would be too) and see exceptions more for exceptional circumstances.  The approach favoured by this group tends to be in returning state and programming defensively to avoid exceptions wherever possible.

I totally agree with that final statement – if I have a method ‘IsLoggedIn’ and the user isn’t, then a simple ‘false’ will do and I’ll program defensively in that method to ensure that simple things like NullReferenceExceptions etc. aren’t thrown.

The other group like seem to like the concept of Business Exceptions as a means of handling logic, though (like me) they all wondered about the performance of that approach.

### My Use Case

In the example code I put together for the last post, I used the business process of logging in the customer as a use case.  I could have equally used the concept of payments into the site, though obviously a far more significant use case that would have had me writing demo code long after it made sense to do so!

In my exceptions (User Not Found, Password Mismatch, Account in various ‘no play’ states), I’ve just done an analysis of yesterdays traffic to our site (which is hitting approx 1.8-2million unique visitors per month), and we have the following errors (all day):

- User Not Found - 1842
- Password Mismatch - 1125
- Account Self Excluded / Account Cooling Off / Account Disabled / Account Closed - 240

So basically, 3207 things that in our new software will throw exceptions throughout a 24hr period, or 134 per hour, or 2.3 per minute.

Obviously there are payment type errors to take into account, which I suspect will be busier, lets say up to 20-30 exceptions per minute (tops).

### So just how heavy are these exceptions?

I’ve updated the hosted code I used in the previous post, and have created two approaches to getting user data – one via models, one via exceptions.  The main web navigation at the top of the page will allow you to test with exceptions or test with models.

I basically setup a test to fail login (User Not Found), and iterated through it 10,000 times, and the code is in there both for exceptions and testing returning models.

I then iterated over those 10,000 tests 10 times each.

Yup, I know this isn’t really as indicative a test as it demonstrates best possible outcomes (the exceptions being repeatedly called will obviously do some form of optimisation that is beyond me!), but it’s helpful as one measure when the core thing people mention is performance.

And yup, there *is* a performance hit when throwing exceptions – no denying it.

But when you look at the code, failing login and returning a model (single run of 10,000 fails) averages out at **289.6ms**, whereas with Exceptions, the same 10,000 iteration comes out at **624.1ms**.  That makes a single exception (my maths is shite, so happy to be corrected on this) take **0.034ms** more to throw.

**Oops!** Ignore the ticks figures below - I actually (stupidly) divided Ticks by 10,000 rather than Stopwatch.Frequency, so they'll be slightly out - the milliseconds figures reflect reality though.

 
|       |**Measured in<br />Ticks**|          |**Measured in<br />Milliseconds**|          |
|-------|---------------------|----------|----------------------------|----------|
|**Run**|**Exceptions**       |**Models**|**Exceptions**              |**Models**|
|1      |2150098              |1009757   |628                         |290       |
|2      |2165310              |1018790   |624                         |287       |
|3      |2144660              |1018190   |622                         |288       |
|4      |2136548              |1012047   |623                         |293       |
|5      |2139677              |1009204   |621                         |289       |
|6      |2154162              |1011982   |627                         |289       |
|7      |2146923              |1019645   |623                         |290       |
|8      |2167315              |1026824   |623                         |289       |
|9      |2148493              |1011428   |626                         |291       |
|10     |2156894              |1008608   |624                         |290       |
|**Avg Ticks**|2151008        |1014648   |                            |          |
|       |                     |          |                            |          |
|**Avg Ms**|215.1008          |101.4648  |624.1                       |289.6     |
|       |                     |          |                            |          |
|**Ms per iteration**|0.02151008|0.010146|0.06241                     |0.02896   |
|**Cost Increase for Ex**|    |0.011364  |                            |0.03345   |


### Where are the real stats?

Well, this is where my naivety kicks in and I really must defer to clever people.  Odd to think I’m a senior dev when I can’t effectively dig any further into it than where I’m at currently, but I’ve found a few cracking posts that really help me see that I’m happy with the approach we’re taking with regards to Business Exceptions (I promise to post when this goes live to let you know if the performance hit took our site down though!).

**Blog 1 – Rico Mariani**

Rico is (as they say) the man, and he really knows his stuff – he certainly sits on the ‘don’t do this’ side of the holy war, and has good reasons.  He highlights that iterative testing like the above is certainly a ‘best case’ and wouldn’t demonstrate typical usage.

[http://blogs.msdn.com/ricom/archive/2006/09/25/771142.aspx](http://blogs.msdn.com/ricom/archive/2006/09/25/771142.aspx "http://blogs.msdn.com/ricom/archive/2006/09/25/771142.aspx")

**Blog 2 - Jon Skeet**

I like this one, it kinda supports our approach! lol.  In particular, a great quote from him:

_“If you ever get to the point where exceptions are significantly hurting your performance, you have problems in terms of your use of exceptions beyond just the performance.”_

[http://yoda.arachsys.com/csharp/exceptions2.html](http://yoda.arachsys.com/csharp/exceptions2.html "http://yoda.arachsys.com/csharp/exceptions2.html")

**Blog 3 – Krzysztof Cwalina**

This is *exactly* how I see our approach to exceptions, and I agree with Jon Skeet, I couldn’t have put it even 10% as good as Krzysztof has.  His bullet point list of Do’s and Don’ts is brilliant.

[http://blogs.msdn.com/kcwalina/archive/2005/03/16/396787.aspx](http://blogs.msdn.com/kcwalina/archive/2005/03/16/396787.aspx "http://blogs.msdn.com/kcwalina/archive/2005/03/16/396787.aspx")

**Code Project Post – Vagif Abilov**

I thought this one interesting as he’s gone into far more detail in terms of the tests than I have, and his conclusions are interesting.

[http://www.codeproject.com/KB/exception/ExceptionPerformance.aspx](http://www.codeproject.com/KB/exception/ExceptionPerformance.aspx "http://www.codeproject.com/KB/exception/ExceptionPerformance.aspx")

**Blog 4 – Eric Lippert**

Not one so much on performance, as a ‘don’t throw exceptions when you don’t need to’, and there are often ways around throwing exceptions if you code ‘well’.

[http://blogs.msdn.com/ericlippert/archive/2008/09/10/vexing-exceptions.aspx](http://blogs.msdn.com/ericlippert/archive/2008/09/10/vexing-exceptions.aspx "http://blogs.msdn.com/ericlippert/archive/2008/09/10/vexing-exceptions.aspx")

**Blog 5 – Krzysztof Cwalina**

Another that I’ve linked to just for the quote which very much reflects my thinking:

_“One of the biggest misconceptions about exceptions is that they are for “exceptional conditions.” The reality is that they are for communicating error conditions. From a framework design perspective, there is no such thing as an “exceptional condition”. Whether a condition is exceptional or not depends on the context of usage, --- but reusable libraries rarely know how they will be used. For example, OutOfMemoryException might be exceptional for a simple data entry application; it’s not so exceptional for applications doing their own memory management (e.g. SQL server). In other words, one man’s exceptional condition is another man’s chronic condition.”_

[http://blogs.msdn.com/kcwalina/archive/2008/07/17/ExceptionalError.aspx](http://blogs.msdn.com/kcwalina/archive/2008/07/17/ExceptionalError.aspx "http://blogs.msdn.com/kcwalina/archive/2008/07/17/ExceptionalError.aspx")

**Exception Management Guidance – Multiple authors**

Some good feedback re: exceptions in this post.

[http://www.guidanceshare.com/wiki/.NET_2.0_Performance_Guidelines_-_Exception_Management](http://www.guidanceshare.com/wiki/.NET_2.0_Performance_Guidelines_-_Exception_Management "http://www.guidanceshare.com/wiki/.NET_2.0_Performance_Guidelines_-_Exception_Management")

### Closing

I’ve updated the code on Google Code at: [http://code.google.com/p/business-exception-example/](http://code.google.com/p/business-exception-example/ "http://code.google.com/p/business-exception-example/") to cover both Exceptions and Models if anyone wants a looksy.

Again though, really interested in hearing thoughts on this.  I think from the performance testing I’ve done and the posts I’ve read, I’m happy with our approach, but I’m equally happy for someone to come along and shout [NOOOOOOO!](http://www.nooooooooooooooo.com/) and tell me why I’m an idiot :)

Over to you guys, and thanks for all the feedback thus far!
