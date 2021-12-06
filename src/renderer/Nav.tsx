import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileUpload,
  faCogs,
  faChartLine,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import logo from './logo.png';
import { AppContext } from './context';

export default function Nav() {
  const { state } = React.useContext(AppContext);
  return (
    <>
      {state.isLoader ? (
        <div
          className="loader"
          style={{
            background: '#00000087',
            position: 'absolute',
            height: '100%',
            width: '100%',
            display: 'flex',
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: '3rem',
              height: '3rem',
              margin: 'auto auto',
              color: '#06d6a0',
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        ''
      )}
      <nav className="nav">
        <div className="container">
          <Link to="/" className="Nav__brand">
            <img
              src={logo}
              alt="logo"
              width="100%"
              style={{ margin: '30px auto' }}
              className="Nav__logo"
            />
          </Link>
          <ul className="list">
            <Link to="/file">
              <li className="list-item">
                <NavLink
                  isActive={(_match, location: any) => {
                    if (
                      location.pathname === '/' ||
                      location.pathname === '/file'
                    ) {
                      return true;
                    }
                    return false;
                  }}
                  exact
                  activeClassName="active"
                  to="/file"
                >
                  <FontAwesomeIcon
                    icon={faFileUpload}
                    size="lg"
                    style={{ width: '40px' }}
                  />
                  <span> Add File</span>
                </NavLink>
              </li>
            </Link>
            <Link to="/process">
              <li className="list-item">
                <NavLink exact activeClassName="active" to="/process">
                  <FontAwesomeIcon
                    icon={faCogs}
                    size="lg"
                    style={{ width: '40px' }}
                  />
                  <span> Process File</span>
                </NavLink>
              </li>
            </Link>
            <Link to="/graph">
              <li className="list-item">
                <NavLink exact activeClassName="active" to="/graph">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    size="lg"
                    style={{ width: '40px' }}
                  />
                  <span> Graph</span>
                </NavLink>
              </li>
            </Link>
            <li className="list-item">
              <NavLink exact activeClassName="active" to="/help">
                <FontAwesomeIcon
                  icon={faInfo}
                  size="lg"
                  style={{ width: '40px' }}
                />
                <span> Help</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
