import React, { Component } from 'react';
import Loadable from 'react-loadable';

class Loading extends Component {
  render() {
    return (<h1>loading.....</h1>);
  }
}

const LoadableComponent = Loadable({
  loader: () => import('./hero-list-component'),
  loading: Loading,
});

export default class LoadableFoo extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
