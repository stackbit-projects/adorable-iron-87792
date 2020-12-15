---
title: "Creating a drop down list from an enum in ASP.NET MVC"
date: "2013-05-18"
template: "post"
---

Thought I’d share some work we’ve done in our MVC projects to ease the generation of drop down lists from enum types which makes life a hell of a lot easier for us when working with enums in views.

The basic premise focuses around the method below which is represented all over the web really (a lot of people seem to have come up with the solution at around the same time it seems) which is given an enum:

```csharp
public enum UserType
{
	Visitor = 1,
	NonDepositor,
	DepositedOnce,
	DepositedTwice,
	Regular,
	LapsedRegular,
	LapsedNonDepositor
}
```

We can create a simple enum to select list convertor with the following:

```csharp
public static SelectList ToSelectList<TEnum>(this TEnum enumObj)
{
	var values = (from TEnum e in Enum.GetValues(typeof(TEnum))
					select new { ID = e, Name = e.ToString() }).ToList();

	return new SelectList(values, "Id", "Name", enumObj);
}
```

Caveat: I didn't invent this, it's a pattern that's published in a lot of places (stack overflow and other peoples blogs).

## Making it look pretty

This may well work fine for a lot of your use cases or indeed for simple admin/internal systems, but our use cases dictated we extend this a little.  First and foremost was getting friendly strings out of this for the display value (our users like Words Separated With Spaces – curious that).

You could easily go with a simple regex on the ‘ToString()’ part of that code – something like:

```csharp
public static string PascalCaseToPrettyString(this string s)
{
	return Regex.Replace(s, @"(\B[A-Z]|[0-9]+)", " $1");
}
```

And your call in the 'ToSelectList' method above would just be 'ToString().PascalCaseToPrettyString()' (for info: the regex above will take all uppercase characters or collections of numbers that aren’t at a word boundary and put a space in front of them).  This would give us something like ‘Deposited Once’ as opposed to ‘DepositedOnce’

Again, this may well suit exactly what you want, but what if the description you want to show to the user really doesn’t match what you want as the enum value.  For this, we look to the [Description] attribute and would decorate up our enum as follows:

```csharp
public enum UserType
{
	[Description("Visitor (Not logged in)")]
	Visitor = 1,
	[Description("Non-depositing player (Created account, no deposits)")]
	NonDepositor,
	[Description("Single depositing player")]
	DepositedOnce,
	[Description("Twice depositing player")]
	DepositedTwice,
	[Description("Regular depositing player (Has 3 or more deposits)")]
	Regular,
	[Description("Lapsed Regular (Not logged in for the past 12 weeks)")]
	LapsedRegular,
	[Description("Lapsed Non-Depositor (Not deposited, not logged in for the past 12 weeks)")]
	LapsedNonDepositor
}
```

In this case we can simply extend our ‘PascalCaseToPrettyString’ concept a little further with:

```csharp
public static string GetDescriptionString(this Enum val)
{
	try
	{
		var attributes = (DescriptionAttribute[])val.GetType().GetField(val.ToString()).GetCustomAttributes(typeof(DescriptionAttribute), false);

		return attributes.Length > 0 ? attributes[0].Description : val.ToString().PascalCaseToPrettyString();
	}
	catch (Exception)
	{
		return val.ToString().PascalCaseToPrettyString();
	}
}
```

This will attempt to grab the DescriptionAttribute from the enum value if there is one.  This will handle both situations (with and without Description attribute) nicely, and falls back to at least something that looks nice to the user if a description attribute isn't present).  Our ‘ToSelectList()’ method will then just update to call .GetDescriptionString()’ instead of ‘ToString()’ for the value  (you will have to change the enum call like so):

```csharp
public static SelectList ToSelectList<TEnum>(this TEnum enumObj)
		{
	var values = (from TEnum e in Enum.GetValues(typeof(TEnum))
					select new { ID = e, Name = (e as Enum).GetDescriptionString() }).ToList();

	return new SelectList(values, "Id", "Name", enumObj);
}
```

And we’re left with:

[![image](/images/image_thumb26.png "image")](http://idisposable.co.uk/wp-content/uploads/image26.png)

## So far so good – what next?

The next steps are really edge cases, though it was useful to extend the helper in our use cases to deliver flexibility in all cases where we needed it.

### Filtering

There are situations where you want to include only those options that are applicable based upon some other selection parameter or indeed some particular use case.  For this we can use a Func delegate along the lines of:

```csharp
public static SelectList ToSelectList(this TEnum enumObj, Func predicate = null)
{
	IEnumerable values = (from TEnum e in Enum.GetValues(typeof(TEnum))
									select e);

	if (predicate != null)
		values = (from TEnum e in values
					where predicate(e)
					select e);

	var outputs = (from TEnum e in values
					select new { ID = e, Name = (e as Enum).GetDescriptionString() });

	return new SelectList(outputs, "Id", "Name", enumObj);
}
```

And in our views we can do something along the lines of:

```html
<p>@Html.DropDownListFor(model => model.BankBalanceState, Model.BankBalanceState.ToSelectList( x => x != UserType.LapsedNonDepositor &&
				                                                                                    x != UserType.LapsedRegular))</p>
```

### Adding ‘Please select’ as the first option

A simple one, though it saves you from having to jump through a few hoops if it’s important to have the ‘please select’ option at the top of the list.  This one requires a little more change to our helper method:

```csharp
public static SelectList ToSelectList(this TEnum enumObj, Func predicate = null, bool addPleaseSelect = false)
{
	IEnumerable values = (from TEnum e in Enum.GetValues(typeof(TEnum))
									select e);

	if (predicate != null)
		values = (from TEnum e in values
					where predicate(e)
					select e);

	var outputs = (from TEnum e in values
					select new SelectListItem { Value = e.ToString(), Text = (e as Enum).GetDescriptionString() });

	if (addPleaseSelect)
	{
		var pleaseSelect = new List { new SelectListItem { Text = "--- please select ---", Value = "" } };
		outputs = pleaseSelect.Concat(outputs).ToList();
	}

	return new SelectList(outputs, "Value", "Text", enumObj);
}
```

Which leaves us with:

[![image](/images/image_thumb27.png "image")](http://idisposable.co.uk/wp-content/uploads/image27.png)

### Shuffling the values

Another edge case though one that was useful to us in a number of situations was the shuffling of the values within the list.  We achieved this using a simple extension method:

```csharp
public static ICollection ShuffleList(this ICollection list)
{
	return list.OrderBy( x => Guid.NewGuid()).ToList();
}
```

And included it in the updated ToSelectList like so:

```csharp
public static SelectList ToSelectList(this TEnum enumObj, Func predicate = null, bool addPleaseSelect = false, bool shuffleList = false)
{
	IEnumerable values = (from TEnum e in Enum.GetValues(typeof(TEnum))
									select e);

	if (predicate != null)
		values = (from TEnum e in values
					where predicate(e)
					select e);

	if (shuffleList)
		values = values.ToList().ShuffleList();

	var outputs = (from TEnum e in values
					select new SelectListItem { Value = e.ToString(), Text = (e as Enum).GetDescriptionString() });

	if (addPleaseSelect)
	{
		var pleaseSelect = new List { new SelectListItem { Text = "--- please select ---", Value = "" } };
		outputs = pleaseSelect.Concat(outputs).ToList();
	}

	return new SelectList(outputs, "Value", "Text", enumObj);
}
```

Which is called from the view like so:

```html
<p>@Html.DropDownListFor(model => model.BankBalanceState, Model.BankBalanceState.ToSelectList(shuffleList: true))</p>
```

### Other extensions to this?

We’ve come up with a few more updates to this – one to force presentation via the enum numeric value (oddly in an enum, -1 is rendered after 1 and this isn’t always what you’d hope for).  We’ve also updated it for our multi-tenant websites to support localisation of enum values (though there’s enough work in this to provide an entirely separate blog post).  We’ve also added an optional parameter to ignore the current value of the enum (default to the first value in the select list rather than the selected enum) – again, an edge case, though I’m sure folks can see use cases themselves for this.

Hopefully that was useful – had been meaning to write it up for a while now (we’ve been using it in production now for over a year and it performs quite happily and there seem to be no bottlenecks/issues with it).

## Grab the code

I’ve [put the finished solution onto github](https://github.com/terrybrown/EnumSelectListHelpersAspNetMvc) if anyone wants to grab it and modify it themselves.  If anyone has suggestions on improvements feel free to send a pull request.
