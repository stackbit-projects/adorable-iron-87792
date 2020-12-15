---
title: "Localisation of your ASP.NET MVC 3 Routes"
date: "2011-08-21"
template: "post"
---

Our core product has recently undergone a localisation exercise as we plan to launch it in other european countries.  One of the first things we needed was to localise the routes on a per-country basis.

We started out remarkably luckily in that every route we delivered in the app was already custom.  We didn’t like the default route handler (Controller/Action/{stuff}) URL structure, and although we could have gone down the custom route handler approach, there were a few things that steered us away from that.

1. we wanted full flexibility from an SEO point of view – as we dev’d we had no idea what would work well from an SEO point of view, so having each potential route customisable to whatever our SEO company desired was going to be a bonus.
2. longer term plans will see us delivering a content management system to deliver an awful lot of the content – at that point, we may well be delivering custom routes via the DB too, so having a flexible routing system was essential.

### Why not the default routes?

An example of some of the ‘out of the box’ routes we’d have gotten with the default route handler, versus what we actually wanted:

/MyAccount/UpdatePersonalDetails –> my-account/personal-details

/Winners/ByGame/{GameName} –> winners/by-game/{game-name}

Although generally, the conversion was a hyphen between caps and a full lowercasing, we found that replacing the default route handler with a custom ‘HyphenateAndLowercaseRouteHandler’ just didn’t answer enough of our use cases.

I’m sure google, bing and the other search engines will happily look at pascal cased words and discern them, though I as a human find it easier to read /our-new-game-has-paid-out-3-million-so far than /OurNewGameHasPaidOut3MillionSoFar.

One of the big selling points for not using the default routing was flexibility – we can change the routes without having to refactor/rename controllers or action methods, so there is a real separation there.

So, we started to build up our routing table with custom entries for each controller/action such as:

```csharp
 routes.MapRoute("GameHistory", "game-history/{gameName}/{room}",
						new
						{
							controller = "BingoGamesHistory",
							action = "Index",
							gameName = "Bandit",
							room = "the-ship"
						}, namespaces);
```

and to date, across the whole front end application we have 183 custom routes.

### Localising the Routes

It almost feels sham-like to be writing a blog post about this, though I still see questions on stack overflow about it, so thought I’d write this up.

What we did in the above example was replace the string (“game-history/{gameName}/{room}” with a localised resource – we now have a LocalRoutes which has something like the following:

[![image](/images/image_thumb23.png "image")](http://idisposable.co.uk/wp-content/uploads/image23.png)

and the routes.MapRoute command in global.asax replaces the string representation of the route with LocalisedRoutes.GameHistory_General.

Obviously from this point on, it’s then just a matter of adding a LocalisedRoutes.GameHistory.it, or LocalisedRoutes.GameHistory.es etc. to get the represnetation of the routes for those countries, and in our CI deployment the plan is to alter the web.config depending upon the deployment:

```xml
<globalization uiCulture="it-IT" culture="it-IT" />
```

Jobs a good un ![Smile](/images/wlEmoticon-smile3.png)

### What next?

As I say, the next big phase of our project will include a content management system, so may well require us to have runtime routes injected into the routing table – I’ve never done it, but it’s something to be aware of. 

### Sample Project

I’ve put together a simple project that demonstrates the above which will be something that folks can base their solutions upon if they they are having difficulty with the above description.  The example only localises routes, so the UI still remains in english, but you get the idea.

Download the example at [google code](http://routing-localisation-example-aspnet-mvc3.googlecode.com/svn/trunk/)
