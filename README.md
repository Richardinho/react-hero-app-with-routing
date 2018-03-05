### Implementing Angular's Hero app using React
SPAs are challenging to build because they are comprised of a lot of complex parts, e.g., routing, templates, data-binding, dependency injection, animations etc.
It's no surprise that developers look for tools to help them build these things, and two of the most popular tools around at the moment are React and Angular.
Two very different philosophies underpin these two technologies: 
Angular strives to be the *one stop shop* for everything that you need to build an SPA, whilst React, on the other hand, follows the [ Single Responsibility Principle ](https://en.wikipedia.org/wiki/Single_responsibility_principle) of doing only one thing (and doing it well), and restricts itself to rendering components. 
When your application needs things that React does not supply, the idea is that you either code it yourself or else find a third party library which does it for you.
This gives you a lot more flexibility and freedom than the Angular approach.

I thought it would be useful to test this idea by creating a React application which replicates, as closely as possible, the behaviour of the demonstration [Heroes](https://angular.io/guide/router) app that Angular features in its documentation.
I think I came fairly close to achieving this goal, but I'll let you, the reader, be the judge. 

This article is divided into sections; Each section concerns a different aspect of an SPA. 
In each section, I will discuss how the Angular Heroes app deals with this, and then how I did in my version.


#### Contents 
* [Routing](#routing)
* [Secondary Routes and Named Outlets](#secondary-routes-and-named-outlets)
* [Observables](#observables)
* [Parameters](#parameters)
* [Guards](#guards)
* [Dependency tInjection](#dependency-injection)
* [Animations](#animations)
* [Lazy loading](#lazy-loading)
* [Summary](#summary)
h

#e### Routing

Here, I use the [*react-router*](https://github.com/ReactTraining/react-router) library, which is maintained by the [react training](https://reacttraining.com/) group.
The main difference between the React router and Angular's is that the former uses *dynamic routes* whilst the latter's are static.

Static routes are configured at start-up time in a configuration file and don't change for the lifetime of the application.
Dynamic routes, on the other hand, are configured within the components themselves. 
This means that they are able to respond to events that occur within the environment as the application runs. 
As you would imagine, this gives a lot of flexibility which is not provided by Angular's router.

Here is an example of configuring a route in React:

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
React's dynamic routes seem much more elegant to me.
It seems right to me that components should be able to decide for themselves what to do in response to the current location of the page.
On the other hand, the Angular router has access to information on all the routes within the app. 
This potentially makes it more powerful than the React router.
There are some deficiencies in React's router - such as with resolvers - and these perhaps are once of the consequences of this.

#### Secondary Routes and Named Outlets
In Angular, the outlet is a DOM element into which is rendered the component configured for the current primary route. 
The primary route is that represented by the main part of the URL: the part which appears to the immediate right of the schema and consists of URL segments separated by forward slashes.
Angular also supports *secondary routes*. 
Secondary routes are independent of the main route and are rendered into separate outlets called *named outlets*.
They are represented in the URL using a special syntax consisting of an outlet name and its corresponding path, separated with a colon, and surrounded by parenthesis, as in the following:

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
A quirk of named outlets is that once a component is rendered within it it will continue to be rendered there - even when the user navigates elsewhere - until the path of the secondary route is explicitly set to *null*. 

```
this.router.navigate([{ outlets: { popup: null }}]);
```
React Router does not support secondary routes or named outlets. 

This created a problem in implementing the contact form which in the Angular app uses secondary routes.
My solution was to bind the rendering of the contact form to a boolean property.
Although this may seem crude, I actually think it gives a better user experience: I don't believe that the displaying of the form is something that should be persisted within the browser history.
The rule of thumb I apply here is to ask myself: would I want to bookmark the page in this state? 
The answer here, for a pop up dialog box, is no, in my opinion, so it's better to show it without changing the location.
I don't particularly like the concept of secondary routes. They seem to run contrary to the idea of URLs representing a single resource.

#### Observables
Observables, also known as *streams*, are data sources which emit values periodically.
Angular uses them heavily, although they aren't an integral part of it.

They have some similarities to promises and can often be used in place of them, such as for carrying out fetches for data from the server.
One big advantage they have over promises is that they can be cancelled.
This is super for useful when the app makes a call to the server, then the user navigates to another location whilst the request is in flight.

Angular uses a lot of observables, albeit they aren't an integral part of it.

React can use of observables as well, of course, but typically React apps use Redux instead. 
Redux can also be made to work with observables, butat the cost of much greater complexity, and it does begin to feel a bit hacky.

For this app, therefore, I decided to use observables for some of the functionality instead of Redux.

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
In this case, the Observable `this.match` represents a stream of `match` objects.
A match object represents a match between the route's path and the current location. 
It contains useful data about this map such as the portion of the URL that is matched.

The reason why an observable makes sense in this case is because the same route can be matched by succeeding locations.
A navigation isn't necessarily always to another page: It may be to the same page but with different parameters. 
In this case, the route component would not be unmounted, and so the same component can handle multiple matches.

For each match object, a new set of data is required to be fetched from the server. 
You can see how our `crisisService.getCrisis()` method returns a promise which we convert into an Observable.

When the request is in flight, the user could navigate away from the route prompting a new request. 
If we were not careful, an old request could come back and get mixed up with a newer one. 
It is thus important that whenever we make a new request the old request is cancelled. 
The `switchMap` method does this. In my opinion it is perhaps the 'killer feature' of observables.
What it does is map a stream of values to a stream of observables and returns a new stream which emits the values emitted by these inner streams.The critical part of it is that when there is a new value on the input stream (our stream of match objects) all the inner streams for which we are still waiting for output on are cancelled. 

We also want to make sure that the observable is unsubscribed from when we unmount the component. 
You can see that we do this within the `componentWillUnmount` lifecycle method.

Streams fit very well with the paradigms involved in web development and they work just as well with React as they do in Angular.

#### Parameters

Parameters are how data is passed in the URL to activated components.

Angular has several kinds of parameter:
* route parameters - these are part of the path. e.g. '/foo/:id'
* optional route parameters - these use matrix notation and allow optional, complex, or multi-variant values.
* query parameters - key value pairs appearing after the `?` symbol.
* fragment - arbitrary string after the `#` symbol.

React supports all of these apart from optional route parameters, which are a bit of an Angular specific thing.
Angular provides parameters to components, through the ActivatedRoute class, as a stream.
You can see how I have implemented this in the section above on observables.

#### Guards
The purpose of a guard is to govern access to a route.
In Angular, there are a number of types of guard defined.
The simplest is the `CanActivate` guard, which simply determines whether a route should be activated when its path matches the current location.
There is a `CanDeactivate` guard, which determines deactivation of a route.
Angular guards can also be used for preloading data and determining whether modules can be lazily loaded.

The React router does not provide guards, but it is possible to manually implement them.

The Angular version of the Hero app uses several different kinds of guard.
In this app, I implemented an equivalent to the 'CanActivate' guard for the admin section.

The app requires that the admin page can only be navigated to if the user is currently logged in. 
If they are not, then the app should redirect them to the login page.
This basically comes down to some branching logic: 
When the user is logged in, the admin components are rendered; otherwise, a `<Redirect/>` component is rendered which, as the name suggests, redirects them to the login page.

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
After the user logs in, by pressing the 'Login' button,  a message will be sent to the `adminService` to alert it that the user is now logged in; the `redirectBack()` method will be called, which first extracts the address of the previous location from the query parameter then navigates to it.

Angular wins over React in supplying guard functionality out of the box. 

#### Dependency Injection
One of the most significant ways that Angular differentiates itself from React is in its use of *dependency injection*, or *DI* for short.
DI is common in backend frameworks (the Spring framework in Java, for example) but less so in front end ones.
DI is essentially a system for creating the runtime objects that make up an application. 
An application without DI will typically include a lot of code that instantiates objects and their dependencies. 
In a large system, this can quickly get very messy indeed. 
DI allows classes to simply declare (usually in some form of annotation) their dependencies, and DI will ensure that, when the app starts up, all the objects will be instantiated and have all the dependencies that they need.

I have written about DI elsewhere on this blog. 
In addition to helping to keep code much leaner and cleaner, it also decouples objects from their dependencies, which greatly assists in testing them in isolation.

Angular uses constructor injection to allow a class to declare what dependencies it needs. 
Here is an example:

```
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {}
```
Nothing else is required for the developer to write. 
When an instance of the class is created it will have those three properties on it.

I decided as an experiment to create a DI system for React.
I decided that I would use ES7 decorators for the annotations that declare dependencies.

This class uses the crisisService service (typically, dependencies are called services).
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

      this.handleNameChange = this.handleNameChange.bind(this); 
      this.save = this.save.bind(this);
    }

    ...

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
  }
```
The decorator takes as its arguments a series of 'keys' which refer to the services that have been registered with the DI system (or 'container').
Here is how services are configured with the container.
```
  const config = [
  {
    key: 'heroService', 
    provider: HeroService
  },{
    key: 'crisisService',
    provider: CrisisService
  }, {
    key: 'adminService',
    provider: AdminService
  }];

  const render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Injector config={config}>
          <Component />
        </Injector>
      </AppContainer>,
      document.getElementById('app')
    )
  }
```
Note that our Injector is actually also a component! 
It is passed an array of configuration objects. 
Each object has both a *key* and a *provider*. 
The provider is simply a class that the system will instantiate when an object requests it.


#### Animations
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

#### Lazy Loading
Angular allows modules to be lazily loaded when the route that they are associated with are activated. 
React does not.


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
This is the library that is recommended on the [ react router website ](https://reacttraining.com/react-router/web/guides/code-splitting). 
It does require a little boilerplate to be written. 
This is a higher order component which wraps the actual component.

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

### Summary
I believe I have shown that React is just as powerful as Angular for creating a reasonably complicated SPA. 
There were only a few instances in which I struggled to replicate something that the Angular app did. 
Guards and resolving data are particular weaknesses of React. 
This may be just a case of finding the right third party library that provides this functionality. 
This of course is the fundamental difference between React and Angular: The latter just does these things for you.
Which approach is better really a subjective matter.

