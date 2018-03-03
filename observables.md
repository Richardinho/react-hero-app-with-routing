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

