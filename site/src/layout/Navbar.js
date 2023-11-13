import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';
import Hamburger from './Hamburger';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  return (
    <>
    <nav className="navbar">
      <div className="container">
        <div className="name">Katie Adamsky</div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" >About Me
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" activeStyle>
                    Project Samples
                </NavLink>
              </li>
            </ul>
          </div>
      </div>
    </nav>
</>
  );
}

export default Navbar;