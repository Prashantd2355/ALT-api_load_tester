import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faCogs, faChartLine, faInfo } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="Nav__brand">
          <img src="logo.svg" alt="logo" className="Nav__logo" />
        </Link>
        <ul className="list">
          <li className="list-item">
             <FontAwesomeIcon icon={faFileUpload} size={'lg'} style={{width: '40px'}}/> <span> Add File</span>
          </li>
          <li className="list-item">
             <FontAwesomeIcon icon={faCogs} size={'lg'} style={{width: '40px'}}/> <span> Process File</span>
          </li>
          <li className="list-item">
             <FontAwesomeIcon icon={faChartLine} size={'lg'} style={{width: '40px'}}/> <span> Graph</span>
          </li>
          <li className="list-item">
            <FontAwesomeIcon icon={faInfo} size={'lg'} style={{width: '40px'}}/> <span> Help</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
