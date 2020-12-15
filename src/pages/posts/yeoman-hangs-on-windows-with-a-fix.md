---
title: "Yeoman hangs on windows – with a fix"
date: "2014-01-09"
template: "post"
---

Thought I’d quickly write this up as [@kevinawalker](http://twitter.com/kevinawalker) and I had a mare with it yesterday on our windows boxes.  I suspect it’s because I’d attempted to setup yeoman in the past before there was a nice npm install pathway, coupled with the lack of dependecies my machine (I installed an up to date ruby+python in between break and fix).

## Symptoms

```zsh
npm install –g yo
```

would appear to work and give solid feedback that everything appeared tickety boo.  All PATH variables certainly indicated it would work, and ‘yo’ was discoverable in the path.

That said, typing anything other than yo --version would hang and never return (requiring a ctrl+c to break out of it).

When oldschool debugging through it (console.log for the win), turns out cli.js in the %APPDATA%/roaming/npm/node_modules/yo/cli.js was haning on line 76:

```zsh
env.lookup()
```

I didn’t follow down the pathway, though when npm installing yo on the mac it went through no bother.

```zsh
npm uninstall –g yo
```

then a re-install didn’t help, whether or not we cleared the npm caches in between.

## Solution

I still don’t know which magical combination of the above really worked (it may be that updating ruby/python between the old install and new was key, I can’t be sure) but the following steps fixed for both [@kevinawalker](http://twitter.com/kevinawalker) and I:

1. npm uninstall –g yo
2. explorer window to %APPDATA%/roaming/npm-cache/
3. delete ‘yo’ folder
4. npm install –g yo

After that, all was well with the world.

Good luck, hope this helps someone!
