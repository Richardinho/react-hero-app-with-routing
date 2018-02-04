import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import App from './App'
import CrisisService from './crisis-service';
import HeroService from './hero-service';
import AdminService from './admin-service';

const store = createStore(reducer,
  {
    crisisService: new CrisisService(),
    heroService: new HeroService(),
    adminService: new AdminService(),
  },
  applyMiddleware(
    thunkMiddleware
  )
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => { 
    render(App) 
  })
}
