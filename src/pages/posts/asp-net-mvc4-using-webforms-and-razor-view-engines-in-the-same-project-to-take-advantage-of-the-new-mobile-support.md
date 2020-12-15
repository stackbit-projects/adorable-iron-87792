---
title: "ASP.NET MVC4 - Using WebForms and Razor View Engines in the same project for mobile teamplate support"
date: "2012-05-05"
template: "post"
---

**NOTE:** All content in this post refers to ASP.NET MVC 4 (Beta) and although it has a go live license, it has not gone RTM yet.  Although the process has been remarkably smooth, please work on a branch with this before considering it in your products!


We’ve been presented with an opportunity to create a mobile friendly experience for our [italian site](http://www.tombola.it/).  Our italian offering front end is an asp.net MVC 3 site using the webforms view engine (we started the project before razor was even a twinkling in microsoft’s eye), and is pretty standard in terms of setup.

There are a number of different ways of making a site mobile friendly – [scott hanselman](http://twitter.com/shanselman) has a written a [number](http://www.hanselman.com/blog/CreateAGreatMobileExperienceForYourWebsiteTodayPlease.aspx) of [great articles](http://www.hanselman.com/blog/EasyStepsToAMobilefriendlyResponsiveDesignWithAnEmbeddedYouTubeVideoAndAFluidResize.aspx) on how he achieved it on his blog, and [responsive design](http://www.abookapart.com/products/responsive-web-design) is very much a hot topic in web design at the moment (and that is a cracking book) and there are a lot of resources out there (both microsoft stack and otherwise) around learning the concepts.

Our italian site although div based and significantly more semantically laid out than our [UK site](http://www.tombola.co.uk/) (sorry!) would have still been a considerable task to turn into a responsive design as a first pass.  Our mobile site *will not* need to have every page that the non-mobile site has though – the purpose of the site is different, and the functionality in the site will be also.

Along comes [ASP.NET MVC 4](http://www.asp.net/mvc/mvc4) (albeit still in beta, but it has a go live license) with its support for mobile.  I really should care about how it works under the covers (perhaps a follow up post), though for now, basically if you have a View (Index.aspx) then placing a mobile equivalent (Index.mobile.aspx) allows you to provide a generic mobile version of a page.

### Upgrade your MVC3 Project to MVC4

Basically, follow: [http://www.asp.net/whitepapers/mvc4-release-notes#_Toc303253806](http://www.asp.net/whitepapers/mvc4-release-notes#_Toc303253806)

There were no problems in this step for us – we have a large solution, and there were a number of dependent projects that were based upon MVC3, but these were all easily upgraded following the steps at that URL.

### Setting up your view engines

We previously had removed Razor as a view engine from the project to remove some of the checks that go on when attempting to resolve a page, so our Global.asax had the following:

```csharp
// we're not currently using Razor, though it can slow down the request pipeline so removing it
ViewEngines.Engines.Clear();
ViewEngines.Engines.Add(new WebFormViewEngine());
```

and it now has:

```csharp
ViewEngines.Engines.Clear();
ViewEngines.Engines.Add(new RazorViewEngine());
ViewEngines.Engines.Add(new WebFormViewEngine());
```

The order is important – if you want your mobile views to use Razor in a WebForms view engine project, then razor must be the first view engine the framework looks to. If however you want to stick with webforms (or indeed you are only using razor) then your settings above will be different/non-existant.

### Creating the mobile content

We started by creating Razor layout pages in shared in exactly the same way that you would add a master page.  Open Views/Shared and right click, Add Item, and select an MVC4 Layout Page.  Call this _Mobile.cshtml, and [setup the differing sections that you will require](http://blogs.msdn.com/b/marcinon/archive/2010/12/15/razor-nested-layouts-and-redefined-sections.aspx).

To start with, as a trial I thought I’d replace the homepage, so navigate to Views/Home, right click, and ‘Add View…’ – create ‘Index.mobile’ and select Razor as the view engine – select the _Mobile.cshtml page as the layout.

Ok, we now have a non-mobile (webforms view engine) and a mobile (razor view engine) page – how do we test?

### Testing your mobile content

The asp.net website comes to help again.  They have a [great article on working with mobile sites in asp.net MVC4](http://www.asp.net/mvc/tutorials/mvc-4/aspnet-mvc-4-mobile-features) (which indeed is far better than the above, though doesn’t cover the whole ‘switching view engines’ aspects).

I installed the tools listed in that article, and loaded up the site in the various testing tools and was presented with the following:

[![image](/images/image_thumb25.png "image")](http://idisposable.co.uk/wp-content/uploads/image25.png)

That’s Chrome in the background rendering out the standard site, upgraded to MVC4 but still very much using the webforms view engine and master pages, and [Opera Mobile Emulator](http://www.opera.com/developer/tools/mobile/) (pretending to be a HTC Desire) in the foreground using Razor view engine and layout pages.

### Conclusion

The rest, as they say, is just hard work ![Smile](/images/wlEmoticon-smile6.png)  We very much intend to make the mobile site responsive and our CSS/HTML will be far more flexible around this, though with [media queries](http://coding.smashingmagazine.com/2010/07/19/how-to-use-css3-media-queries-to-create-a-mobile-version-of-your-website/) (some examples [media queries](http://mediaqueri.es/)) and the book above in hand, that will be the fun part.

The actual process of using both Razor and WebForms view engines in the same project was a breeze and means that longer term the move over to Razor for our core site should be far more straight forward once we’ve worked through any teething troubles we have around the work above.  Razor as a view engine is far more conscise and (dare I say it!) pretty than webforms and the gator tags, so I look forward to using it in anger on a larger project like this.

It may be longer term that there are pages on the site that lend themselves towards not having duplicate content in which case we will investigate making the core design more responsive in places, but for now, we have a workable solution to creating mobile content thanks to the mobile support in ASP.NET MVC4.

 

Hope that was useful.
