---
title: "TeamCity - Install and Setup (Basics)"
date: "2010-12-30"
template: "post"
---

Been a while since I posted and I thought that the past few days warranted getting my thoughts down as we’ve just setup our first foray into [Continuous Integration](http://www.martinfowler.com/articles/continuousIntegration.html)/[Build Automation](http://en.wikipedia.org/wiki/Build_automation) with [TeamCity](http://www.jetbrains.com/teamcity/).  We’re in the process of rewriting the corporate site from classic asp/asp.net into an MVC2 front end with some solid (though not always [SOLID](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)) design behind it.  We’ve written a lot of unit tests (though many more to go), and thought it was about time we looked at the whole CI/Build side of things.  I’d hasten to add, the following post will remain at a fairly basic level, as that’s where I’m at at the moment – hopefully something in here will be useful, though it’s as much about documenting the steps for the team I work with and whenever I write something like this down it always helps solidify it in the grey matter.

### Why Continuous Integration/Build Automation?

The answers for us fit pretty much into the standard reasons behind CI – primarily ensuring quality, though easing the deployment burden was certainly a part of it.  CI completes the circle really – you’ve written your quality code, you’ve written your unit tests (and any other tests, integration, UI, etc.), so why not have an easy way to get all of that validated across your whole team, making sure that the quality remains and that you don’t have the manual task of pushing the code out to your dev servers? 

Continuous Integration helps with all of this, and a whole lot more, though the ‘more’ part is something that will come in time for us I think – we now have a working checkin build (I’ll detail the steps I went through) so that at least gives us ongoing feedback.

[TeamCity](http://www.jetbrains.com/teamcity/) was the immediate choice for us as we don’t really qualify for a TFS setup and [CruiseControl.net](http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET) seemed to have a higher learning curve (I may be mis-representing it here mind).

Before going through the detail of the install, a quick shout out to Paul Stack ([@stack72](http://twitter.com/#!/stack72/)), the fantastic [Continuous Integration](http://www.manning.com/kawalerowicz/) book from Manning, and the as yet unread [MS Build book from Microsoft](http://www.microsoft.com/learning/en/us/Books/12999.aspx) – these as well as the blog posts from many have helped massively in getting this setup.

### Team City 6 – Install

Generally, the defaults in the setup were fine.  I made sure that all options were enabled with regards to the service etc. – I can’t see the use case when you wouldn’t want this, but it’s worth stating.

[![image](/images/image_thumb4.png "image")](http://idisposable.co.uk/wp-content/uploads/image4.png)

I changed the path to the build server configuration to a more general location – it initially suggested my own windows account user area, though I was unsure (and couldn’t find easy documentation) on whether this would make the configuration available to others, so I defaulted to a different path.

[![image](/images/image_thumb5.png "image")](http://idisposable.co.uk/wp-content/uploads/image5.png)

With regards to server port (for the TeamCity web administration tool) I changed the default port too.  Although it’s recommended that the build server remains as a single purpose box, I felt uncomfortable going with the default port 80 just in case we ever chose to put a web server on there for any other purpose.

[![image](/images/image_thumb6.png "image")](http://idisposable.co.uk/wp-content/uploads/image6.png)

I also chose to stick with the default and ran the service under the SYSTEM account – it doesn’t seem to have affected anything adversely and I’d rather do that than have to create a dedicated account.

### Team City – Initial Setup

Initially you are asked to create an administrator account – do so, though if you’re in a team of people, there is an option later to create user accounts for each user – far better to do that and leave the admin account separate.  In the free version you can have up to 20 users, so it’s ideal for small teams.

### Create a Project

The first steps in linking up your project to TeamCity is to create your project.

[![image](/images/image_thumb7.png "image")](http://idisposable.co.uk/wp-content/uploads/image7.png)

Here, you can give the project any name and description – it can (though doesn’t have to) match the project name in Visual Studio.

[![image](/images/image_thumb8.png "image")](http://idisposable.co.uk/wp-content/uploads/image8.png)

TeamCity from this point on holds your hand fairly effectively.

[![image](/images/image_thumb9.png "image")](http://idisposable.co.uk/wp-content/uploads/image9.png)

oh, ok – thanks ![Smile](/images/wlEmoticon-smile.png) <click>

The build configuration page has a lot of options, but some of the pertinent ones (at least early doors – once you have more experience, which I don’t, then the others will certainly come into play).

**Name your build** – I named ours ‘checkin build’ as I intend for it to happen after every checkin… does what it says on the tin kinda thing.

**Build number format** – I left this as the default ‘{0}’ – it may be prudent to tie it in later on with the Subversion version number, but for now, we want to get a working CI process.

**Artifact Paths** – very much steered clear of this at the moment – it seems there’s a lot of power in these, though I haven’t touched on them enough.

**Fail Build If –** I went with the defaults plus a couple of others – ‘build process exit code is not zero’, ‘at least one test failed’, ‘an error message is logged by the build runner’.

Other than that, I pretty much stuck with the defaults.

### Version Control Settings

[![image](/images/image_thumb10.png "image")](http://idisposable.co.uk/wp-content/uploads/image10.png)

I deliberately selected to checkout to the agent as I suspect this’ll give me more scalability in future – the build server can have multiple build agents on other machines from what I understand (kinda the distributed computing model?) and those agents can handle the load if there are very regular/large team checkins.  I think there are limitations on build agents in the free version, but again – if we use this solidly, and need more, then the commercial license isn’t too badly priced.

I also chose a different checkout directory to the default, just because – no solid reason here other than I have a lot of space on the D: drive.

Our project is significant (24 VS projects at last count, a lot of them testing projects (1 unit and 1 integration per main project), and initially I experimented with ‘clean all files before build’ but the overall build was taking approximately 8mins (delete all, checkout all, build, unit test) – I’m going to try to not clean the files and do a ‘revert’ instead but at present, I don’t have any experience on which is better – certainly cleaning all files worked well, but 8mins seemed a while.

**Attach to a VCS Root**

The important part – linking up your project to your source control (subversion in our case).

[![image](/images/image_thumb11.png "image")](http://idisposable.co.uk/wp-content/uploads/image11.png)

Click ‘Create and attach…’  Most of the settings in here are defaults, but you will notice further down the page it defaults to subversion 1.5 – we’re using 1.6, so double check your own setup.

[![image](/images/image_thumb12.png "image")](http://idisposable.co.uk/wp-content/uploads/image12.png)

I also experimented with enabling ‘revert’ on the agent ala:

[![image](/images/image_thumb13.png "image")](http://idisposable.co.uk/wp-content/uploads/image13.png)

With an aim to bringing down the overall build time – I haven’t played enough to warrant feedback yet, though I suspect the revert will work better than a full clean and checkout.

### Build Steps

The CI build will be broken into a number of steps, but firstly we need to get the core project building on the agent.  There will be a lot more to learn on this one, but for now, what worked well for us was the following:

[![image](/images/image_thumb14.png "image")](http://idisposable.co.uk/wp-content/uploads/image14.png)

Our Solution file contains all the information we need to work out what needs to be built, and TeamCity supports it so jobs a good un.  As I extend the base build then this method will still just work as I’ll be modifying the .csproj files belonging to the solution anyway.

### Build Step 2

This one was slightly more convoluted, but basically, giving relative paths to the DLLs that contain the unit tests is the way forward here.

[![image](/images/image_thumb15.png "image")](http://idisposable.co.uk/wp-content/uploads/image15.png)

Make sure you target the right framework version (I didn’t initially, though the error messages from TeamCity are pretty good in letting you figure it out).

Build Triggering

We want this all to trigger whenever we checkin to our source control system (in our case, subversion), so when we click on ‘build triggering’ and ‘add trigger’, selecting ‘VCS Trigger’ will get you everything you need:

[![image](/images/image_thumb16.png "image")](http://idisposable.co.uk/wp-content/uploads/image16.png)

### Are we there yet?

Well, just about – you will see the admin interface has a ‘run’ button against this configuration (top right of browser), lets do an initial run and see what the problems are (if any).  You can monitor the build by clicking on the ‘agents’ link at the top of the page and then clicking on the ‘running’ link under the current build.

Should you get the message:

… Microsoft.WebApplication.targets" was not found…

This basically happens because you don’t have web deployment projects (or indeed VS2010) installed on the build server.  The path of least resistance is to copy the C:\\Program Files\\MSBuild folder over to the build machine’s Program Files folder (if x64, make sure you put it in the x86 one).  You should find the build just works after that.

### Ok, Build is working – Tell me about it!

Notifications were the last thing I setup (make sure you’ve setup a user account for yourself before you do this, the admin account shouldn’t necessarily have notifications switched on).  Click on ‘My Settings & Tools’ at the top and then ‘Notification Rules’.

I’ve setup an email notifier (which will apparently tell me of the first failed build, but only the first after a successful), and I’ve downloaded the windows tray notifier (My Settings & Tools, General, right hand side of the page) which is setup likewise.

### Next Steps?

There are a lot of other tasks I want to get out of this, not just from a CI point of view.  I’ve deliberately (as @stack72 suggested) kept the initial setup ‘simple’ – getting a working setup was far more important than getting an all encompassing setup that does everything I want from the off.  I can now see the guys doing their checkins and the tests passing, I’m now far more aware if someone has broken the build (and lets face it, we’ll all deliberately break it to see that little tray icon turn red), and I know there’s so much more that I can do.

Next priorities are:

1. Learn MSBuild so that I can perform tasks more efficiently in the default build – e.g. I want to concatenate and minify all CSS on the site, I want to minify our own Javascript, etc.
2. Setup deployment on the checkin build – I suspect this will use Web Deployment Projects (which themselves generate MSBuild files so are fully extensible) to get our checked in code across to our dev servers.
3. Setup a nightly build that runs more tests.  As you can see above, we build and run unit tests for our checkin build – I want to run nightlies that perform both unit and integration tests – I want the nightly to deploy to dev also, but to promote the files necessary to our staging server (not publish them) so that we can at any point promote a nightly out to our staging and then (gulp) live servers.

I’d urge anyone working on projects where deployment is a regular and pain in the arse task, or if there are a few of you and you’ve taken unit testing and TDD (be that test first or just good solid functionality coverage), my view now is that Continuous Integration is the tool you need. 

It’s the new Santa Claus – It knows when you’ve been coding, it knows when you’re asleep, it knows if you’ve been hacking or not, so code good for goodness sake!

As per all of my other posts, the above is from a novice CI person – any feedback that anyone can give, any little nuggets of advice, any help at all – I’ll soak it up like a sponge – this has been a lot of fun, and there’s definitely a warm glow knowing it’s now in place, but there’s a long way to go – feedback *very* welcome!
