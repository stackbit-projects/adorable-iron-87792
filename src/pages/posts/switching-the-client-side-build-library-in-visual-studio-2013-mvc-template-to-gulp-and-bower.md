---
title: "Switching the client side build library in visual studio 2013 MVC template to gulp and bower"
date: "2015-02-07"
template: "post"
---

## Why?

A lot of people use [Mads Kristensen's](http://madskristensen.net/) absolutely awesome [Web Essentials](http://vswebessentials.com/) plugin for Visual Studio – we use it for less compilation, and bundling of our less/js.  It does however fall down when you need to use it in a continuous integration context, so we find that we keep the compiled/bundled output in our repository.

Couple that with the fact that in the next release of visual studio, [gulp/grunt/bower are becoming first class citizens](http://www.hanselman.com/blog/IntroducingGulpGruntBowerAndNpmSupportForVisualStudio.aspx) in terms of it’s support out of the box.

Scott Hanselman’s point in that post is a valid one – nuget is a superb addition to the .net ecosystem, and compare it to the dark days of ‘download a DLL from somewhere and hope’, it’s revolutionised .net development.  But there are other, arguably far better, and certainly far richer ecosystems out there for client side build, which on the one hand is absolutely awesome (npm is easy to build for and publish modules to), and on the other hand, daunting (I counted at least 15 modules that would simply minify my css for me).  Thankfully, the community talks/blogs a lot about this, so finding commonly used packages is as easy as reading from a number of sources and seeing which one comes out on top.

Microsoft are to be applauded for taking this approach and opening up the pipeline in this way – their whole approach recently with [OSS of the .net clr](http://weblogs.asp.net/scottgu/announcing-open-source-of-net-core-framework-net-core-distribution-for-linux-osx-and-free-visual-studio-community-edition), as well as the potential promise of a [reliable .net on linux via vNext](http://www.asp.net/vnext/overview/aspnet-vnext/aspnet-5-overview), and it’s a great time to be a .net dev.

  

All code for this example post is available at [https://github.com/terrybrown/node-npm-gulp-bower-visual-studio](https://github.com/terrybrown/node-npm-gulp-bower-visual-studio "https://github.com/terrybrown/node-npm-gulp-bower-visual-studio")

### What is Gulp?

I won’t go into detail, as [many](https://www.codefellows.org/blog/quick-intro-to-gulp-js) [other](http://www.johnpapa.net/using-gulp-in-a-javascript-build-pipeline/) [posts](http://andy-carter.com/blog/a-beginners-guide-to-the-task-runner-gulp) cover it well.  Essentially, it is a streaming build system written in node that allows people to create tasks and build up a pipeline of activities such as transforming less, copying files, validating javascript, testing, etc.  It is a more recent addition to the market (grunt, a tool with similar aims, though a different approach is another in the same arena).

### What is Bower?

Essentially, a package manager for front end libraries (be they javascript, css, etc.) – think of it at a rudimentary level like nuget for client libraries.  There is a very good short video on [egghead.io](https://egghead.io/lessons/bower-introduction-and-setup)

### Holy wars solved early - Gulp vs Grunt

[Clever](http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt/) [people](http://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/) [have](http://travismaynard.com/writing/no-need-to-grunt-take-a-gulp-of-fresh-air) [written](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4) about this.  I personally prefer the streams approach and the code over configuration driven nature of gulp over the ‘temp file all the things’ and config based approach of grunt.

## Getting Setup - local dev machine + visual studio

Machine needs to be running node and gulp (gulp needs to be installed globally)

Node has just hit [v 0.12](http://blog.nodejs.org/2015/02/06/node-v0-12-0-stable/) which has a number of updates (not least to streams3 and away from the somewhat interesting streams2)

```sh
node --version
```

Will confirm which version of node you're running.  You don’t need the latest version, though the update in 0.12 has been a long time coming.

### Setting up gulp/bower

```sh
npm install gulp -g
gulp --version
npm install bower -g
bower --version
```

[TRX – Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708): This will give you a custom task runner for gulp within visual studio.

[NPM/NBower Package Intellisense](https://visualstudiogallery.msdn.microsoft.com/65748cdb-4087-497e-a394-2e3449c8e61e): Who doesn’t like intellisense right?

[Grunt Launcher](https://visualstudiogallery.msdn.microsoft.com/dcbc5325-79ef-4b72-960e-0a51ee33a0ff?SRC=VSIDE): Not ideally named, but a great little add on to give you right click support for gulp/bower and grunt.

You may also want to follow the steps in [http://madskristensen.net/post/grunt-and-gulp-intellisense-in-visual-studio-2013](http://madskristensen.net/post/grunt-and-gulp-intellisense-in-visual-studio-2013 "http://madskristensen.net/post/grunt-and-gulp-intellisense-in-visual-studio-2013") to get full intellisense.

**Note:** Switch off build in web essentials (it’s being used purely for intellisense)

## File > New Project – and a tidy up

We want to hand over all JS and CSS handling to gulp.  This includes bundling and minification, as well as hinting/linting. We’ll start with the default MVC template from Visual Studio as the basis of our work.

### Remove asp.net bundling/optimization

In the current template for MVC sites, Microsoft provide a handy bundling mechanism that although fine for smaller sites, still maintains the same problems as above and doesn’t give you separate control over your ‘distribution’ JS/CSS.  We’ll remove:

Microsoft.AspNet.Web.Optimization (and dependencies WebGrease, Antlr, Newtonsoft.Json)

This will also involve a few changes to web.config and the codebase (see [https://github.com/terrybrown/node-npm-gulp-bower-visual-studio/commit/5cfb58b8e57faa4c518a067fa473d740e43725a3](https://github.com/terrybrown/node-npm-gulp-bower-visual-studio/commit/5cfb58b8e57faa4c518a067fa473d740e43725a3 "https://github.com/terrybrown/node-npm-gulp-bower-visual-studio/commit/5cfb58b8e57faa4c518a067fa473d740e43725a3"))

### Remove client side libraries (we’ll replace these later)

- bootstrap 3 (bower: bootstrap)
- jquery (bower: jquery)
- jquery validation (bower: jquery-validation)
- jquery unobtrusive validation (bower: jquery-validation-unobtrusive)
- modernizr (bower: modernizr)
- RespondJS (bower: responsd)

## Setting up Bower

```sh
bower init
```

This will lead you through a number of questions (accept defaults throughout for now, though you can [read up on the options here](http://bower.io/docs/creating-packages/))

You will end up with a bower.json file that will look something like:

[![image](/images/image_thumb28.png "image")](https://idisposable.co.uk/wp-content/uploads/image28.png)

### Re-installing javscript and css dependencies

Take all of the package references above that we removed (the bower versions) and run the following on the command line:

```sh
bower install bootstrap jquery jquery-validation jquery-validation-unobtrusive modernizr respond --save
```

**Do NOT forget the ‘- -save’ postfix at the end – this will ensure that your bower.json is updated with the local dependencies.**

This will start the download and install, and you will end up with a new folder in your solution called `bower_components` folder which contains all of the local dependencies.  Ensure you add this folder to your .gitignore (or source control ignore file of choice).

As a temporary step, switch to visual studio – add the `bower_components` folder to your solution, and re-map all of your js/css files from the default template to the newly downloaded versions.

[![image](/images/image_thumb29.png "image")](https://idisposable.co.uk/wp-content/uploads/image29.png)

## Setting up the build with Gulp

Firstly, we need to get this local solution ready to receive npm packages as dependencies (gulp + the other supplemental libraries we’ll be using are available via npm.

```sh
npm init
```

Again, accept all of the defaults really, or whatever you fancy in each field.

The examples from here down will be somewhat contrived – your own use case can dictate what you do at each step here, but for the purposes of example, what we want to achieve is:

- Deliver all jquery and jquery validation libraries into a single request
- Deliver bootstrap and respond as a single request
- Create a basic more modularised structure for our CSS using less and then concatting/minifying as part of the build

In our real use cases at work, our needs are far more complex, but the above will serve as an example for this post.

Setting up a default ‘gulpfile.js’.

```javascript
var gulp = require('gulp');

// define tasks here
gulp.task('default', function(){
  // run tasks here
  // set up watch handlers here
});
```

You can name and chain tasks in gulp really easily – each one can act independently or as part of an overall build process, and [TIMTOWTDI](http://en.wikipedia.org/wiki/There%27s_more_than_one_way_to_do_it) (always) – what I’ll put forward here is the version that felt easiest to read/maintain/understand.

### Deliver multiple vendor libraries into a single request

```javascript
var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');

var outputLocation = 'dist';

gulp.task('clean', function () {
	del.sync([outputLocation + '/**']);
});

gulp.task('vendor-scripts', function () {
	var vendorSources = {
		jquery: ['bower_components/jquery/dist/jquery.min.js',
	'bower_components/jquery-validation/dist/jquery.validate.min.js',
	'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js']
	}

	gulp.src(vendorSources.jquery)
		.pipe(concat('jquery.bundle.min.js'))
		.pipe(gulp.dest(outputLocation + '/scripts/'));
});

gulp.task('default', ['clean', 'vendor-scripts'], function(){});
```

Ok, there are a number of things in here – key points:

1. Read from the bottom up over – if you issue a straight ‘gulp’ command on the command line, you wil always run the ‘default’ task.  In this case, it doesn’t do anything itself (the empty function as the third param), but instead has a chained dependency – it’ll run ‘clean’ first, then (upon completion) run ‘vendor-scripts’ tasks.
2. ‘clean’ task uses the ‘[del](https://www.npmjs.com/package/del)’ npm module to clean out the output folder we will be pushing the built scripts/css to.
3. ‘vendor-scripts’ uses the ‘gulp-concat’ npm module to simply join an array of files together (in this case, the jquery + jquery validation files)

if you switch to a command prompt window and run ‘gulp’ on it’s own, you will see output similar to:

[![image](/images/image_thumb30.png "image")](https://idisposable.co.uk/wp-content/uploads/image30.png)

And in visual studio, you will now see a hidden ‘dist’ folder there with the output of what you have just generated (**remember to update your .gitignore – you do not want to commit these**)

### Disabling Web Essentials

Less has been our tool of choice for our CSS for some time now, and web essentials really did/does rock as a VS plugin to aid your workflow on those (nice inbuilt bundling, compilation, etc.  That said, now that we’re moving to a more customised build process, we need to switch the compilation side of it off.

Tools > Options > Web Essentials

Switch everything in ‘Javascript’ and ‘LESS” to false.

### Deliver minified and concatenated CSS from LESS

We contrived a number of .less files in order to create the proof of concept:

#### _mixins.less

```less
@brand_light_grey_color: #EFEFEF;

.border-radius(@radius: 4px) {
	-moz-border-radius: @radius;
	-webkit-border-radius: @radius;
	border-radius: @radius;
}
```

#### layout.less

```less
@import "_mixins.less";

body {
    padding-top: 50px;
    padding-bottom: 20px;
}

/* Set padding to keep content from hitting the edges */
.body-content {
    padding-left: 15px;
    padding-right: 15px;
}

/* Override the default bootstrap behavior where horizontal description lists 
   will truncate terms that are too long to fit in the left column 
*/
.dl-horizontal dt {
    white-space: normal;
}

div.rounded {
	.border-radius(4px);
}
```

#### forms.less

```less
@import "_mixins.less";

/* Set width on the form input elements since they're 100% wide by default */
input,
select,
textarea {
    max-width: 280px;
}
```

Nothing complex, though it’ll let us at least build a workflow around them.

There are a couple of key tasks we want to perform here:

1. Grab all less files and compile them over to css
2. Compress that css
3. Push them all into a single file in our dist folder

Thankfully, the ‘[gulp-less](https://www.npmjs.com/package/gulp-less)’ plugin performs the first two tasks, and we have already achieved the other for our JS so it’s just a repeat of those steps.

## Integration into Visual Studio and tying it all together

We now have a basic working build that we can add to as and when our process demands – node and the [node package manager (npm)](https://www.npmjs.com/) have a massive ecosystem of libraries to support all sorts of tasks (generaily, gulp- prefixed for gulp related build tasks), so you can start to build from this point forward.

Key thing now is tying this workflow into Visual Studio, and this is where the cool happens.  The Task Runner Explorer gives us a lot of extensibility points.

[![image](/images/image_thumb31.png "image")](https://idisposable.co.uk/wp-content/uploads/image31.png)

Each of these tasks/sub-tasks can be right clicked and ran as you would do from the command line easily, but you also have a nice option to ‘bind’ certain actions in Visual Studio to steps within your grunt build.

E.g.

[![image](/images/image_thumb32.png "image")](https://idisposable.co.uk/wp-content/uploads/image32.png)

In this instance, we have bound our ‘clean’ gulp task to a ‘clean solution’ within visual studio.

### Tying it all together – watching the solution

Web essentials was awesome at monitoring your work real time and updating bundled files (both less and js) into their respective outputs, but thankfully, gulp comes to the rescue in the guise of ‘[gulp-watch’](https://www.npmjs.com/package/gulp-watch) – this is a highly configurable module that allows you to perform actions on changes to files.

Thankfully, now that we have all of the other tasks, the watch workflow is simply a matter of matching up targets to watch, and tasks to run when things happen to those targets.

var watch = require('gulp-watch');

gulp.task('watch', function () {
	gulp.watch('bower_comonents/**/*', ['vendor-scripts', 'vendor-css']);
	gulp.watch('Content/**/*.less', ['css']);
});

gulp.task('default', ['clean', 'vendor-scripts', 'vendor-css', 'css', 'watch'], function(){});

Once we have that, we can go back to the task runner explorer, right click the ‘watch’ task, and set it to run on solution open.

We now have our solution in watch mode permenantly and any changes to our less or the vendor scripts will trigger the appropriate tasks.

## What’s next?

We’ve solved the problem (compiled css/js needing to be in our repo with web essentials), so the next steps really are incorporating this gulp build task into our CI server (TeamCity), though we’ll leave that for a follow up post.

Now that we have a whole set of automation going, we may as well re-introduce linting/hinting of our less and javascript too – some configuration will be needed here to ensure we’re happy with the outcomes, but fundamentally the ‘right thing to do’.

Testing our JS workflow is the next natural step, and there are plenty of gulp+other task runners to sit within this workflow that will let you validate your scripts either at build time or at save.
