import React from 'react';
import { TransitionGroup, CSSTransition } from '../react-transition-group/src';
import { Route } from 'react-router-dom';

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

export default class TransitionRoute extends React.Component {

  render () {
    const PageComponent = this.props.component; 
    return (
      <Route
        path={this.props.path}
        children={( props )=>(
          <TransitionGroup component={firstChild}>
          {
            props.match &&
              <CSSTransition
                classNames="page"
                timeout={400}
              >
               <PageComponent {...props}/> 
              </CSSTransition>
          } 
          </TransitionGroup>
        )}
      />

    )
  }
}
