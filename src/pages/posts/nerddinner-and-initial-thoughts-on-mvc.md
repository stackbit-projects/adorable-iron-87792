---
title: "NerdDinner, and initial thoughts on MVC"
date: "2009-06-18"
template: "post"
---

Although I’ve not yet finished it, I thought I’d start my wee reflection on MVC as learned through [NerdDinner](http://tinyurl.com/aspnetmvc).

Obviously, the immediate thing that hits you is that you aint in Kansas any more – ignore the asp.net postback model, it’s all change and there is going to be some significant re-learn before I get anywhere near good I think.

I do love the [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns), the theory behind it is sound from a maintenance and extensibility point of view.  Keeping my model tucked away nicely, and using it to provide the meat that the controller feeds of, which then in turn drives the View I think makes perfect sense.  I need to work far more heavily on the [URL Routing](http://blog.dmbcllc.com/2009/03/26/aspnet-mvc-routing/) before starting to design anything bigger just to see how a richer navigation hierarchy will sit.

I love the way postbacks are handled (at least in the NerdDinner app) and AcceptVerbs() just makes sense to me.  I can see I’m going to have to read up a bit more on programming against an interface, as I haven’t covered so much of this.  I wasn’t a big fan of the [Respository pattern](http://www.martinfowler.com/eaaCatalog/repository.html), I’d have perhaps gone down the [facade](http://en.wikipedia.org/wiki/Facade_pattern) route, or (when and if I understand it) perhaps [IoC](http://www.martinfowler.com/articles/injection.html) will help with this, though obviously this was just one example.

It’s my first successful play with [Linq to SQL](http://weblogs.asp.net/scottgu/archive/2007/05/19/using-linq-to-sql-part-1.aspx), and I’m liking the abstraction and the codified approach to it, though I’ll have to run some heavier tests through SQL Profiler to see how it works in terms of performance.

I’m going to have to look through the source code to find out just how all of the helper methods work rather than just use them – chucking Html.ActionLink() on the page is all well and good, but I want to know what it actually does in the code (easily enough done now that MVC [source code is available](http://weblogs.asp.net/scottgu/archive/2008/03/21/asp-net-mvc-source-code-now-available.aspx))

I’m only just getting now to the integration/work with Ajax, which I think will be interesting – I shall keep the blog updated with stuff as I cover it.
