### Named Outlets
Named Outlets are one of the features of Angular that are not easily replicated in React. This is a consequence of the
different paradigms represented by the two libraries.

In Angular, the outlet is a DOM element into which is rendered the component configured for the current primary route. The primary route is the main part of the URL that appears to the immediate right of the schema and consists of url segments separated by forward slashes. But Angular also supports what are called 'secondary routes'. Secondary routes appear in the URL after the primary route and are surrounded in parenthesis. Following is an example.

```
  http://localhost:4200/crisis-center(popup:compose)

```
Secondary routes are independent of primary routes and are displayed in named outlets. The above URL signifies that the route that is configured in the routing module with a path of 'compose' is active and that it's component should be displayed in the outlet named 'popup'.

This is what the configuration in the routing module looks like.

```

  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  }

```

The named outlet will continue to display the component, even when the user clicks on another link, until the outlet is explicitly set to null.

```
this.router.navigate([{ outlets: { popup: null }}]);

```
React Router does not support multiple routes being encoded within a single URL. Neither does the concept of named outlets make sense in the React paradigm. In Angular, each route, primary or secondary, is associated with a single outlet. In React, on the other hand, there is only one route, by default, that is active at a time, but it can be associated with any number of components.

This created a problem in implementing in React the contact form, which in Angular uses secondary routes.
I solved this by showing the ContactComponent in response to a boolean property of the AppComponent's state, which can be toggled. 
This may seem crude, but actually I don't think the contact form should be part of the persistent state of the page to begin with.

Personally, I don't like the concept of secondary routes. It seems to fly in the fact of what the URL is supposed to mean: A single resource; not multiple.
Named outlets and secondary routes seem to me to be a poor attempt to emulate the dynamic routes in React.
