---
title: "Chrome – are you sanitising my inputs without my permission?"
date: "2010-07-14"
template: "post"
---

I had to write this as I’m going mad, and I can’t really work out if it’s me, or if Chrome is indeed utterly fecking with my inputs.

I’m creating a form that takes (as a hidden variable) a string like this:

```
||eJxdUt1ugjAUvvcpml1tN5QjKpraROeSmQxnNl+gKyfKJgVLGbqnX4tW0CYk/X5oT79z6GanABaf
ICoFrIcQjaEs+RZQmkwfCu6N+gGJ/IA8WNHI69kHHM57g35BlWkuGfF8L6DYQSfHoMSOS+0IQ3Fx
mC9XbBAGAzKg+AJbPQO1XLDxuB9Foe8WxWe6tUmeAdvk2Ve+5+hxtk9ASTg9oTedUNyIrVfkldTq
xKJgSLEDrVypPdtpXZQTjOu69vT5VE/kXvVDsZXde/D9g+i6skTZve6YJixezOrut/qLT/FmW8ff
L1OKraP1J1wDC3zi+yMSIhJOguckQChu+E5wma2ckcCzeVxQKxe2kJnzWEuX6YRRKQVSuDQcag1w
LHIJ5h/Tz+u+Uy2Ugr3LfSoBzVO5zREXTaZIKEhSbeq2jmti9wHR59ebaRDa9DUc94f+zSJ2NBrt
prLUdI4Qq17A9R53rLnRTahtVzPLrEfx7Zz/A6p0zvw=
||
```

Double pipes at start and end are put there by me to denote where the carriage returns occur.  In particular, you can see there is a carriage return after the last character.

### Browsers that work

When I render this out in a hidden field in firefox (or indeed any browser other than chrome), I get the following when viewing source:

```
<input name="PaReq" type="hidden" value="eJxdUt1ugjAUvvcpml1tN5QiKpraROeSmQxnNl+gKyfKJgVLGbqnX4tW0CYk/X5oT79z6GanABaf
ICoFrIcQjaEs+RZQmkwfCu6N+gGJ/IA8bNHI69kHHM57g35BlWkuGfF8L6DYQSfHoMSOS+0IQ3Fx
mC9XbBAGAzKg+AJbPQO1XLDxuB9Foe8WxWa6tUmeAdvk2Ve+5+hxtk9ASTg9oTedUNyIrVfkldTq
xKJgSLEDrVypPdtpXZQTjOu69vT5VE/kXvVDsZXde/D9g+i6skTrve6YJixezOrut/qLT/FmW8ff
L1OKraP1J1wDC3zi+yMSIhJOguFkQChu+E5wma2ckcCzeVxQKxe2kJnzWEuX6YRRKQVSuDQcag1w
LHIJ5h/Tz+u+Uy2ggr3LfSoBzVO5zREXTaZIKEhSbeq2jmti9wHR59ebaRDa9DUc94f+zSJ2NBrt
prLUdI4Qq17A9R53rLnRTahtVzPLrEfx7Zz/A6p0zvw=

" />
```

Notice in particular that the form field ends with the correct carriage returns.

When posting this to the third party provider (this is a 3D Secure transaction, letters have been changed to protect the wealthy!), jobs a good un, works no problem at all.

### What happens in Chrome

When I view the same source in Google Chrome (5.0.375.99), I get the following:

```
<input name="PaReq" type="hidden" value="eJxdUl1vwiAUffdXkD1tLwVq/QyS1Pkwk9WZzT/A6I02U6qUrrpfP6hiW0mb3HPPAS7nXrbZaYDF
F8hSA+8hxBIoCrEFlKWzp6MIRv2QjgkhT4639Dr+hNM1tugXdJHlitOABCHDHno6AS13QhmfsCkh
T/Plig+icEAHDN9gwx9ALxd8MumPxxHxi+FraaEpcQC+yQ/f+V6g53ifglZweUfvJmW4JhutzEtl
9IWPwyHDHjR0qfd8Z8yxmGJcVVVgrqcGMg/KH4Yd7d+DHx/E1qVLFO3rzlnKk0Vctf/VX3JJNlsX
zxh2ikafCgM8JJSQEY0QjabhwH4M1/mWcQdXOadh4Py4oYY+ukJir3GSdqZcRqk1KOnd8KgRwPmY
K7B7bD/vcataKCT/UPtMAZpnapsjIWtPkdSQZsbW7RR3xx4NYq9vnWmQxvY1mvSHpLOoG42a61SW
2c5R6tgbuN/jj7U3+gl17apnmfcY7s75P2Hdzs8=">
```

Erm... Chrome – where did you put those carriage returns?

I’ve tried deliberately placing carriage returns on the hidden field, adding them to the variable, etc. and still, it removes them.

It’s almost like the value has had a .Trim() applied before being output?

This transaction fails (oddly enough, invalid paReq), and although I can’t prove it, my guess is that the carriage returns are significant in this.

### Help!

Am I going mad here?  Am I missing something obvious?  Is this a bug or indeed a feature?

### Update

This has now been confirmed by a few people - terrifying though that is. If whitespace is important to your form inputs (well, trailing whitespace), then the cry is 'be careful!'.

Someone suggested a workaround on stackoverflow ([http://stackoverflow.com/questions/3246351/bug-in-chrome-or-stupidity-in-user-sanitising-inputs-on-forms](http://stackoverflow.com/questions/3246351/bug-in-chrome-or-stupidity-in-user-sanitising-inputs-on-forms)) which works a treat, and out of all solutions I can think of, is the most elegant.

Thanks for the feedback from all - it's been a really useful exercise!
