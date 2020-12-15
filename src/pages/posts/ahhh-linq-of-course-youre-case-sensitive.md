---
title: "Ahhh, LINQ – of course you’re case sensitive!"
date: "2010-10-05"
template: "post"
---

One of those ‘ahhh, bollocks’ moments this morning, so thought I’d write about it – a) so I’m not bitten by it again (writing about these things helps them sink in) and b) in case anyone else gets stuck and need a quick google of it.

### Linq to SQL

We use linq commonly in our data access (SQL Server 2005/2008) and all is well on a join like:

```csharp
var results = from cd in context.Distribution
               join uc in context.UCodes on cd.Batch equals uc.Batch
               where uc.Stamp >= betweenStart && uc.Stamp <= betweenEnd
```

Fairly standard stuff, an inner join between two tables based upon a criteria.  We use Latin1_General_CI_AS as our collation so no worries at all on those joins.

### Linq to Objects

Now take those two collections out of the DB and into code (as we’ve had to do recently for a long running query), and that join above (on cd.Batch equals uc.Batch) gets buggered up.

Batch in the case above is a string, and someone forgot to sanitise it before entry to the DB (I use the royal someone, as it may have been me!), so a batch can be either ‘vfc’ or ‘VFC’ or ‘Vfc’ etc.

Move away from our cosy Latin1_General_CI_AS world and the above started to return a lot less data because of casing.

The fix is (as you would expect) easy:

```csharp
var results = from cd in context.Distribution 
               join uc in context.UCodes on cd.Batch.ToUpperInvariant() equals uc.Batch.ToUpperInvariant()  
               where uc.Stamp >= betweenStart && uc.Stamp <= betweenEnd  
```

I thought I’d have a quick look around in terms of case sensitivity and which conversion mechanism to use (ToUpper, ToLower, etc.) and the following post interested me:

[http://msdn.microsoft.com/en-us/library/bb386042.aspx](http://msdn.microsoft.com/en-us/library/bb386042.aspx "http://msdn.microsoft.com/en-us/library/bb386042.aspx")

With the following information:

> Strings should be normalized to uppercase. A small group of characters, when they are converted to lowercase, cannot make a round trip. To make a round trip means to convert the characters from one locale to another locale that represents character data differently, and then to accurately retrieve the original characters from the converted characters.

I’ve always tended to .ToUpperInvariant() when I’ve done string comparisons anyway, but it’s interesting to see some reasoning behind it.

Anyway, it goes down as one of those gotchas that I thought I’d write up.
