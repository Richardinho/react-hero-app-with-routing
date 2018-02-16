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

export default class HeroService {
  
  getHeroes() {
    return HEROES; 
  }

  getHero(id) {
    return HEROES.find(hero => {
      return hero.id == +id;
    }) || {
      id: -1,
      name: ''
    }
  }

  editHero(id, name) {
    const hero = this.getHero(+id);

    if (hero) {
      hero.name = name;
    }
  }
}
