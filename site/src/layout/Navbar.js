import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <header>
        <nav>
              <div className={`nav-elements  ${'active'}`}>
                <h2 className={`name`}><NavLink to="/">Katie Adamsky</NavLink></h2>
                <ul>
                  <li>
                    <NavLink to="/blog" >Blog
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/projects" activeStyle>
                        Project Samples
                    </NavLink>
                  </li>
                </ul>
              </div>
        </nav>
      </header>
  </>
  );
}

export default Navbar;