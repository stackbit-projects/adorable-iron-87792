---
title: "Overriding ToString() on your objects using reflection"
date: "2010-07-01"
template: "post"
---

Just a very quick one, more as a reminder to myself on something I’d setup, though as per, would love any feedback.

On a current project we’re using exception driven development, and upon an exception, we’re throwing our own custom business exceptions, and building up the Exception.Data collection with the properties in the objects as they were at the point of exception.

We have a lot of DTO objects down at the dal layer, some with a lot of properties, and we didn’t want to keep having to do:

```csharp
UserNotFoundException ex = new UserNotFoundException();
ex.Data.Add(“Username”, userDto.Username);
ex.Data.Add(“UserId”, userDto.UserId);
ex.Data.Add(“AccountStatus”, userDto.AccountStatus);
...
```

With that in mind, I started working on what reflection could bring to the table and perhaps giving our Dto objects a base type to derive from.

Here’s the initial stab at what I’ve arrived at:

```csharp
public class BaseDto  
{
	public override string ToString()  
	{  
		PropertyInfo[] propertyInfos = this.GetType().GetProperties();   
   
		Array.Sort(propertyInfos, (propertyInfo1, propertyInfo2) => propertyInfo1.Name.CompareTo(propertyInfo2.Name));  
   
		StringBuilder output = new StringBuilder();  
		foreach (PropertyInfo propertyInfo in propertyInfos)  
		{  
			output.AppendFormat("{0}: {1}\\n", propertyInfo.Name, propertyInfo.GetValue(this, null));  
		}  
   
		return output.ToString();  
	}  
}
```

Jobs a good ‘un.  I can now just use:

```csharp
UserNotFoundException ex = new UserNotFoundException();
ex.Data.Add(“userDto”, userDto.ToString());
```

and all properties will be enumerated and documented in that one property of the .Data dictionary.

`<meerkat>simples!</meerkat>`

I hasten to add, this seems to work a treat in testing – I’ve got more rigorous investigation to do to make sure it presents a way forward for us, but thought I’d post it anyway in case anyone found it useful.
