### Named Outlets
Named Outlets are one of the features of Angular that are not easily replicated in React. 
This is a consequence of the different paradigms represented by the two libraries.

In Angular, the outlet is a DOM element into which is rendered the component configured for the current primary route. 
The primary route is that represented by the main part of the URL: the part which appears to the immediate right of the schema and consists of URL segments separated by forward slashes.
But Angular also supports what are called *secondary routes*. 
Secondary routes are independent of the main route and are rendered into separate outlets, called *named outlets*.
Secondary routes routes appear in the URL after the primary route and are surrounded in parenthesis, as in the following example:
They are represented in the URL using a special syntax consisting of an outlet name and its corresponding path separated with a colon and surrounded by parenthesis, as in the following:

```
  http://localhost:4200/crisis-center(popup:compose)

```

This secondary route signifies that the route with path 'compose' should be rendered into the named outlet called 'popup'.
Secondary routes are configured in a similar way to main routes.

```

  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  }

```
A quirk of named outlets is that once a component is rendered within it it will continue to be - even when the user navigates elsewhere - until the path of the route is explicitly set to *null*. 

```
this.router.navigate([{ outlets: { popup: null }}]);

```
React Router does not support secondary routes or named outlets. 

This created a problem in implementing the contact form which in Angular uses secondary routes.
Instead, I bound the rendering of the contact form to a boolean property.
Although this may seem crude, I actually think it gives a better user experience: I don't believe that the displaying of the form is something that should be persisted within the browser history.

I don't particularly like the concept of secondary routes. They seem to run contrary to the idea of URLs representing a single resource.

