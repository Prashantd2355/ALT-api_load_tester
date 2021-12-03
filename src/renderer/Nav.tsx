import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileUpload,
  faCogs,
  faChartLine,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="Nav__brand">
          <img src="logo.svg" alt="logo" className="Nav__logo" />
        </Link>
        <ul className="list">
          <Link to="/file">
            <li className="list-item">
              <NavLink exact activeClassName="active" to="/file">
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
  );
}
