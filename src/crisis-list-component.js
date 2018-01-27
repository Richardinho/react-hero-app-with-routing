import React from 'react';
import { Link, Route } from 'react-router-dom';
import CrisisDetailComponent from './crisis-detail-component';
import CrisisCenterHomeComponent from './crisis-center-home-component';
import {connect} from 'react-redux';

export class Component extends React.Component {

  constructor() {
    super();  
    this.state = {
      crises: [] 
    }; 
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    this.props.crisisService.getCrisisList().then(crises => {
      if (this._isMounted) {
        this.setState({
          crises,
        });
      }
    });     
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  render () {
    const { match } = this.props;

    const renderLink = (crisis) => {
      return (
        <li key={crisis.id}>
          <Link to={`${match.url}/${crisis.id}`}><span className="badge">{crisis.id}</span>{crisis.name}</Link> 
        </li>
      ); 
    };


    return (
      <div>
        <ul className="items">
          {
            this.state.crises.map(renderLink) 
          } 
        </ul>
        <Route path={`${match.url}/:id`}  component={CrisisDetailComponent}/>
        <Route exact path={match.url} component={CrisisCenterHomeComponent}/>
      </div>
    );
  }

}
const mapStateToProps = ({crisisService}) => {
  return {
    crisisService,
  };
};

const CrisisListComponent = connect(
  mapStateToProps
)(Component);

export default CrisisListComponent;
