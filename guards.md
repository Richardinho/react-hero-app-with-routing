##### Guards
The purpose of a guard is to govern access to a route.
In Angular, there are a number of types of guard defined.
The simplest is the `CanActivate` guard which simply determines whether a route should be activated when its path matches the current location.
There is an equivalent `CanDeactivate` guard which determines deactivation of a route.
Angular guards can also be used for preloading data and for determining whether modules can be lazily loaded.

The React router does not provide guards but it is not too difficult to manually implement them, and this is what he have done here for the Hero app.

The Hero app requires that the admin page can only be navigated to if the user is currently logged in. 
If they are not, then the app should redirect them to the login page.
This basically comes down to some branching logic which renders the admin components when the user is logged in and a `<Redirect/>` component when they are logged out.
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
Here is a fragment of component that is redirected to.

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
After the user logs in - by simply pressing the 'Login' button - a message will be sent to the `adminService` to alert it that the user is now loogged in, then the `redirectBack()` method will be called which first extracts the address of the previous location from the query parameter then navigates to it.

Angular is obviously more convenient in providing guard functionality 'out of the box'. Implementing guards in React can range from the simple (as in the above case) to more complex when you consider things like lazy loading and resolving data. There are third party libraries that provide this functionality and these come accompanied by all the usual risks and benefits associated with such things.
