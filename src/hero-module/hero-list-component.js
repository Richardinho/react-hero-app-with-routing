import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Inject } from '../injector';

@Inject(['heroService'])
export default class HeroListComponent extends Component {

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
          <h2>HEROES</h2>
          <ul className="items">
            { this.heroes.map(renderHero) }
          </ul>
          <button>Go to sidekicks</button>
       </div> 
    );
  }
}

