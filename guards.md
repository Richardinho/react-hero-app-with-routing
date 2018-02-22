##### Guards
The purpose of a guard is to govern access both to and away from a route.
In Angular, there are a number of types of guard defined.
The simplest is the `CanActivate` guard. It simply determines whether a route should be activated when its path matches the current location.
There is an equivalent `CanDeactivate` guard which determines whether or not an active route can be deactivated.There is also a guard to determine whether a module can be lazily loaded, and also a resolve guard which allows data to be preloaded into the route.

The React router does not provide guards but it is not to difficult to manually implement them as we have done here.

The Hero app requires that the admin page can only be navigated to if the user is currently logged in. If she is not, then the app should redirect to the login page.
This basically comes down to some branching logic which renders the admin components when the user is logged in and a `<Redirect/>` component otherwise.

```
  if (this.props.adminservice.isloggedin()) {
    return (
      <div>
        <h3>admin</h3>
        <nav>
          <link to="/admin/dashboard">dashboard</link>
          <link to="/admin/manage-crisis">manage crises</link>
          <link to="/admin/manage-heroes">manage heroes</link>
        </nav>

        <route  path="/admin/manage-crisis" render={() => {
          return (<div classname="route">
            <h2>manage crisis</h2> 
            </div>) 
        }}/>

        <route path="/admin/dashboard" render={() => {
          return (<div>
            <h2>dashboard</h2> 
          </div>) 
        }}/>

        <route path="/admin/manage-heroes" render={() => {
          return (<div>
            <h2>manage heroes</h2> 
          </div>) 
        }}/>
      </div>
    )    
  } else {
    return (<redirect to="/login?returnto=/admin"/>);
  }

```
I have not been able to work out how to implement a resolve guard in React
