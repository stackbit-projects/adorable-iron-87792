---
title: "jQuery, Validation, and asp.net"
date: "2009-09-18"
template: "post"
---

Well, new job, new challenges, and finally my brain can switch off at the end of a day!

This past week or so I’ve been playing with a new registration process for a website, and decided to wherever possible depart from the path of least resistance (classic asp.net, validation, telerik controls, asp.net ajax etc.) and try to focus on the user experience that can be gained from using jquery and any associated plugins.

I plumped for hand rolling my own accordion as I needed more flexibility than that available from the standard plugins.  The area I’ve been most enlightened with though is the jquery.validation plugin.  I love the flexibility in the tool, the customisation, and the improvements it can bring to a form.

a simple:

$(‘input:text:not(.skip_auto_validation),input:password,select:not(.skip_auto_validation)’).blur(

function() {
        validate_field(this);
});

has allowed me to validate fields on loss of focus, and the method targets a number of elements on fail and highlights them.

## Before Validation

[![image](/images/image_thumb.png)](http://idisposable.co.uk/files/image.png)

## Blur on username – fail

[![image](/images/image_thumb1.png)](http://idisposable.co.uk/files/image1.png)

which incorporates a $.ajax call to an .ashx handler, and after the call has occured, the user either gets a nice slide down message or a nice indicator that everything is well.

## Blur on username – success

[![image](/images/image_thumb2.png)](http://idisposable.co.uk/files/image2.png)

The function that handles the validation is:

```javascript
/// /// field by field validation – we only want to validate fields that are
/// either already validated or have previously succeeded/failed validation
/// and now have a different value
/// 
function validate_field(field) {
    var prev_icon = $(field).prev(‘.icon_success,.icon_fail’);
    if ($(field).val().length > 0 || prev_icon.length > 0) {
        if (!$(field).valid()) {
            prev_icon.remove();
            $(field).addClass(‘field_error’).before(icon_fail).prev().prev().addClass(‘label_error’).parent().parent().addClass(’section_error’);
        }
        else {
            prev_icon.remove();
            $(field).removeClass(‘field_error’).before(icon_success).prev().prev().removeClass(‘label_error’).parent().parent().removeClass(’section_error’);
        }
    }
};
```

Obviously there are some specific .parent() and .before() .prev() etc. that’ll only work in this pages layout, but you get the idea.

## Validating Server Side Fields

I had a mare initially with this until I realised that it was the UniqueID that I wanted of the control.  After that, jobs a good un.

```javascript
$(‘#aspnetForm’).validate({
    errorElement: ‘div’,
    errorClass: "validate_error",
    // what rules do we have – remember this is page 1
    rules:    {
        "<%=txt_UserName.UniqueID %>": {
            required_6_20:                true,
            username_already_in_use:    true,
            minlength:                    6,
            maxlength:                    20
        },
        "<%=txt_Password1.UniqueID %>": {
            required_6_20:                true,
            minlength:                    6,
            maxlength:                    20
        }
        "<%=txt_Email1.UniqueID %>": {
            required:                    true,
            email_already_in_use:        true,
            email:                        true
        },
        "<%=txt_Email2.UniqueID %>": {
            email:                        true,
            equalTo:                    "#<%=txt_Email1.ClientID %>"
        }
    },
    messages: {
        "<%=txt_UserName.UniqueID %>": {
            required_6_20:        ‘Your username must be between 6 and 20 characters and can only contain letters, numbers and – ! _ . punctuation characters’,
            username_already_in_use:    ‘Your username is already in use – please select another’,
            minlength:            ‘Your u
sername is too short – please change it to be between 6 and 20 characters’,
            maxlength:            ‘Your username is too long – please change it to be between 6 and 20 characters’
        },
        "<%=txt_Password1.UniqueID %>": {
            required_6_20:        ‘Your password must be between 6 and 20 characters and can only contain letters, numbers and – ! _ . punctuation characters’,
            minlength:            ‘Your password is too short – please change it to be between 6 and 20 characters’,
            maxlength:            ‘Your password is too long – please change it to be between 6 and 20 characters’
        },

        "<%=txt_Email1.UniqueID %>": {
            required:            ‘You must enter an email address’,
            email:                ‘You must enter a valid email address’,
            email_already_in_use:        ‘Your email is already in use – please enter another or click the link shown’
        },
        "<%=txt_Email2.UniqueID %>": {
            email:                ‘You must enter a valid email address’,
            equalTo:            ‘\\’Email\\’ and \\’Confirm email\\’ must match – please double check them’
        }
    }
});
```

so with .net controls you have to specify the field by using quotes, and <%= field.UniqueID %> to really get the rules to work.

## Custom Rules

Creating custom validation rules is a doddle – just ensure they’re called before .validate()

```javascript
jQuery.validator.addMethod(
    "valid_postcode",
    function(value, element) {
        // uk postcode regex – all straight forward apart from that last bit – apparently
        // uk postocdes don’t have the letters [CIKMOV] in the last 2
        var regex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][ABD-HJLNP-UW-Z]{2}$/i;    //after – no need for space
        return regex.test(value);
    },
    "This field is required"
);
```

This one validates against a UK postcode (regex actually published by the uk government – I couldn’t believe it!).

You then just say:

```javascript
rules: {
“<%= txtPostcode.UniqueID %>”:
valid_postcode: true
}
```

It’s really nice to see microsoft are including this .validation library in the 2010 release of visual studio (I’m not sure if that means it’s going to replace the existing method of validation or not, but the fact that it’s gotten that level of support from Microsoft is ace.

Also, the CDN from Microsoft seems to include this as one of the libraries, so definitely an indicator of good things for the plugin.
