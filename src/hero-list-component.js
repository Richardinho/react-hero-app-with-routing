import React from 'react';
import { Link, Route } from 'react-router-dom';
import {connect} from 'react-redux';

class Hero {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const HEROES = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];

export class Component extends React.Component {
  constructor() {
    super();
    this.heroes = HEROES;
  }

  render() {


    const renderHero = (hero) => {
      return (
        <li key={hero.id}> 
          <Link to={{ pathname: `/hero/${hero.id}` }}>
            { /* active link if hero is currently selected */ }
            <span className="badge">{hero.id}</span>
            {hero.name}
          </Link>
        </li>
      ); 
    };
    return (
    
     <div> 
        <h2>Richards HEROES</h2>
        <ul className="items">
          { this.heroes.map(renderHero) }
        </ul>
        { /* imperative link to /sidekicks (non existent link) */ }
        <button>Go to sidekicks</button>
     </div> 
    );
  }
}

const mapStateToProps = ({}) => {
  return {
  };
};

const HeroListComponent = connect(
  mapStateToProps
)(Component);

export default HeroListComponent;
