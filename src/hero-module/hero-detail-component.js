import React from 'react';
import Rx from 'rxjs/Rx';
import { Inject } from '../injector';

@Inject(['heroService'])
export default class HeroDetailComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      id: -1,
      name: '',
    };

    this.updateName = this.updateName.bind(this);
    this.goToHeroes = this.goToHeroes.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.match.next(nextProps.match);
  }

  componentDidMount() {
    this.match = new Rx.BehaviorSubject(this.props.match);

    this.match
      .map(match => { 
        return this.props.heroService.getHero(match.params.id);
      })
      .subscribe(hero => {
        this.setState(hero); 
      });
  }

  goToHeroes() {
    this.props.history.push('/superheroes');
  }
 
  updateName(event) {
    this.setState({
      name: event.target.value,
    }, () => {
      this.props.heroService.editHero(this.state.id, this.state.name);
    });
  }

  render() {
    return (
      <div>
        <h2>HEROES</h2>
        <div>
          <h3>{this.state.name}</h3>
          <div>
            <label>Id: </label>{this.state.id}</div>
          <div>
            <label>Name: </label>
            <input 
              value={this.state.name} 
              onChange={this.updateName}
              placeholder="name"/>
          </div>
          <p>
            <button onClick={this.goToHeroes}>Back</button>
          </p>
        </div>
      </div>
    );
  }
}

