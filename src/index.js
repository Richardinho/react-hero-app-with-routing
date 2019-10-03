import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app-component'
import HeroService from './hero-module/hero-service';
import AdminService from './admin-module/admin-service';
import CrisisService from './crisis-module/crisis-service';
import Injector from './injector';

const config = [
{
  key: 'heroService', 
  provider: HeroService
},{
  key: 'crisisService',
  provider: CrisisService
}, {
  key: 'adminService',
  provider: AdminService
}];

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Injector config={config}>
        <Component />
      </Injector>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app-component', () => { 
    render(App) 
  })
}
