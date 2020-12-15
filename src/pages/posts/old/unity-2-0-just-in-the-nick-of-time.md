---
title: "Unity 2.0 – Just in the nick of time"
date: "2010-05-05"
template: "post"
---

We’re just re-architecting our site currently and a big part of that is test first (I daren’t call it test driven!) development.  It’s an [MVC2](http://www.asp.net/mvc/) project, with distinct business and data access layers. I’m loving MVC2, model binding, and the power I’m getting from making my domain models richer.

Obviously one of the biggies in unit testing is the use of [Inversion of Control](http://en.wikipedia.org/wiki/Inversion_of_control) via an [IoC container](http://www.hanselman.com/blog/ListOfNETDependencyInjectionContainersIOC.aspx) (older list) so that you can reliably pass around interfaces rather than implementations, the aim being to improve the testability of it all, and allowing mocking up of dependencies in order to test just certain areas of the functionality.

I’d investigated a few IoC containers:

- [CastleWindsor](http://www.castleproject.org/container/index.html) – I just personally found this too much like hard work in terms of the thinking side of things – I didn’t like the syntax, which must be an utterly personal thing as there’s not a big difference between that an Unity.
- [StructureMap](http://structuremap.github.com/structuremap/index.html) – this one felt more like voodoo, though worked well – was definitely a good second choice.
- [Unity (v1.2)](http://unity.codeplex.com/) – I liked the config on this one, and I liked the way of specifying which constructor to use in a multi-constructor dependency.  What I didn’t realise was that it didn’t out of the box seem to support the ‘PerWebRequest’ type lifestyle on dependencies (though I managed to roll my own without too much difficulty).

I’d hasten to add the above are my findings, and may not be fully representative of someone with a clue playing with this!  I may easily have missed elements in the initial plays.

Unity 2.0 (which is available as part of [Enterprise Library 5](http://entlib.codeplex.com/)) comes with a ‘PerResolveLifetimeManager’ out of the box now, which does exactly what it says on the tin – during a running instance (in this case, a web request) the first time it resolves it’ll new up an instance for the app, and during that instance it’ll use that one, until the next instance (page load).

So we have:

```csharp
container.RegisterType<iwebsessionmanager , WebSessionManager>(new PerResolveLifetimeManager(), new InjectionConstructor(typeof(IUserService), typeof(ISessionManager)));
```

instead of the default [TransientLifetimeManager](http://msdn.microsoft.com/en-us/library/microsoft.practices.unity.transientlifetimemanager.aspx).

There are other lifetime managers available with Unity 2.0 (HierarchicalifetimeManager being the other new one), and obviously you still have ExternallyControlledLifetimeManager should you need it.

All in all, very happy that we went down the Unity route when we did, and those updates in 2.0 have proven to come just when we needed them.

p.s. I’ll add links to the correct MSDN sections as soon as they’re available – the documentation only seems available for 1.2 at present.
