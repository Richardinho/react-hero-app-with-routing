import React from 'react';
import foo from './foo.bundle'
import bar from './bar.bundle'
import Bundle from './bundle';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const Foo = (props) => (
  <Bundle load={foo}>
    {(Component) => <Component {...props}/>}
  </Bundle>
)


const Bar = (props) => (
  <Bundle load={bar}>
    {(Component) => <Component {...props}/>}
  </Bundle>
)



export default class App extends React.Component {

  componentDidMount() {
    // preloads the rest
    //foo(() => {})
    bar(() => {})
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li><Link to="/foo">foo</Link></li>
              <li><Link to="/bar">bar</Link></li>
            </ul>
            <Route path="/foo" component={Foo}/>
            <Route path="/bar" component={Bar}/>
          </div>
        </Router>
      </div>
    );  
  }

}
