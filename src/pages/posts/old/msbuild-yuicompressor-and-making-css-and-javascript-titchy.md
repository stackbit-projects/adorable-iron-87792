---
title: "MSBuild, YuiCompressor and making CSS and Javascript titchy"
date: "2011-04-22"
template: "post"
---

Both Google (via [PageSpeed](http://code.google.com/speed/page-speed/docs/rules_intro.html)) and Yahoo (via [YSlow and their Developer Network guidelines](https://developer.yahoo.com/performance/rules.html)) (among many others) tell us that how quickly our page loads and how optimised the site is for fast download is important – Google announced that the [speed your page loads is important](http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html), and Yahoo have a number of guidelines highlighting the same thing.

I’ve done a lot of work in other areas (distributed caching to avoid hitting the DB, output caching of pages to avoid any unecessary parsing, etc.) but I thought I’d start to focus on the performance on the web side of things.

After almost 2 hours googling and a final chat on twitter, I thought I’d have a look at YUICompressor first.  I quite like the ‘being part of the build’ nature of it all, and it fits in with my desire to learn a little more about MSBuild to help in the ongoing mission to ensure we have a good Continuous Integration process within the workplace.

The documentation for YUI isn’t bad so long as you want to piggyback onto the Pre and Post-build events (found from the properties window in your web project/build tab), but this has never really felt clean to me, so I thought I’d piggyback onto the ‘AfterBuild’ target within the .csproj file instead.

Here’s what I did.

## Download and Setup YUICompressor

YUICompressor is available from here, and comes as a zip with a couple of DLLs in it.

In order to tie in with the CI process, I keep a ‘lib’ folder within my solution folder for our project for all external dependencies and these get checked into source control along with your solution – one of the early goals of CI is repeatability, and including (and referencing) local resources allows you to build the project on any clean machine.

## Tie into your MSBuild file for your project

We use a ‘Web.Resources’ project, which acts as a pseudo-cdn, so all static resources (scripts, css, images, flash) go into this and keep the core web solution a little cleaner.  It’s another task that assists in speeding up your site too as some older browsers have a limit of 2 concurrent requests per domain – splitting your static resources into another domain (even a sub domain) increases the concurrency of downloads and hence speeds up load times.

In visual studio, right click on your project with the CSS/Javascript in, unload project, and then right click and ‘edit’.  You’ll be presented with the .csproj file (which as anyone reading this will already know is also an MSBuild file).

Towards the end of the file, you will see a section like this:

```xml
<!-- To modify your build process, add your task inside one of the targets below and uncomment it. 
     Other similar extension points exist, see Microsoft.Common.targets. 
<Target Name="BeforeBuild"> 
</Target> 
<Target Name="AfterBuild"> 
</Target> 
-->
```

We’re going to move the ‘Afterbuild’ target outside of the comment, and replace it with the following:

```xml
  <UsingTask TaskName="CompressorTask" AssemblyFile="../lib/Yahoo.Yui.Compressor/Yahoo.Yui.Compressor.dll" />   
  <Target Name="AfterBuild">
    <PropertyGroup>
      <MainSiteCssOutputFile Condition=" '$(MainSiteCssOutputFile)'=='' ">tombola/css/tombola.compiled.css</MainSiteCssOutputFile>
      <MicroSiteCssOutputFile Condition=" '$(MicroSiteCssOutputFile)'=='' ">cinco/css/cinco.compiled.css</MicroSiteCssOutputFile>
      <!--<JavaScriptOutputFile Condition=" '$(JavaScriptOutputFile)'=='' ">JavaScriptFinal.js</JavaScriptOutputFile>-->
    </PropertyGroup>
    <ItemGroup>
      <!-- Single files, listed in order of dependency -->
      <MainSiteCssFiles Include="$(SourceLocation)css/core/reset.css" />
      <MainSiteCssFiles Include="$(SourceLocation)css/core/site.css" />
      <MainSiteCssFiles Include="$(SourceLocation)tombola/css/site.css" />
      <MicroSiteCssFiles Include="$(SourceLocation)css/core/reset.css" />
      <MicroSiteCssFiles Include="$(SourceLocation)css/core/site.css" />
      <MicroSiteCssFiles Include="$(SourceLocation)cinco/css/site.css" />
      <!--<JavaScriptFiles Include="$(SourceLocation)jquery-1.3.2.js"/>-->
      <!-- All the files. They will be handled (I assume) in alphabetically. -->
      <!-- <CssFiles Include="$(SourceLocation)*.css" />
            <JavaScriptFiles Include="$(SourceLocation)*.js" />
            -->
      <!--
          JavaScriptFiles="@(JavaScriptFiles)"
          JavaScriptOutputFile="$(JavaScriptOutputFile)"
          ObfuscateJavaScript="True"
          DeleteJavaScriptFiles="false"    
-->
    </ItemGroup> 
    <CompressorTask CssFiles="@(MainSiteCssFiles)" DeleteCssFiles="false" CssOutputFile="$(MainSiteCssOutputFile)" CssCompressionType="YuiStockCompression" PreserveAllSemicolons="True" DisableOptimizations="Nope" EncodingType="Default" LineBreakPosition="-1" LoggingType="ALittleBit" ThreadCulture="en-gb" IsEvalIgnored="false" />
    <CompressorTask CssFiles="@(MicroSiteCssFiles)" DeleteCssFiles="false" CssOutputFile="$(MicroSiteCssOutputFile)" CssCompressionType="YuiStockCompression" PreserveAllSemicolons="True" DisableOptimizations="Nope" EncodingType="Default" LineBreakPosition="-1" LoggingType="ALittleBit" ThreadCulture="en-gb" IsEvalIgnored="false" />
  </Target>
```

You'll see there's a lot going on there, so lets break it down.  Firstly, you will see I’ve commented out the javascript minification and concatenation – you should (after working through the CSS stuff) be able to come up with your own use case for javascript on your site.

So:

```xml
  <UsingTask TaskName="CompressorTask" AssemblyFile="../lib/Yahoo.Yui.Compressor/Yahoo.Yui.Compressor.dll" />
```

This is basically creating a 'task' by pointing to the functionality within an assembly (in this case, our local Yahoo.Yui.Compressor install. In my own head I have this down as a 'using' statement for MSBuild (in a similar way to Import, though I know you can do a lot more with the UsingTask msbuild command that I haven't yet delved into.

```xml
  <Target Name="AfterBuild">
    <PropertyGroup>
      <MainSiteCssOutputFile Condition=" '$(MainSiteCssOutputFile)'=='' ">mainsite/css/tombola.compiled.css</MainSiteCssOutputFile>
      <MicroSiteCssOutputFile Condition=" '$(MicroSiteCssOutputFile)'=='' ">microsite/css/cinco.compiled.css</MicrositeCssOutputFile>
    </PropertyGroup>
```

This basically builds up the variables $(MainSiteCssOutputFile) and $(MicroSiteCssOutputFile). I could have just as easily called them $(Bob) and $(Fred), though I'm a fan of self documenting variables ;)

```xml
    <ItemGroup>
      <!-- Single files, listed in order of dependency -->
      <MainSiteCssFiles Include="$(SourceLocation)css/core/reset.css" />
      <MainSiteCssFiles Include="$(SourceLocation)css/core/site.css" />
      <MainSiteCssFiles Include="$(SourceLocation)tombola/css/site.css" />
      <MicroSiteCssFiles Include="$(SourceLocation)css/core/reset.css" />
      <MicroSiteCssFiles Include="$(SourceLocation)css/core/site.css" />
      <MicroSiteCssFiles Include="$(SourceLocation)cinco/css/site.css" />
    </ItemGroup>
```

A few arrays of items to be included in the compression

```xml
    <CompressorTask CssFiles="@(MainSiteCssFiles)" DeleteCssFiles="false" CssOutputFile="$(MainSiteCssOutputFile)" CssCompressionType="YuiStockCompression" PreserveAllSemicolons="True" DisableOptimizations="Nope" EncodingType="Default" LineBreakPosition="-1" LoggingType="ALittleBit" ThreadCulture="en-gb" IsEvalIgnored="false" />
    <CompressorTask CssFiles="@(MicroSiteCssFiles)" DeleteCssFiles="false" CssOutputFile="$(MicroSiteCssOutputFile)" CssCompressionType="YuiStockCompression" PreserveAllSemicolons="True" DisableOptimizations="Nope" EncodingType="Default" LineBreakPosition="-1" LoggingType="ALittleBit" ThreadCulture="en-gb" IsEvalIgnored="false" />
```

The clever stuff :) This is where the CompressorTask picks up the CSS files to compress/join @(MainSiteCssFiles) and compresses them down into the CssOutputFile $(MainSiteCssoutputFile).

The options on this CompressorTask are numerous, and I'd recommend referring to the main YUICompressor site to get the settings correct for your environment - I've stuck with the defaults, but you can increase the amount of compression, delete original files, etc. etc. etc.

## What about the Javascript?

I’ve left the javascript parts of the CompressorTask commented out in the main post above, and I’m about to go and play with those now, though it seems like it’ll be pretty much an identical process to that above.

## Does it make any difference?

I’ve moved from a 85 rating to an 87 rating on YSlow – wow you say, was it really worth it?  When we know that even an extra second on load speed can significantly affect revenue for companies (god, I wish I could find decent resources to back that up after seeing people show them in talks on this sort of thing) it very much is an ‘Every little helps’ approach.  The jump of 2 was without the concat or join of javascript, so I hope to achieve perhaps another 1 point there too.  From there, [smushing](http://www.smushit.com/ysmush.it/) of images, perhaps [spriting](http://www.alistapart.com/articles/sprites) up images that can be, and generally just trying to eek out every last ounce of performance without any additional hardware costs.

## What’s next?

After chatting to a few of those ‘clever people™’ that I follow on twitter, in particular [@red_square](http://twitter.com/red_square) and [@stack72](http://twitter.com/stack72), they both recommended [Chirpy](http://www.weirdlover.com/2010/07/18/chirpy-attains-godlike-abilities-in-version-1-0-0-4/) which looks very interesting, and I really like the idea of .LESS and the concept of variables within the CSS, so I may well look at that next (will need more buyin from the team as we’ll all have to install it, but that’s never been a problem).

At least for now, our build is automated with the optimised versions of our static resources.
