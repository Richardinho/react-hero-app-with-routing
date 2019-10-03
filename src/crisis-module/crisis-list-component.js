import React from 'react';
import Rx from 'rxjs/Rx';
import { Link, Route } from 'react-router-dom';
import { Inject } from '../injector';
import { TransitionGroup, CSSTransition, Transition} from 'react-transition-group';
import CrisisDetailComponent from './crisis-detail-component';
import CrisisCenterHomeComponent from './crisis-center-home-component';

@Inject(['crisisService'])
export default class CrisisListComponent extends React.Component {

  constructor() {
    super();  

    this.state = {
      crises: [] 
    }; 
  }

  componentDidMount() {
    this.subscription = Rx.Observable
      .fromPromise(this.props.crisisService.getCrisisList())
      .subscribe(crises => {
        this.setState({
          crises,
        });
      }); 
  }

  componentWillUnmount () {
    this.subscription.unsubscribe();
  }

  render () {
    const { match } = this.props;

    const renderLink = (crisis) => {
      return (
        <CSSTransition timeout={400} key={crisis.id} classNames="listitem">
          <li>
            <Link to={`${match.url}/${crisis.id}`}>
              <span className="badge">{crisis.id}</span>
              {crisis.name}
            </Link> 
          </li>
        </CSSTransition>
      ); 
    };

    return (
      <div>
        <Route path={match.url} component={CrisisCenterHomeComponent}/>
        <TransitionGroup component="ul" className="items">
          {
            this.state.crises.map(renderLink) 
          } 
        </TransitionGroup>
        <Route path={`${match.url}/:id`}  component={CrisisDetailComponent}/>
      </div>
    );
  }
}

