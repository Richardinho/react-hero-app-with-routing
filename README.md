In this article, I wish to discuss the respective capabilities of Angular and React for client side routing.


Both libraries (I will refer to them as libraries) have a rich feature set for routing and though there is considerable overlap between them, there are also areas where one has a feature which the other lacks. As I proceed, I will point out these differences.
i

The Angular router that I am going to talk about is that which is part of the official Angular codebase. The React router that I am going to discuss, however, is not part of React's official codebase but is provided by a completely separate party.

Broadly speaking, the two routers work fairlly similarly from a user perspective, but from a developer perspective they are conceptually quite distinct. Angular's router uses static routing. This means that routes are defined in a configuration file which is read at start up time and can't be subsequently changed. React, however, uses 'dynamic routing'. Routes are defined as React Components. This means that they can be set programatically at runtime.

Dynamic routing makes possible some things that are not possible with static routing. For example routes can be respond to changes in the screen viewport size such as when the user switches from a horizontal to a vertical orientation on her device. As we will see, React router lacks some features that Angular's router has. Whether these are absent because the nature of dynamic routing prohibits them or simply because the React router team has not got round to implementing them is an open question.


Angular's documentation on its Router includes a demo app which showcases varoius routing features: The so called 'Hero app'.For the purposes of this article, I have created a clone of this app using React and the React router. I will use this along the way to illustrate various points that I wish to make.


The code for the app can be found here: [react hero app](link)

Here is a list of the routing features of the Angular and React routers that I am going to discuss:
* active links
* lazy loading
* guards
* nested routes
* parameters


#### How routes are defined
##### Angular
Angular apps are made up of modules. Every app has at least one module, but this main module can import other modules.
The routing for an app is set up within the configuration metadata that is passed to a module when it is defined. (see below).
As previously stated, these are static routes. Once defined here, they can't be altered at run time.


```
  const appRoutes: Routes = [
    { path: 'foo', component: FooComponent },
    { path: 'bar', component: BarComponent }
  ];

  @NgModule({
    declarations: [
      AppComponent,
      FooComponent,
      BarComponent
    ],
    imports: [
      RouterModule.forRoot(
        appRoutes
      ),
      BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

```
In React, routes are defined using the `<Route/>` component.

```
  <Route
    path="/foo"
    component={FooComponent}
  />
```
This is a plain old React Component and can be treated as such.

Since attributes can be set programmatically, both the path and the component can be dynamically changed at runtime. Hence 'dynamic routes'.

In Angular, paths determine the component, but, in React, paths are determined by the component.
For components to be able to determine when they can or cannot appear according to the current route  - as opposed to by external configuration - seems more fitting with the philosophy, which both React and Angular embrace, that components are the primary objects that an application is constructed from.

