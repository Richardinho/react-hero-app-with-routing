import React from 'react';
import { Link, Route } from 'react-router-dom';
import {connect} from 'react-redux';

export class Component extends React.Component {
  constructor() {
    super();

    this.heroes = [];
  }

  render() {
    this.heroes = this.props.heroService.getHeroes();

    const renderHero = (hero) => {
      return (
        <li key={hero.id}> 
          <Link to={{ pathname: `/hero/${hero.id}` }}>
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
/*
 *
 * Using Redux here for some dependency injection
 */
const mapStateToProps = ({ heroService }) => {
  return {
    heroService
  };
};

const HeroListComponent = connect(
  mapStateToProps
)(Component);

export default HeroListComponent;
