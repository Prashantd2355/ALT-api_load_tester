/* eslint-disable import/no-cycle */
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import File from './file';
import graph from './graph';
import Process from './process-data/index';
import Helper from './helper';
/* eslint-disable import/prefer-default-export */
import './App.css';
import './bootstrap-local.min.css';
import { AppProvider } from './context';
import { ToastProvider } from 'react-toast-notifications';
export default function App() {
  return (
    <>
      <AppProvider>
        <ToastProvider>
          <Router>
            <Nav />
            <div className="main">
              <Switch>
                <Route path="/process" component={Process} />
                <Route path="/file" component={File} />
                <Route path="/graph" component={graph} />
                <Route path="/help" component={Helper} />
                <Route path="/" component={File} />
              </Switch>
            </div>
          </Router>
        </ToastProvider>
      </AppProvider>
    </>
  );
}
