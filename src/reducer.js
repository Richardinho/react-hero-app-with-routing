export default function(state = {}, action) {
  switch(action.type) {
    case 'NEW_PHRASE':
      return Object.assign({}, state, { phrase: action.value });
    case 'IS_LOADING':
      return Object.assign({}, state, { loading: true});
    case 'NOT_LOADING':
      return Object.assign({}, state, { loading: false});
    default:
      return state;
  }
};
