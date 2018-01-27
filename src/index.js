import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk';
import App from './App'
import { AppContainer } from 'react-hot-loader'
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import CrisisService from './crisis-service';

const store = createStore(reducer,
  {
    crisisService: new CrisisService(),
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
