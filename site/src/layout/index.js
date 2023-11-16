import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './layout.css';

function Layout() {
  return (
    <>
      <div className="top">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;