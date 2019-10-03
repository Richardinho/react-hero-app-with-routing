import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Injector extends Component {
  constructor(props, context) {
    super(props); 

    this.parentInjector = context.injector;
    this.services = {};
  }

  getService(key) {
    let service;
    let serviceConfig = this.props.config.find(item => (item.key === key)); 

    if (serviceConfig) {
      service = this.services[key]; 
      if (!service) {
        const provider = serviceConfig.provider;
        if (provider.__dependencies__) {
          const dependencies = provider.__dependencies__.map(dep => {
            return this.getService(dep);
          });
          service = new provider(...dependencies); 
        } else {
          service = new provider();
        }
        this.services[key] = service;
      }
      return service; 
    } else {
        service = this.parentInjector.getService(key);

        if (service) {
          return service;
        }
    }

    throw Error(`${key} service does not exist`);
  }

  getChildContext() {
    return { 
      injector: this,
    }
  }

  render() {
    return (
      <div>{this.props.children}</div> 
    )
  }
}

Injector.contextTypes = {
  injector: PropTypes.object,
}

Injector.childContextTypes = {
  injector: PropTypes.object,
}

/*
 * decorator that creates higher order component which injects 
 * dependencies into inner component
 */

function Inject(dependencies){
  return (InnerComponent) => {
    if (InnerComponent.prototype instanceof Component) {
      class WrapperComponent extends Component {

        render() {
          //  pass props through from outer component
          const props = Object.assign({}, this.props);

          dependencies.forEach(dependency => {
            props[dependency] = this.context.injector.getService(dependency);
          });

          return React.createElement(InnerComponent, props); 
        } 
      };

      WrapperComponent.contextTypes = {
        injector: PropTypes.object,
      }
      
      return WrapperComponent;
    } else {
      InnerComponent.__dependencies__ = dependencies; 

      return InnerComponent;
    }
  };
}

export { Inject };
