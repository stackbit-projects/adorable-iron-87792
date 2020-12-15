---
title: "Orphaned SQL Server Users"
date: "2009-09-21"
template: "post"
---

Been blogged about all over the place, but I wanted a central place to remember it.

After restore of a database from another server, often the user account can become unassigned from an SQL server login.

The following sorts it:

sp_change_users_login 'update_one', 'orphaned_login', 'sql_username'

jobs a good un.

Now I never need hunt again – huzzah :)
