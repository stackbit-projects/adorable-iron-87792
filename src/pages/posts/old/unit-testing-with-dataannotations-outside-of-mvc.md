---
title: "Unit Testing with DataAnnotations outside of MVC"
date: "2010-04-11"
template: "post"
---

This past week has seen us start on a big project at work to re-architect the site into .net and [MVC2](http://www.asp.net/mvc/).  Naturally we have our models in a separate project, and we have two separate test projects (Unit and Integration) setup to use [NUnit](http://www.nunit.org/).

As it’s early days for us, and our first “real” MVC project I thought I’d write this up, a) as an aid to learning for me, but b) to try to gain feedback from the community on what they do with regards validation on their models.

I can see a few different ways we could have done this (annotate the [ViewModels](http://blogs.msdn.com/dphill/archive/2009/01/31/the-viewmodel-pattern.aspx) we’ll use on the front end, build in logic into our setters to validate, etc. etc.) but we’re now going down a route that so far feels ok.  That said, we’re focussing solidly on the modelling of our business logic at present, so haven’t yet brought the model “out to play” as it were.

Hopefully the above gives a wee bit of insight into where we are with it.

We’ve decided to plump for the [MetaData](http://msdn.microsoft.com/en-us/library/ee256141%28VS.100%29.aspx) model approach to keep the main objects slightly cleaner – an example for us would be:

```csharp
namespace MyCompany.Models.Entities
{
	/// /// 
	/// 
	[MetadataType(typeof(MyCompanyUserMetaData))]
	public class MyCompanyUser
	{
		public int UserId { get; set; }

		public string Username { get; private set; }
		...

		public void SetUsername(string newUsername)
		{
			if (Username != null)
				throw new ArgumentException("You cannot update your username once set");

			//TODO: where do we ensure that a username doesn't already exist?
			Username = newUsername;
		}
	}
}
```

and then in a separate class:

```csharp
namespace MyCompany.Models.Entities
{
	public class MyCompanyUserMetaData
	{
		[Required(ErrorMessage="Your password must be between 6 and 20 characters.")]
		[StringMinimumLength(6, ErrorMessage="Your password must be at least 6.")]
		public string Password { get; set; }

		[Required(ErrorMessage="Your username must be between 6 and 20 characters.")]
		[StringLength(20, MinimumLength=6, ErrorMessage="Your username must be between 6 and 20 characters.")]
		[MyCompanyUserUsernameDoesNotStartWithCM(ErrorMessage="You cannot use the prefix 'CM-' as part of your username")]
		[CaseInsensitiveRegularExpression(@"^[\\w\\-!_.]{1}[\\w\\-!_.\\s]{4,18}[\\w\\-!_.]{1}$", ErrorMessage = "Your username must be between 6 and 20 characters and can only contain letters, numbers and - ! _ . punctuation characters")]
		public string Username {get;set;}
	}
}
```

With all of this in place you’re all well and good for the MVC world, though unit testing just doesn’t care about your Annotations so your simple unit tests:

```csharp		
[Test]
public void SetUsername_UsernameTooShort_ShouldThrowExceptionAndNotSetUsername()
{
	// Arrange
	testUser = new MyCompanyUser();
			
	// Act

	// Assert
	Assert.Throws(() => testUser.SetUsername("12345")); // length = 5
	Assert.That(testUser.Username, Is.Null, "Invalid Username: Username is not null");
}
```

won’t give you the expected results as the logic of that is based upon the DataAnnotation.

### What was our solution?

After much reading around (there didn’t seem to be an awful lot out there covering this) we took a two step approach.  First was to allow SetUsername to validate against the DataAnnotations like so:

		
```csharp
public void SetUsername(string newUsername)
{
	if (Username != null)
		throw new ArgumentException("You cannot update your username once set");

	**Validator.ValidateProperty(newUsername, new ValidationContext(this, null, null) { MemberName = "Username" });**

	//TODO: where do we ensure that a username doesn't already exist?
	Username = newUsername;
}

[Validator](http://msdn.microsoft.com/en-us/library/system.componentmodel.dataannotations.validator_members%28v=VS.100%29.aspx) is well documented and there are a few examples out there of people doing this within their setters.  Essentially validating the input for a particular MemberName (Username in this case).
```

The second step was necessary because of the approach we’d taken with the MetaData class above, and it was a mapping in the TestFixtureSetup within our unit tests:

```csharp
TypeDescriptor.AddProviderTransparent(new AssociatedMetadataTypeTypeDescriptionProvider(typeof(MyCompanyUser), typeof(MyCompanyUserMetaData)), typeof(MyCompanyUser));
```

This line (though I’ve yet to look down at the source code level) would appear to just be a standard mapping for the class to tell it where to find the metadata/annotations.

After putting those two things in place, the unit tests successfully validate against the annotations as well as any coded business logic, so jobs a good un!

### Was it the right solution?

This is where I ask you, the person daft enough to suffer this blog post!  I have no idea if there is a better way to do this or how this will pan out as we propagate up to the MVC level – will I be causing us headaches taking this approach, will it simply not work because of overlap between the way MVC model binder validates versus what we’ve done down at the domain level?

It’s still early days for the project, and the above feels like a nice way to validate down at a business domain level, but how it pans out as we propagate wider and start letting other projects consume, hydrate and update the models… well that’s anyone's guess!

Comments very much welcome on this one folks :)
