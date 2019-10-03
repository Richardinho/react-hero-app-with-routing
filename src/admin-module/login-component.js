import React, { Component } from 'react';
import queryString from 'querystring';
import { Inject } from '../injector';

@Inject(['adminService'])
export default class Login extends Component {

  constructor() {
    super();

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

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

  logOut() {
    this.props.adminService.logOut(); 
    this.props.history.push('/superheroes');
  }

  render () {
    const isLoggedIn = this.props.adminService.isLoggedIn(); 
    const loggedIn = (<button onClick={this.logOut}>Logout</button>);
    const loggedOut = (<button onClick={this.logIn}>Login</button>);

    return (
      <div>
        <h2>{isLoggedIn ? 'LOGOUT' : 'LOGIN' }</h2>
        <p>message</p>
        <p>
          {isLoggedIn ? loggedIn : loggedOut}  
        </p>
      </div> 
    );
  }
}
