---
title: "installutil, windows7, and Run as administrator…"
date: "2009-07-19"
template: "post"
---

Well, stupidity had the better of me for over an hour on this one!  Having not really worked on a windows service in a while, and certainly not in Windows 7, I was having a mare getting it to install.

I’d found any number of references out there facing the same issue as me:

An exception occurred during the Install phase.  
System.InvalidOperationException: Cannot open Service Control Manager on computer '.'. This operation might require other privileges.  
The inner exception System.ComponentModel.Win32Exception was thrown with the following error message: Access is denied.

and a more detailed review of the install log indicated it was falling over at “Creating EventLog source Time Server Service in log Application...”

I immediately thought enhanced security model, UAC, and suspected that the account that I was trying to run the service as (LocalSystem) was the culprit – I seemed to remember back in the day having to set registry entries against accounts for permission to write to the system logs.  Battled with this for a while to no avail, disabled logging in the hope that the error message would be more helpful, but it didn’t reveal much.

I then started to think back to UAC etc. and started up a command window as Administrator (shift+ctrl+enter when it’s highlighted in the start menu rather than just enter).

Hey presto, problem solved.  I can see I’ll need to investigate further to ensure that there are no other issues with regards the tightened security in win7 (and indeed vista) but as of now, all seems to be working as expected.
