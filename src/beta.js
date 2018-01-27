import React from 'react';
import {connect} from 'react-redux';
import { newPhraseAction } from './actions';

class Beta  extends React.Component {

  componentDidMount() {
    const personId = this.props.match.params.id;
    this.props.getNewPhrase();
    
  }

  render() {
    return (
      <div>
        { this.props.phrase } 
        { this.props.loading && <h2>Loading!</h2>}
      </div>
    );
  }
}

const mapStateToProps = ({phrase, loading}) => {
  return {phrase, loading};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getNewPhrase: () => {
      dispatch(newPhraseAction('Beta, Beta, Hello i love you wont you tell me your name?')).then(() => {
        console.log('finished dispatching new phrase action');
      });
    }
  };
};

const BetaComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Beta);

export default BetaComponent;
