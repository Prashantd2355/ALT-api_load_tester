import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import icon from '../../assets/icon.svg';
import './App.css';

const Hello = () => {
  return (
    <div className="container">
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Nav />
      <div className="main">
        <Switch>
          <Route path="/" component={Hello} />
        </Switch>
      </div>
    </Router>
  );
}
