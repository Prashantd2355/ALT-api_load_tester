import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import File from './file';
import graph from './graph';
import Process from './process-data/index';
//import icon from '../../assets/icon.svg';
import './App.css';
import './bootstrap-local.min.css';
// const Hello = () => {
//   return (
//     <div className="container">
//       <div className="Hello">
//         <img width="200px" alt="icon" src={icon} />
//       </div>
//       <h1>electron-react-boilerplate</h1>
//     </div>
//   );
// };

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
