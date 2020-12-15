---
title: "A wee step backward…"
date: "2009-05-05"
template: "post"
---

Well, maybe not.  I’ve been reviewing over the weekend my approaches to learning, and after reading considerably, I think [Entity Framework](http://en.wikipedia.org/wiki/ADO.NET_Entity_Framework) isn’t the right path for me at the moment.  So many are reporting issues with it, and the [Julie Lerman](http://www.thedatafarm.com/blog/) book highlights a number of hoops you need to jump through on complex datasets that simply shouldn’t be there.

So it’s back to basics.  [Linq](http://www.google.co.uk/search?hl=en&q=linq&meta=), and then by definition [Linq to Datasets](http://blogs.msdn.com/adonet/archive/2007/01/26/querying-datasets-introduction-to-linq-to-dataset.aspx), [Linq to SQL](http://weblogs.asp.net/scottgu/archive/2007/05/19/using-linq-to-sql-part-1.aspx) (and eventually when it matures, [Linq to Entities](http://dotnetaddict.dotnetdevelopersjournal.com/adoef_vs_linqsql.htm)) is the path I’ve chosen.  Linq to Datasets may well be considered legacy code, though [suite-e](http://www.suite-e.co.uk/) uses them in a few places to retrieve large sets of data (converting stored proc –> objects for 45,000 rows proved too time costly), and I think it’ll be handy to start at this grass roots level.

I’m convinced by [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping)s, and ideally would like to proceed with Entity Framework, but at least the above will give me a solid grounding that I can then proceed through to something like EF with limited pain.  [VS2010/C#4.0](http://channel9.msdn.com/shows/10-4/) apparently will have some updates, so I’ll keep monitoring.

On a separate note, I’m getting so heavily addicted to [stackoverflow](http://stackoverflow.com/) – I post where I can, but as a resource for learning it’s fantastic.  You still have a number of weaknesses (people not answering the question, but posting fast to try to get points, downvotes for stupid reasons, etc.) but on the whole, it’s a cracking resource.

This month will see me probably post very little, we have 4 large client sites up for launch and 2 minor client updates, so I suspect the hours will be long and arduous, but we soldier on :)
