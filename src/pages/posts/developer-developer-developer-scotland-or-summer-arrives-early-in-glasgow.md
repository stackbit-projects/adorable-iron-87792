---
title: "Developer Developer Developer Scotland, or summer arrives early in Glasgow!"
date: "2010-05-09"
thumb_img_path: images/IMG_0060_thumb.jpg
content_img_path: images/IMG_0060_thumb.jpg
excerpt: >-
  My conference write up from DDD Scotland 2010, hosted in Glasgow
template: "post"
---

[![Who let the sun out?](/images/IMG_0060_thumb.jpg "Who let the sun out?")](http://idisposable.co.uk/wp-content/uploads/IMG_0060.jpg)

What a stunning day we were all faced with for [#dddscot](http://developerdeveloperdeveloper.com/scotland2010/) this year – the drive up from Newcastle (albeit starting at an ungodly hour) was actually fun – great scenery on the way, I’d forgotten what it was like to get out of a built up area – plenty more trips out needed over the summer methinks.  I had high expectations of the event after attending [#ddd8](http://developerdeveloperdeveloper.com/ddd8/) earlier in the year and being overwhelmed by the content there, and the day didn’t disappoint.

Onto the talks I managed to get to:

### HTML 5: The Language of the Cloud?

**Craig** **Nicol -** [**@craignicol**](http://twitter.com/craignicol)

A good start to the day, and pertinent for my current role (we’re investigating what HTML5 can do to help us with alternate platform delivery, certainly with a focus on the mobile market).  Craig’s talk was animated (in both senses of the word!), and it was useful to see just where the ‘standards’ were at.  Safe to say at present, and Craig mentioned it a few times during this talk, that if you want to target HTML5 then you really do need to pick your target browser (or generate more work usually and target browserS), as the standards are still significantly in flux.  There is a lot of help out there, and those people creating mashups really are helping in showing which browsers support which elements.

I particularly liked the look of the XForms (forms 2.0) stuff – being able to define something as an ‘email’ field, or a ‘telephone’ or ‘uri’ I think adds significant context to the proceedings and will deliver (for the users) a far richer experience.

As with a lot of emerging technologies though, I certainly think it’s far too early for reliable deployment in all but very controlled environments – even if you implement progressive enhancement well.  Something to follow for sure though.

Overall a very well presented talk, a minimal smattering of the expected ‘this worked 10mins ago!’, but this is HTML5+bits, so to be expected.

### Exception Driven Development

**Phil Whinstanley -** [**@plip**](http://twitter.com/plip)

plip at his usual exuberant self with this talk on exceptions, and it was a useful additional session to one I’d seen at [DevWeek earlier in the year](http://idisposable.co.uk/2010/03/dev-week-2010/) given by Jeffrey Richter.  The initial message was ‘exceptions happen’ – we have to learn how to live with them, what to do when they happen, which ones we should fix (and yup, I’m one of those people that hates warnings, so I suspect I’ll have to fix all of them!), which ones we should prioritise – how we make sure we’re aware of them, that sort of thing.

Two very useful additions to my current understanding – one was ‘Exception.Data’ which is essentially a dictionary of your own terms.  At present we’re throwing our own exceptions within our business software (more on that later), but .Data will give us far more information about what parameters were at play when the exception happened – utterly brilliant, and terrifying that I didn’t know about this!

Another was the use of window.onerror in javascript – ensure that you http post (or whatever other mechanism works best for you) when your scripts don’t work – there’s nothing worse than your javascript borking and not being able to repeat it, so make sure you report upon these too.

Some key snippets (some common sense, some not) such as never redirect to an aspx page on a site error (thar be dragons and potential infinite loops), go do static html instead.

plip’s acronym at the end of the session made me chuckle, I shant repeat it, but it had an odd way of sticking in the consciousness ;)

The only thing I thought lacking in this talk (and it’s no real criticism of plip) was the concept that was covered in that talk earlier in the year at DevWeek.  The idea that Exceptions are *not* for exceptional circumstances, they’re there as a means of controlling program flow, of reporting when something didn’t work as expected, and of giving more effective information.

So for example, if I had a method called ‘ProcessLogin(username, password)’ and one of the first checks was ‘does this username exist in the DB’, if it doesn’t, throw new UserNotFoundException.

Of course, if plip had gone down the custom exceptions and business defined exceptions, the talk could comfortably lasted two to three times longer, so I feel the devweek talk and plip’s complemented each other well.

Cracking talk though plip – really did get a lot out of this one, and I think this was the most useful session of the day for me.

### A Guided Tour of Silverlight 4

**Mike Taulty - [@mtaulty](http://twitter.com/mtaulty)**

A reminder from Mike that I really need to spend some time looking into Silverlight 4.  I focus very heavily on web development and web technologies, and although I have little interest in desktop development, SL4 I think has a lot of interest in terms of as an intranet based tool with rich GUI.  Of course, I may be better going down the WPF route with that, but there’s something about the versatility of SL4 that appeals.

Cracking talk from Mike as per – always good to see one of the UK evangelists wax lyrical about their current focus, and this was no exception.

### What ASP.NET (MVC) Developers can learn from Rails

**Paul Cowan – not sure on twitter**

I have to prefix this talk by saying that I thought Paul’s presentation style was great, and much as he maligned his irish accent, he was cracking to listen to.

That said – rails… what a bag of shite! lol.  I suspect I may get a number of replies to this, but what I like about MVC2 is that I can focus on architecture and the important stuff, and ‘get the job done’ without too many interruptions.  Ok, I have to add views myself, and a ‘Customer’ entity doesn’t automatically get a controller/views/unit tests associated with it.  But I feel in complete control, and don’t feel constrained at all.

I spent too many years in a unix/perl/python environment, and I really do not miss the command line shite I had to go through to really add value to what I was doing in the programming language.

VS2010 + Resharper deliver a significant number of improvements in the ‘streamlining’ of application development, and I have none of the hassle that came about as part of that rails demo (no matter how much it delivered with just a simple command line).

So I really do apologise to Paul – his presentation was great, but it only reinforced for me that the love affair I’m having with MVC2 at present is well grounded.  God, I sound like such a fanboy!

### Real World MVC Architectures

**Ian Cooper - [@icooper](http://twitter.com/icooper)**

A few teething troubles at the start (don’t you just hate it when a backup brings your system to its knees), but overall a good presentation – I’d seen Ian's talk at #ddd8 (prior to really solidly working with MVC), and I thought I’d re-attend this again after spending 2months solidly working with MVC2.  It has certainly reinforced what I’m doing is ‘right’ or at least appears to be good practice.  I’m still sceptical about the overhead that CQRS delivers when implemented in its purest sense, though the principles (don’t muddy up your queries with commands, and vice versa) is a one that obviously all should follow.

Ian had a bit of a mare with his demo code, though more to my benefit as I managed to nab some swag for being ‘that geek’ in the front row pointing it out – yay for swag!

### The Close

Colin Mackay and the rest of the guys then spent some time covering the day, handing out significant swag (yay, I won a resharper (or if I can wing it as I have one) a dotTrace license!), and we had the obligatory Wrox Lollipop shot taken.

All in all, it was a cracking day, and well worth that early drive up from Newcastle – I think events like this work so well – getting a room or rooms full of enthusiastic devs, who all just want to be better at their art, and being presented to by people who’ve spend some time working on that art.  There’s nothing finer in the geek world.

Thanks to all organisers and sponsors – great fun was had by all :)
