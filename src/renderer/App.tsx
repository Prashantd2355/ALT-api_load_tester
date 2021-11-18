import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import File from './file';
import graph from './graph';
import Process from './process-data/index';
//import icon from '../../assets/icon.svg';
import './App.css';

export default function App() {
  return (
    <Router>
      <Nav />
      <div className="main">
        <Switch>
          <Route path="/process" component={Process} />
          <Route path="/file" component={File} />
          <Route path="/graph" component={graph} />
          <Route path="/" component={File}/>
        </Switch>
      </div>
    </Router>
  );
}
