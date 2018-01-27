import React from 'react';
import {connect} from 'react-redux';
import CrisisListComponent from './crisis-list-component';
import { Link, Route } from 'react-router-dom';

class Alpha extends React.Component {
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

const mapStateToProps = () => {
  return { foo: 'this is foo' };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNewPhrase: () => {
    }
  };
};

const CrisisCenterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Alpha);

export default CrisisCenterComponent;
