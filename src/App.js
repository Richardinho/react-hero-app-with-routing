import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import CrisisCenterComponent from './crisis-center-component';
import HeroListComponent from './hero-list-component';
import HeroDetailComponent from './hero-detail-component';
import './style.css';
import './app.css';

export default class App extends React.Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <h1 className="title">React Router</h1>
          <nav>
            <NavLink to="/crisis-center" activeClassName="active">Crisis Center</NavLink>
            <NavLink to="/superheroes" activeClassName="active">Heroes</NavLink>
            <NavLink to="/admin" activeClassName="active">Admin</NavLink>
            <NavLink to="/login" activeClassName="active">Login</NavLink>
          </nav>

          <Route
            path="/crisis-center"
            component={CrisisCenterComponent}
          />

          <Route
            path="/superheroes"
            component={HeroListComponent}
          />
          
          <Route
            path="/hero/:id"
            component={HeroDetailComponent}
          />
        </div>
      </BrowserRouter>
    );
  }

}
