---
title: "Dependent objects in SQL Server"
date: "2010-01-09"
template: "post"
---

another of those ‘bloody hell, why did I not know this before’ moments, but one of the lads circulated this during the week as a means of checking dependencies on either stored procs or tables.

A simple

exec sp_depends [object name]

Will return a set of results that highlight which stored procs, views, tables, user-defined functions or triggers are dependent upon that object.  The full MSDN documentation is [available here](http://msdn.microsoft.com/en-us/library/ms189487.aspx).

So handy when there are schema changes in legacy code/schema’s.
