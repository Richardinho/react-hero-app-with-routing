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
