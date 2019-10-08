import React, { Component } from 'react';
import { BrowserRouter, Redirect, NavLink, Route } from 'react-router-dom';
import './style.css';
import './app.css';
import './contact.css';
import CrisisCenterComponent from './crisis-module/crisis-center-component';
import HeroListComponent from './hero-module/loadable-hero-list-component';
import HeroDetailComponent from './hero-module/hero-detail-component';
import ContactComponent from './contact-component';
import AdminComponent from './admin-module/admin-component';
import LoginComponent from './admin-module/login-component';
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group';
import TransitionRoute from './transition-route';

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

export default class App extends Component {
  constructor () {
    super(); 
    this.state = {
      visible: false ,
    };
    this.openContact = this.openContact.bind(this);
    this.closeContact = this.closeContact.bind(this);
  }

  openContact() {
    this.setState({
      visible: true,
    });
  }

  closeContact() {
    this.setState({
      visible: false,
    });
  }

  render () {
    return (
      <div>
        <BrowserRouter basename="/react-hero-app-with-routing">
          <div>
            <h1 className="title">React Router</h1>
            <nav>
              <NavLink to="/crisis-center" activeClassName="active">Crisis Center</NavLink>
              <NavLink to="/superheroes"   activeClassName="active">Heroes</NavLink>
              <NavLink to="/admin"         activeClassName="active">Admin</NavLink>
              <NavLink to="/login"         activeClassName="active">Login</NavLink>
              <button className="contact-link" onClick={this.openContact}>contact</button>
            </nav>

            <TransitionGroup component={firstChild}>
               { this.state.visible && 
                 <CSSTransition classNames="contact" timeout={400}>
                   <ContactComponent close={this.closeContact}/>
                 </CSSTransition>
               }
            </TransitionGroup>

            <div className="container">
              <TransitionRoute component={HeroListComponent}     path="/superheroes"  />
              <TransitionRoute component={HeroDetailComponent}   path="/hero/:id"     />
              <TransitionRoute component={CrisisCenterComponent} path="/crisis-center"/>
              <TransitionRoute component={AdminComponent}        path="/admin"        />
              <TransitionRoute component={LoginComponent}        path="/login"        />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

