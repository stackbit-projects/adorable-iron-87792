---
title: "Business Exceptions in c# (as I understand them!)"
date: "2010-05-12"
template: "post"
---

Thought I’d best caveat the post as this really is just a collection of thoughts from a number of very clever people, and I’ve come to wonder over the past few days (since [#dddscot](http://developerdeveloperdeveloper.com/scotland2010/)) whether this is a good way to handle business exceptions or not.

My approach has been born out of a cracking talk by Jeffrey Richter at [DevWeek](http://www.devweek.com/) this year (see the summary post elsewhere in my blog) where he talked about exception within your software and (as [@plip](http://twitter.com/plip) did at dddscot this year) about embracing them.  He talked about exceptions in the following way though:

1. Exceptions are not just for exceptional circumstances
2. They are there as a means of saying ‘something hasn’t worked as expected, deal with it’
3. They should be thrown when they can reliably be managed (be that logging or something else)
4. They should be useful/meaningful

In my other post, I used the example of ProcessPayment as a method, and the various things that could go wrong during that method, but I thought I’d bring together a simple app that demonstrates how we are using exceptions currently.

### The reason for this post

There was a lot of discussion after #dddscot about how folks handle this sort of thing, and really, there were some very clever people commenting!  It’s kinda made me nervous about the approach we’re taking, you all know the crack:

**Dev1:** “And that new method works even if the input is X, Y, and A?”

**Dev2:** “It did until you asked me, but now I’m going to have to test it all again!”

Ahhh, self doubt, you have to love it :)

Though I digress – basically, I would love to get some feedback from the community on this one.

### Business information – what are the options?

Ok, if we take a simple method call, something like:

```csharp
ProcessLogin(username, password)
```

How can we find out if that method fails for whatever reason?  If it does fail, why does it fail?  Was the username wrong?, is their account disabled?, did the password not match up?  This is a relatively straight forward method which is why I’ve chosen it for the demo, though there are any number of things that can go wrong with it.

**Option 1 – returning an enum or something that can identify the type of error**

So the method signature could be:

```csharp
public ProcessLoginResult ProcessLogin(string username, string password) {
	// stuff
}

public enum ProcessLoginResult {
	Success,
	Fail_UsernameMismatch,
	Fail_PasswordMismatch,
	Fail_AccountDisabled,
	Fail_AccountCoolingOff,
	Fail_AccountSelfExcluded,
	Fail_AccountClosed
}
```

You may feel like that’s a lot of fail states, but these are what I work with in my current environment so they have to be included.

Obviously then we have something from the calling code like:

```csharp
var result = ProcessLogin(username, password);

if (result != ProcessLoginResult.Success) {
	switch(result) {
		case ProcessLoginResult.UsernameMismatch:
		case ProcessLoginResult.PasswordMismatch:
			ModelState.AddModelError("General", "We have been unable to verify your details, etc. etc.");
			break;
		case ProcessLoginresult.[errorstate1]
			return RedirectToAction("ErrorState1", "ErrorPages");
		case ... [for each extra error state]
	}
}
```

There are obvious pro’s to this approach from my point of view – one is that we’re not throwing exceptions!  People talk a lot about the performance overhead in actually throwing new exceptions – there’s generally a sucking in of teeth as they do this.  I personally have no idea how “expensive” they are to raise, and it’s certainly something I’ll have to look into.

The difficulty here for me though is two-fold:

1. If I want the richness of business information to return from my methods on failure, I need to come up with (almost) an enum per method to define the states that it can return with?

3. If I have a different method (e.g. GetUserById(userId)) my only option is to setup the method signature with the user as an out param or pass it down by reference.

**Option 2 – Business Exceptions**

And this is the approach I’ve taken, though again – feedback very much appreciated!  Each of the possible fail states becomes a potential exception.  So the ProcessLogin method becomes:

```csharp
/// /// Processes the login.  Steps are:
///  - Check the existence of the user
///  - Check the password matches (yup, we'd be hashing them here, no need for the demo)
///  - Check the account status
/// 
/// The username.
/// The password.
/// 
public MyCompanyUser ProcessLogin(string username, string password)
{
	MyCompanyUser user;

	try
	{
		user = dal.GetUserByUsername(username);
	}
	catch (MyCompanyUserNotFoundException)
	{
		//TODO: LOGGING
		throw; // but then pass the exception up to the UI layer as it is most easily able to deal with it from a user perspective
	}

	if (user.Password != password)	
	{
		//TODO: LOGGING
		MyCompanyUserWrongPasswordException ex = new MyCompanyUserWrongPasswordException("Password doesn't match");
		ex.Data.Add("Username", username);
		// potentially if you had an MD5 or something here you could add the hashed password to the data collection too

		throw ex;
	}
	
	switch(user.AccountStatus)
	{
		case AccountStatus.SelfExcluded:
		{
			//TODO: LOGGING
			MyCompanyUserSelfExcludedException ex = new MyCompanyUserSelfExcludedException("User self excluded");
			ex.Data.Add("Username", username);
			throw ex;
 		}	
		case AccountStatus.CoolingOff:
		{
			//TODO: LOGGING
			MyCompanyUserCoolingOffException ex = new MyCompanyUserCoolingOffException("User cooling off");
			ex.Data.Add("Username", username);
			throw ex;
		}	
		case AccountStatus.Disabled:
		{
			//TODO: LOGGING
			MyCompanyUserAccountDisabledException ex = new MyCompanyUserAccountDisabledException("Account disabled");
			ex.Data.Add("Username", username);
			throw ex;
		}	
		case AccountStatus.Closed:
		{
			//TODO: LOGGING
			MyCompanyUserAccountClosedException ex = new MyCompanyUserAccountClosedException("Account closed");
			ex.Data.Add("Username", username);
			throw ex;
		}	
	}
	return user;
}
```

obviously with this in place I can either Log at this level or log at the UI layer (I don’t have a strong feel architecturally either way).

The process login method call at the UI layer then becomes a little more convoluted:

```csharp
try
{
	MyCompanyUser user = service.ProcessLogin(model.Username, model.Password);

	return RedirectToAction("LoggedIn", "Home");
}
catch (MyCompanyUserSelfExcludedException)
{
	return RedirectToAction("SelfExcluded", "ErrorPages");
}
catch (MyCompanyUserCoolingOffException)
{
	return RedirectToAction("CoolingOff", "ErrorPages");
}
catch (MyCompanyUserAccountDisabledException)
{
	return RedirectToAction("AccountDisabled", "ErrorPages");
}
catch (MyCompanyUserAccountClosedException)
{
	return RedirectToAction("AccountClosed", "ErrorPages");
}
catch (MyCompanyUserException)
{
	// if we're this far, it's either UserNotFoundException or WrongPasswordException, but we'll catch the base type (UserException)
	// we can log them specifically, handle them specifically, etc. though here we don't care which one it is, we'll handle them the same
	ModelState.AddModelError("General", "We have been unable to match your details with a valid login.  (friendly helpful stuff here).");
}
```

I don’t know why I find this a more elegant solution though – it certainly doesn’t generate any less code! There is very much a need for good documentation in this one (each method call documenting what types of exceptions can be thrown).

### Want to see more?

I’ve put together a test VS2010 project using MVC2 and separate projects for the exception definitions and one for the models/services/dal stuff.

It’s rudimentary, but our core solution as Unity in there as an IoC container, it has interface based Services and Repositories, it has unit tests etc. and it just wasn’t viable (or commercially acceptable) to make any of that available, so I’ve distilled it down to the basics in the solution.

What I’d love now is feedback – how do people feel about this approach (Business Exception led) as opposed to the other?  What other approaches are available?  Is it bad to use exceptions in this way (and I’m fine if the answer is ‘ffs tez, stop this now!’ so long as there’s a good reason behind it!)

The code is available on google code at: [http://code.google.com/p/business-exception-example/](http://code.google.com/p/business-exception-example/ "http://code.google.com/p/business-exception-example/")

and I’ve only created a trunk (subversion) at present at: [http://code.google.com/p/business-exception-example/source/browse/#svn/trunk](http://code.google.com/p/business-exception-example/source/browse/#svn/trunk "http://code.google.com/p/business-exception-example/source/browse/#svn/trunk")

**Feedback pleeeeeez!**
