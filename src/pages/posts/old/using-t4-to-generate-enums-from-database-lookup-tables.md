---
title: "Using T4 to generate enums from database lookup tables"
date: "2010-03-24"
template: "post"
---

I’m sure a fair few people will be working on projects like us where we have a database backend with referential integrity, including a number of lookup tables.  A lot of the time in this situation you also want to mirror the lookup values in your code (as enums for us).  Most of the time, it’s relatively easy to just manually create both sets of entries as they will rarely change once created.  Or so we hope!

I quite fancied learning about T4, and the first example I could think of was this tie up between database lookup tables and code enums. 

I love the idea that the output from your T4 work is available at compile time and available directly in your code once you’ve created the template – the synching of things between a database and your code base is an obvious first play.

So with that in mind, lets crack on.

### Initial Setup

I’ve created a simple console app and a simple DB with a couple of lookup tables – simple ‘int / string’ type values.  I installed [T4 Toolbox](http://t4toolbox.codeplex.com/) to get extra code generation options within the ‘Add New…’ dialog, though it turns out my final solution didn’t actually require it – that said, the whole T4 Toolbox project looks very interesting, so I’ll keep an eye on that.

[![image](/images/image_thumb1.png "image")](http://idisposable.co.uk/wp-content/uploads/image1.png)

This will generate a file ‘GenerateCommonEnums.tt’, and the base content of the file is:

[![image](/images/image_thumb2.png "image")](http://idisposable.co.uk/wp-content/uploads/image2.png)

### Add a reference to your DB

At this point, I would have loved to use linq to sql to generate my enums, as it’s a friendly/syntacitcally nice way of getting at data within the database.

That said, this proved far more difficult than I’d have hoped – any number of people had made comments about it, and saying if you ensure System.Core is referenced and you import System.Linq job should be a good un.  It wasn’t in my case.

Thankfully, this wasn’t the end of the investigation.  I managed to find an example online that used a SQLConnection… old skool it was to be!

### So what does the code look like…

The code I generated turned into the following, and I’m sure you’ll agree it aint that far away from the sort of code we’d write day in day out.

```csharp
<#@ template language="C#" hostspecific="True" debug="True" #>
<#@ output extension="cs" #>
<#@ assembly name="System.Data" #> 
<#@ import namespace="System.Data" #>
<#@ import namespace="System.Data.SqlClient" #>
<#
    SqlConnection sqlConn = new SqlConnection(@"Data Source=tombola009;Initial Catalog=TeamDev;Integrated Security=True");
    sqlConn.Open();
#>
namespace MyCompany.Models.Enums
{
	public enum TicketType
	{
		<#
		string sql = string.Format("SELECT Id, Name FROM LOOKUP_TABLE_1 ORDER BY Id");
        SqlCommand sqlComm = new SqlCommand(sql, sqlConn);

        IDataReader reader = sqlComm.ExecuteReader();

        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        while (reader.Read())
        {
            sb.Append(TidyName(reader["Name"].ToString()) + " = " + reader["Id"] + "," + Environment.NewLine + "\\t\\t");
        }
        sb.Remove(sb.Length - 3, 3);

        reader.Close();
        sqlComm.Dispose();
		#>
<#= sb.ToString() #>
	}
	
	public enum TicketCategory
	{
		<#
		sql = string.Format("SELECT Id, Area, Name FROM LOOKUP_TABLE_2 ORDER BY Id");
        sqlComm = new SqlCommand(sql, sqlConn);

        reader = sqlComm.ExecuteReader();

        sb = new System.Text.StringBuilder();

        while (reader.Read())
        {
            sb.Append(TidyName(reader["Area"].ToString()) + "_" + TidyName(reader["Name"].ToString()) + " = " + reader["Id"] + "," + Environment.NewLine + "\\t\\t");
        }

        sb.Remove(sb.Length - 3, 3);

        reader.Close();

        sqlComm.Dispose();
		#>
<#= sb.ToString() #>
	}
}

<#+
	
    public string TidyName(string name)
    {
        string tidyName = name;

		tidyName = tidyName.Replace("&", "And").Replace("/", "And").Replace("'", "").Replace("-", "").Replace(" ", "");
		
        return tidyName;
    }

#>
```

The ‘TidyName’ method was in there just to try to tidy up the obvious string issues that could crop up.  I could have regex replaced anything that wasn’t a word character, though I think this gives me a bit more flexibility and allows customisable rules.

This basically generates me the following .cs file:

```csharp
namespace MyCompany.Models.Enums
{
	public enum TicketType
	{
		Problem = 1,
		MAC = 2,

	}
	
	public enum TicketCategory
	{
		Website_Affiliates = 1,
		Website_Blog = 2,
		Website_CentrePanel = 3,
		Website_CSS = 4,
		Website_Deposit = 5,
		Website_Flash = 6,
		Website_GameRules = 7,
		Website_GameChecker = 8,
		Website_HeaderAndFooter = 9,
		Website_HelpContent = 10,
		Website_Images = 11,
		Website_LandingPage = 12,
		Website_MiscPage = 13,
		Website_Module = 14,
		Website_Multiple = 15,
		Website_MyAccount = 16,
		Website_myTombola = 17,
		Website_Newsletters = 18,
		Website_Playmantes = 19,
		Website_Refresh = 20,
		Website_Registrations = 21,
		Website_Reports = 22,
		Website_TermsAndConditions = 23,
		Website_WinnersPage = 24,
		Website_Other = 25,
	}
}
```

From that point on, if there are extra lookup values added, a simple click of the highlighted button below will re-run the templates and re-generate the CS files.

[![image](/images/image_thumb3.png "image")](http://idisposable.co.uk/wp-content/uploads/image3.png)

### Next Steps

I’m utterly sure there must be an easy way to use linq to sql to generate the code above and I’m just missing it, so that’s the next play area.  I’m going to be playing with the POCO stuff for EF4, so I think the above has given me a taster for it all.

As with all initial plays with this sort of thing, I’ve barely scratched the surface of what T4 is capable of, and I’ve had to rely upon a lot of existing documentation.  I’ll play with this far more over the coming weeks – I can’t believe I’ve not used it before!
