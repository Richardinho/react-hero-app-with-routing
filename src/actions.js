
const loading = (loading) => {
  if(loading) {
    return {
      type: 'IS_LOADING' 
    };
  }
  return {
    type: 'NOT_LOADING'
  };
};

const newPhraseAction = (value) => {
  return (dispatch) => {

    dispatch(loading(true));

    return (new Promise(resolve => {
      setTimeout(() => {
        dispatch({
          type: 'NEW_PHRASE',
          value,
        });
        resolve(); 
      }, 3000);
    })).then(() => {
      dispatch(loading(false));
    });
  };
} 
export { newPhraseAction }
