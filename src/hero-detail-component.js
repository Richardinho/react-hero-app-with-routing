import React from 'react';

export default class HeroDetailComponent extends React.Component {

  render() {
    return (
      <div>
        <h2>HEROES</h2>
        <div>
          <h3>hero.name</h3>
          <div>
            <label>Id: </label>hero.id</div>
          <div>
            <label>Name: </label>
            <input placeholder="name"/>
          </div>
          <p>
            <button>Back</button>
          </p>
        </div>
      </div>
    );
  }

}
