import React from 'react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Rx from 'rxjs/Rx';
import { Inject } from 'test1';

@Inject('crisisService')
export default class CrisisDetailComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: -1,
      name: '',
      editName: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this); 
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.match.next(nextProps.match);
  }

  componentDidMount() {
    this.match = new Rx.BehaviorSubject(this.props.match);

    this.subscription = this.match
      .map(match => match.params.id) 
      .switchMap(id => {
        return Rx.Observable.fromPromise(this.props.crisisService.getCrisis(id)); 
      })
      .subscribe(crisis => {
        this.setState(crisis);
      });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  save() {
    this.props.crisisService.editCrisis({
      id: this.state.id,
      name: this.state.editName
    }).then(() => {
      this.navigateToCrisisList();       
    });
  }

  navigateToCrisisList() {
    this.props.history.push('/crisis-center');      
  
  }

  handleNameChange(event) {
    this.setState({
      editName: event.target.value
    });
  }

  render () {
    const detail = (
      <div>
        <h3>{ this.state.name }</h3>
        <div>
          <label>Id: </label>{ this.state.id }</div>
        <div>
          <label>Name: </label>
          <input 
            value={ this.state.editName } 
            onChange={ this.handleNameChange }
            placeholder="name"/>
        </div>
        <p>
          <button onClick={ this.save }>Save</button>
          <button>Cancel</button>
        </p>
      </div>
    );
 
    const placeholder = (
      <div>Placeholder</div> 
    );

    return (
    
      <div>
        { parseInt(this.state.id) > 0 ? detail: placeholder }
      </div>
    
    );
  
  }
}
