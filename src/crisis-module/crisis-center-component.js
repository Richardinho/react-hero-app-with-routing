import React from 'react';
import { Link, Route } from 'react-router-dom';
import CrisisListComponent from './crisis-list-component';

export default class CrisisCenterComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>CRISIS CENTER</h2>
        <Route path="/crisis-center" component={ CrisisListComponent }/>
      </div>
    );
  }

}
