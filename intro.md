### Angular documentation's Hero app demo implemented using React
React and Angular are perhaps the two most popular UI frameworks for building Single Page Applications.
SPAs are challenging to build owing to the fact that they are comprised of a number of different parts, each of which in itself can present a considerable programming challenge.
Angular and React assist in the development of SPAs by providing solutions to these problems.
In this article I want to carry out a comparison of these solutions.
To help illustrate this discussion, I created a React application which emulates the demonstration Hero app that can be found in Angular's documentation.The code for this can be found [here](https://github.com/Richardinho/react-hero-app-with-routing)

The main difference between the React and Angular routers is that React's uses *dynamic routes* whilst Angular's uses *static routes*.
What this means is that static routes are configured at compile time in a configuration file.
Dynamic routes, however, are configured within Components themselves and so are able to respond to changes in the environment and user events that occur at run time. 
As you would imagine, this gives a lot of flexibility.

The configuration takes place within the JSX.

```
  <Route path="/crisis-center" component={ CrisisListComponent }/>
```
Compare this with the configuration within an Angular application: 


```
  const crisisCenterRoutes: Routes = [
    {
      path: '',
      component: CrisisCenterComponent,
      children: [
        {
          path: '',
          component: CrisisListComponent,
          children: [
            {
              path: ':id',
              component: CrisisDetailComponent,
              canDeactivate: [CanDeactivateGuard],
              resolve: {
                crisis: CrisisDetailResolver
              }
            },
            {
              path: '',
              component: CrisisCenterHomeComponent
            }
          ]
        }
      ]
    }
  ];
```
There is another benefit in having components be responsible for configuration: If you look at Angular's static congfiguration, you will see that there is a one to one relationship between a route and a component. In fact, for any one route, it is only possible to display one component. This a serious hindrance in Angular. In React, however, any one route can have any number of components; it's up to the components!

### Parameters
Parameters are how data is passed in the URL to activated components.

Angular has several kinds of parameter:
* Route parameters - these part of the path. e.g. '/foo/:id'
* optional route parameters - these use matrix notation and allow optional, complex, or multi-variant values.
* query parameters - key value pairs appearing after the `?` symbol.
* fragment - arbitrary string after the `#` symbol.

In theory, all these are possible in React too, but React doesn't provide support out of the box for optional route parameters.
Angular also provides parameters as a stream. I have attempted to do the same by using a BehaviourSubject object and updating it whenever the match property changes.
See the Observables section above for more detail.

### Animations
Animations are created in React using the `react-transition-group` library.
The aim in this app is to have a nice transition effect whenever a route changes.
I achieve this using a custom class whose purpose is to wrap our route's component.

```

  export default class TransitionRoute extends React.Component {

    render () {
      const PageComponent = this.props.component; 
      return (
          <Route
            path={this.props.path}
            children={( props ) =>(
                <TransitionGroup component={firstChild}>
                  {
                    props.match &&
                      <CSSTransition
                        classNames="page"
                        timeout={400}
                      >
                        <PageComponent {...props}/> 
                      </CSSTransition>
                  } 
                </TransitionGroup>
              )}
           />

          );
    }
  }
```

Although not technically a subclass of the `Route` component, it is useful, I believe, to think of it as such; 
It is used with exactly the same props and can be used as a drop in replacement for that component.

```
  <div className="container">
    <TransitionRoute component={HeroListComponent}     path="/superheroes"  />
    <TransitionRoute component={HeroDetailComponent}   path="/hero/:id"     />
    <TransitionRoute component={CrisisCenterComponent} path="/crisis-center"/>
    <TransitionRoute component={AdminComponent}        path="/admin"        />
    <TransitionRoute component={LoginComponent}        path="/login"        />
  </div>
```
Some of this code is undeniably a little opaque - firstChild, for example - and a bit hacky.
Of course this is partly down to my own shortcomings, but, nonetheless, it does point to the issues that can be thrown up by not having, as Angular does, these things done for you.

##### Guards
The purpose of a guard is to govern access to a route.
In Angular, there are a number of types of guard defined.
The simplest is the `CanActivate` guard, which simply determines whether a route should be activated when its path matches the current location.
There is a `CanDeactivate` guard, which determines deactivation of a route.
Angular guards can also be used for preloading data and determining whether modules can be lazily loaded.

The React router does not provide guards, but it is possible to manually implement them.

The Angular version of the Hero app uses several different kinds of guard.
In my React version, I implemented an equivalent to the 'CanActivate' guard for the admin section.

The app requires that the admin page can only be navigated to if the user is currently logged in. 
If they are not, then the app should redirect them to the login page.
This basically comes down to some branching logic, which renders the admin components when the user is logged in, and a `<Redirect/>` component when they are logged out.

```
  if (this.props.adminservice.isloggedin()) {
    return (
      <div>
        <h3>admin page</h3>
        
        rest of page here...

      </div>
    )    
  } else {
    return (<redirect to="/login?returnto=/admin"/>);
  }

```

The redirect URL includes a query parameter that gives the address to return to.
Here is a fragment of the component that is redirected to.

```
export default class Login extends Component {

  ... 

  redirectBack() {
    const search = this.props.location.search.slice(1);
    const params = queryString.parse(search);
    const url = params.returnto || '/admin'; 
    this.props.history.push(url);
  }

  logIn() {
    this.props.adminService.logIn(); 
    this.redirectBack();
  }

  ...
}

```
After the user logs in, by simply pressing the 'Login' button,  a message will be sent to the `adminService` to alert it that the user is now logged in; the `redirectBack()` method will be called, which first extracts the address of the previous location from the query parameter then navigates to it.

The Angular app also uses the `Resolve` and `CanLoad` guards.
These are more challenging to implement, and I did not do so on this project. 

Angular is obviously more convenient in providing guard functionality 'out of the box' than in React, where they need to be manually implemented.

#### Lazy Loading
Angular allows modules to be lazily loaded when the route that they are associated with are activated. Once again, this is functionality that does not come out of the box with React Router and so requires third party libraries.


Angular's lazy loading requires the configuration property `loadChildren` to be added to the route's configuration.
When the relevant path is visited in the browser, Angular will make a request to the server for the correct code.

```

  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
    data: { preload: true }

  }

```
In order to do something similar in React, I have used the [react-loadable](https://github.com/jamiebuilds/react-loadable) library. 
This is the library that is recommended on the [ react router website ](https://reacttraining.com/react-router/web/guides/code-splitting). It does require a little boilerplate to be written. This is a higher order component which wraps the actual component.

```

  import React, { Component } from 'react';
  import Loadable from 'react-loadable';

  class Loading extends Component {
    render() {
      return (<h1>loading.....</h1>);
    }
  }

  const LoadableComponent = Loadable({
    loader: () => import('./hero-list-component'),
    loading: Loading,
  });

  export default class LoadableFoo extends React.Component {
    render() {
      return <LoadableComponent />;
    }
  }

```
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


#### Resolvers
A *resolver* is a type of guard that will attempt to retrieve data, usually from the server, and only allow the component to be rendered if the ddata is successfully retrieved. This means that when a fetch for data fails, there wont be the unsightly flash of an empty page.
Angular has this capability out of the box. In React you need to implement it yourself.


### Observables
Observables, also known as *Streams*, are data sources which emit values periodically.
Although not an integral part of it, they are heavily used in Angular.

They have some similarities to promises and can be used where they are, such as for carrying out fetches for data from the server.
One big advantage they have over promises is that they can be cancelled.
In an app that uses routing, it is very useful to be able to cancel a fetch request when the user navigates to another page whilst the request is in flight.

In Angular, it is a convention for components to be injected with service classes which provide methods that return `Observable` objects which the component can subscribe to in order to receive data. 

In my view, the React/Redux paradigm is inferior to this as it tends to be based on promises which cannot be cancelled.
In my React app, I decided to try emulate the Angular conventions for fetching data using services and observables.

```

  @Inject('crisisService')
  export default class CrisisDetailComponent extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        id: -1,
        name: '',
        editName: ''
      }

      ...

    }

    componentWillReceiveProps(nextProps) {
      this.match.next(nextProps.match);
    }

    componentDidMount() {
      this.match = new Rx.BehaviorSubject(this.props.match);

      this.subscription = this.match
        .map(match => match.params.id) 
        .switchMap(id => {
          return Rx.Observable.fromPromise(this.props.crisisService.getCrisis(id)); 
        })
        .subscribe(crisis => {
          this.setState(crisis);
        });
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    ...

    render () {
      ... 
    }
  }
```
In this case, the Observable `this.match` represents a stream of `match` objects, each match object being data about how the current route matches the component's path. The reason a stream makes sense is because the same component can match successive routes.
For each match object, a new set of data is required from the server. You can see how our `crisisService.getCrisis()` method returns a promise which we convert into an Observable.

When the request is in flight, the user could navigate away from the route prompting a new request. If we were not careful, an old request could come back and get mixed up with a newer one. It is thus important that whenever we make a new request the old request is cancelled. `switchMap` method does this. In my opinion it is perhaps the 'killer feature' of observables.
We also want to make sure that the observable is unsubscribed from when we un mount the component. You can see that we do this within the `componentWillUnmount` lifecycle method.

