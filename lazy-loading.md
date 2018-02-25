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
The react-loadable library works well enough. Because the React paradigm is that One route can have many components,  I think it provides a greater degree of granularity as to which components are lazily loaded. With Angular, any one path can only be associated with a single component so is less flexible.
