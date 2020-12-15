---
title: "Visual Studio 11 (Beta) - Two week review"
date: "2012-04-14"
template: "post"
---

I’ve been using VS11 as my primary dev environment now for a few weeks so thought I’d write up my findings on the IDE as a replacement for VS2010.  It’s worth stating my general usage and projects so that you get a feel for where my thinking is coming from – if I get waffly (anyone who knows me knows I can tend to) then feel free to skip to the [TL;DR section](#tl_dr).

## Machine Spec

Running under Win 7 Professional on an Dell M6500 Precision laptop - I5 2.66 with 8GB ram.  Both OS and Visual Studio are running on an SSD (though it’s not a particularly fast one, it’s still considerably faster than a 7200RPM disk).

## Plugins

My predominant development is MVC front end to c# domain/services/repositories (yup, you heard it, repositories ![Smile with tongue out](/images/wlEmoticon-smilewithtongueout.png)) – for front end work we use Chirpy (css concat/minification) and Web Workbench (for working with SCSS files).  Source control is sorted with AnkhSVN.

On top of that, which installation of Visual Studio would be complete without Resharper, so I’ve been keeping that up to date via the Resharper 7 EAP.

## User Interface

This is the element that seems to have generated the most discussion and the most feedback from the community.  When I first saw the screenshots, I thought the whole thing looked a bit bland, though very much saw where they were trying to go with it – it just didn’t look as ‘pretty’ as VS2010.

First few days after install while I was still using both IDEs I was still in that mindset and found the UI a little bland.

Over the past two weeks though, the more I’ve worked in the environment, the more I see the point of it – the tooling just blends into the background.  It still very much feels like it’s working as hard for me (if not harder) than VS2010 was, but it’s not so apparent.  I can very much just get on with the job of coding.

I love the more minimalist UI – I’ve now grabbed a plugin for VS2010 to hide the file/edit etc. menu’s as it feels nicer not having them (like other products, a quick tap of the alt key brings you back into a comfort zone).

It felt odd that the toolbars seemed (at least initially) to be separate/jumpy – the toolbars differed between solution explorer having focus and the editor having focus, and I had to customise this from the default in order to get a UI that I was happy with, though after two weeks I’ve gone to having no toolbars and I don’t miss them (I never used to use much on them that often, and keyboard shortcuts are indeed ftw!)

### Solution Explorer

[![image](/images/image_thumb24.png "image")](http://idisposable.co.uk/wp-content/uploads/image24.png)I still have uncertainty about the solution explorer – it’s the one area where things feel like a step backwards.  The glyph approach in VS11 certainly keeps the UI subtle, but in a very large solution (is 81 projects very large? feels it!) it feels very much like the distinction between projects, solution folders, folders, files, modified files, etc. etc. etc. all blends into one.

This is definitely an area whereby when someone skins up a ‘vs2010 solution explorer’ for VS11 I’ll install it.

Don’t get me wrong, I can work with it, and the search tools make it far easier to find something (though with Resharper that was never hard anyway = CTRL+T for the win), but overall it doesn’t feel as much of a win in this one window.

 

## Performance

Prefixing this by saying it’s very much a beta, though I don’t know why I’m bothering as the performance on the whole is far better.

Startup time from ‘open solution’ to being ready I’ve timed as being a smidge longer (it’s a technical term) – not enough to worry me, but certainly noticeable.

I really like the concept of what they seem to be trying to achieve (the projects loaded counts down as VS works through the loading, and you get a visual indicator in Solution Explorer on which projects are loaded and which aren’t – I suspect the intention is to let you get cracking on those projects that are loaded while it loads up the others.  In reality though, the UI is a little too sluggish at this point, so I find it better to just wait until the solution has loaded.

Once you have everything loaded/available though, the story changes entirely – everything feels more responsive, quicker to navigate and just generally ‘better’ – because of the cleaning of the UI mentioned above, I feel far more ‘in the code’ than I ever have done in VS2010.

### Build Times

If there is one reason and one reason only to upgrade to VS11, this is it.  If you ever have a boss that talks about the cost/benefit of anything, demonstrate to him a big project build via VS2010 versus VS11.

Initial/Clean build on our 81 project solution in VS2010 takes between 40 and 60 seconds depending upon what else the machine has going on and how long VS2010 has been running.  VS11 is faster on initial/clean build, but not massively – 30-45 seconds.

Where we really gain is in subsequent builds – the build manager in VS11 seems to have taken parallelization very seriously.  VS2010 and we’re still looking at around 40 seconds on a build after a code change down in the guts of the solution.  VS11 and that’s averaging around 8-10 seconds.

This is the productivity carrot that makes it easy to sell this as a product really.  I find myself building more often simply because it’s not so impactful, and I find myself spending more time just ‘Getting Things Done’.

There is a caveat to this – I noticed a few occasions whereby in a sequential build all was tickety boo, but on a parallel build we were getting occasional (but not consistent) build errors with unmet reference dependencies.

Turns out it was our fault, and the project really didn’t have a reference to that dependency, but because in a sequential build it was getting addressed before it got to that project, it never generated an error, whereas I suspect in the parallel build world we were getting something akin to a race condition.

I can’t confirm this – it could be just my lack of understanding (most likely!) but anyway, adding the references to the project that was generating the intermittent build errors has resolved the problem.

## Tooling

I’ve very much tortured myself here – part of me wishes I hadn’t, though I thought I’d see fully what it had to offer, so I’m trialing the Ultimate SKU of VS11 (I only have a license for Professional in 2010).

I know that some of this tooling exists within VS2010, though I can’t comment on it in there so this is a ‘clean’ review of it in VS11.

### Code Clones

I was dreading running this – much as I’m very active in ensuring code quality, and we have a cracking team working on the product, it’s a product that is coming up to 2 years old, so I expected this to find some laziness dotted here and there.

Overwhelmingly, there wasn’t as much as I’d thought, and a lot of the issues reported were around some of our commonality in exception handling/logging (which in fairness should be AOP’d at some point, but it’s not what I’d consider duplication in the traditional sense).

First run through builds up an index so that subsequent runs through are a lot faster (I assume it takes a delta of changes to the codebase or something similar).

The way it highlights the issues is very elegant and it picked up a few issues that were indeed laziness/unawareness of devs (myself included!) that we’ve managed to refactor nicely and improve upon the code quality without any real cost to productivity – larger scale code reviews for things like this can take an age!

You can look through your ‘Exact’ or ‘Strong’ matches in no time at all and it just all feels very much more of a streamlining and an easing of quality management.

Love it, and will be sure to run it now periodically as part of my ‘ensure the boy scouts have been in the code base’ reviews.

### Calculate Code Metrics for Solution

I’m aware that this at least is in VS2010 Ultimate SKU too, so I don’t know what (if anything) is different between the versions, but again, this is another tool to really allow me to see the codebase at a ‘big picture’ level very easily – I don’t have to so readily monitor checkins because the code metrics will identify code that has a bad maintainability index, areas where cyclomatic complexity has gone a bit awry, etc. – bloody useful, and again one that will come into my regular reviews to save me time.

### Unit Test Code Coverage

I’ve used other solutions for this in the past, so again, it’s nice to see it baked in – though it’s a shame it’s Ultimate only.  I very much take the approach with Unit Testing of ‘ensure the functionality is covered’ while not worrying too much about % (other than as an indicator where the former may be suffering), and the interface on this makes it very easy to look through and pick out areas that are lacking testing.

I’ve added > 30 // TODO UNIT TEST comments to the codebase today, and again, it took no time at all to find those.

## TL;DR

With this iteration of Visual Studio it feels very much like the workflow/lifecycle of what we do as developers has been at the forefront, and it’s difficult to find anything (other than the solution explorer) where it doesn’t feel like a significant improvement over the previous iteration.  I’ve only scratched the surface over the past two weeks of running with it, but I will very much be convincing our management to upgrade when it releases, and will do my best to attempt to get them to justify the cost of a few SKUs of Ultimate for all of the bells and whistles that are brought about within that SKU.

### Positives

- Build times have to sit at number one – productivity, productivity, productivity!
- Tooling is superb in assisting you in ‘getting things done’
- The UI chrome just blends into the background letting you ‘get things done’
- Did I mention that I feel far more able to just ‘get things done’? ![Smile](/images/wlEmoticon-smile5.png)

### Negatives

- Solution Explorer on the whole is better/faster/more responsive, though this is one area where the lack of chrome (imo) makes things a bit harder
- Startup time – although not significantly slower is certainly a little slower
