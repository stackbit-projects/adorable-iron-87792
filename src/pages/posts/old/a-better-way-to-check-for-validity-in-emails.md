---
title: "A better way to check for validity in emails?"
date: "2010-01-10"
template: "post"
---

I’ve had a method that I’ve used from time to time to validate email addresses, trying to cater for the common problems that have been seen with addresses.  This weekend I had cause to look at it and thought there must be a better way of representing it all.

Couple of thoughts crossed my mind:

1. I’m not throwing exceptions anywhere, and although I know the method, so use it as I’d expect, perhaps I should be throwing a FormatException? or some others?
2. It’d be easy to make this an extension method, but I guess it’d be an extension to System.String, and doesn’t really feel right as it serves such a focussed purpose.
3. Should I be doing any other checks in the code that I’m not already?

I’ll have a read around and look at refactoring, but thought I’d post it here so that I have a record of the ‘before’ and ‘after’ views.

```csharp
/// /// 
/// 
/// 
/// 
/// 
public static string ValidateEmail(string email, out string error)
{
	try
	{
		error = "";

		// Pre-formatting steps
		email 	= email.Trim().Replace(" ", "");
		email 	= email.Replace(",", ".");												// mostly, commas are full stops gone wrong
		email 	= (email.EndsWith(".")) ? email.Substring(0, email.Length-1) : email;	// kill any full stop at the end of an address
		email	= email.Replace(@"""", "");												// remove " in the email address
		email	= (email.StartsWith("'")) ? email.Substring(1) : email;					// remove ' at the start of the address
		email	= (email.EndsWith("'")) ? email.Substring(0, email.Length-1) : email;	// remove ' at the end of the address

		// STEP 1	- No '@' symbol in Email
		if (!email.Contains("@"))
		{
			error = "Email contains no '@' symbol.";
			return "";
		}

		// STEP 2	- More than 1 '@'symbol in Email
		if (email.Split('@').Length > 2)
		{
			error = "Email contains too many '@' symbols.";
			return "";
		}

		// STEP 3	- No .com, .co.uk at end of addresses
		//			- Invalid characters ()<>,?/\|^!"£$%^&* ??? in address
		Regex _regex = new Regex(@"^[-\w._%+']+@[-\w.]+\.[\w]{2,4}$", RegexOptions.IgnoreCase);
		if (!_regex.IsMatch(email))
		{
			error = "Email address appears invalid.";
			return "";
		}
		
		return email;
	}
	catch
	{
		error = "Unknown error with email address.";
		return "";
	}
}
```