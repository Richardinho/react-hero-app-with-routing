const crises = [
  { id: 1, name: 'Aeroplane falling out of sky' },
  { id: 2, name: 'weather is rubbish' },
  { id: 3, name: 'train coming off the tracks' },
  { id: 4, name: 'woman lost her purse' },
  { id: 5, name: 'wrong advert shown on telly' },
];

function getCrisisForId(id) {
  const crisis = crises.find(c => {
    return c.id == parseInt(id, 10);
  });
  return crisis;
}

export default class CrisisService {

  getCrisis(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getCrisisForId(id)); 
      }, 1400);
    });
  }  

  getCrisisList() { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(crises); 
      }, 2400); 
    });
  }

  editCrisis(crisis) {
    return new Promise((resolve, reject) => {
      const oldCrisis = getCrisisForId(crisis.id);
      if (oldCrisis) {
        oldCrisis.name = crisis.name; 
        resolve();
      } else {
        reject();
      }
    });
  }
}
