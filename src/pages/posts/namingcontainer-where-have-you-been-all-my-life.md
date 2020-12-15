---
title: "NamingContainer, where have you been all my life!"
date: "2009-05-06"
template: "post"
---

Well, it’s been where it’s always been – in the .net framework, all the way back to version 1.0 apparently!  I’m sure I must have written some awful code in the past to get around the fact that I didn’t know about this, and I really must spend more time getting down to the details of the framework for reasons of framework nuggets like this.

Imagine you have a ListView and want to allow updates on each item, with perhaps a text field etc. in there, and you click a button inside that ListViewDataItem.  NamingContainer for the button will return that ListViewDataItem so that you can find just within that container… ace!

```csharp
protected void btnWishList_Click(object sender, EventArgs e)
{
    Button _button = ((Button)sender);
    RadTextBox tb = (RadTextBox)_button.NamingContainer.FindControl("txtNotes");
    // do other processing
}
```

the above is formatting awfully at the moment, looking for a nice wordpress syntax plugin.
