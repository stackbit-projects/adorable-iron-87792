---
title: "IIS, Optimising Performance, 304 status codes, and one stupid browser…"
date: "2011-03-20"
template: "post"
---

Well, I thought I’d start my play in earnest after last weeks DevWeek, I thought I’d experiment with various performance improvements that came out of Robert Boedigheimer’s ([@boedie](http://twitter.com/boedie)) talk.

First up, a play with expiry of content.  We host all of our ‘assets’ (images, css, javascript, and flash) from a content delivery network style setup.  We don’t currently use a CDN for anything other than our games, but the concept is the same – so long as the assets are hosted on a separate URL to the content, then the location of those assets isn’t an issue.

### Setting Up Expiry for Assets in IIS 7

In IIS manager left click on the website, folder or indeed file that you wish to set expiry on.

[![image](/images/image_thumb17.png "image")](http://idisposable.co.uk/wp-content/uploads/image17.png)

From the ‘IIS’ section in the main pane (make sure you’re on features view for this) double click on ‘Http Response Headers’.

[![image](/images/image_thumb18.png "image")](http://idisposable.co.uk/wp-content/uploads/image18.png)

You will see in the right hand pane the option to ‘Set Common Headers…’

[![image](/images/image_thumb19.png "image")](http://idisposable.co.uk/wp-content/uploads/image19.png)

This gives you the following dialog:

[![image](/images/image_thumb20.png "image")](http://idisposable.co.uk/wp-content/uploads/image20.png)

You can see here, I’ve enabled ‘Expire Web content’ and am expiring it after 20 days.  You can set a fixed expiry time too, though I’ve never done this – I can imaging it’s more maintenance overhead to ensure you always keep content ‘cached’ at various points in time, though it’s there if your use case demands it.

### Fiddlers 3(04)

Ok, so that’s all yes? Well, yup, that’s it.  Fire up fiddler and load up one of your assets – you should see something like the following:

[![image](/images/image_thumb21.png "image")](http://idisposable.co.uk/wp-content/uploads/image21.png)

So, all is well on first load – we get a status code 200 and we can see that caching is enabled and has a max-age of 1728000 (20d * 24h * 60m * 60s), so we know that our next request should be cached and shouldn’t hit the server.

Hit Refresh…

[![image](/images/image_thumb22.png "image")](http://idisposable.co.uk/wp-content/uploads/image22.png)

Erm… why are you still hitting my server even if only to be told 304 (not modified), resource hasn’t changed…  So why the round trip?

Turns out hitting refresh on any browser will indeed make that round trip – the refresh button is almost an override for the local browser cache and says ‘go and double check for me’ – I’ve tested in IE8/9, Firefox and Chrome and they all do this.

### So how do I avoid the round trip for non modified resources?

Turns out you’re already doing it.  Instead of clicking refresh, click into the address bar and press return.  You will find the resource loads up again no problem, but there is now no round trip to the server and no 304 response.  Well, it loads up no problem in IE or Firefox, but there’s another pesky browser on the block…

### Hmmm, Google Chrome? Why won’t you play ball?

Seems that pressing return in Chrome behaves in the same way as if you’d hit the ‘refresh’ button and still issues the request (and naturally gets the 304).

**Should I worry?**

Well, no – we have only been testing single resources here.  If I navigate to a page by typing in the URL and pressing return (first run) you’ll get the usual 200 status codes, and you’ll get the usual assets caching.  If you press return to ‘reload’ that page in chrome, then you will get all of the round trips back and forth with the corresponding 304s.

But, if you navigate to that page (after you’ve had your code 200’s) via either a bookmark or a google search (essentially, via a hyperlink) then jobs a good un and it doesn’t issue the requests.

I’m not sure why Chrome behaves differently to the other browsers in this regard – I could understand if it didn’t have a ‘refresh’ button, but it has.

I write this up as it caused an hour or so’s pain as I played around with IIS caching, as I’ve recently switched to Chrome as my default browser.  It was only chance that I tried the assets in the other browsers when Chrome wasn’t doing as it claimed it should be that I realised it was just a chrome side effect and really only came into play when I was ‘debugging’.

Hope it’s useful to others.
