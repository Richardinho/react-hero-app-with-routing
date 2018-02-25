import React, { Component } from 'react';
import { Link, Route , Redirect} from 'react-router-dom';
import { DashboardComponent } from './dashboard-component';
import { Inject } from 'test1';

@Inject('adminService')
export default class Admin extends Component {

  render() {
    if (this.props.adminService.isLoggedIn()) {
      return (
        <div>
          <h3>admin</h3>
          <nav>
            <Link to="/admin/dashboard">dashboard</Link>
            <Link to="/admin/manage-crisis">manage crises</Link>
            <Link to="/admin/manage-heroes">manage heroes</Link>
          </nav>

          <Route  path="/admin/manage-crisis" render={() => {
            return (<div className="route">
              <h2>manage crisis</h2> 
              </div>) 
          }}/>

          <Route path="/admin/dashboard" render={() => {
            return (<div>
              <h2>dashboard</h2> 
            </div>) 
          }}/>
          <Route path="/admin/manage-heroes" render={() => {
            return (<div>
              <h2>manage heroes</h2> 
            </div>) 
          }}/>
        </div>
      )    
    } else {
      return (<Redirect to="/login?returnto=/admin"/>);
    }
  }
}
