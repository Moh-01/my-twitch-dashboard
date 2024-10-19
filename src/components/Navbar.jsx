import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/main">
        <img src="/logo.png" alt="zMoh Logo" style={{ cursor: 'pointer' }} />
      </Link>
      <div className="nav-links">
        <NavLink to="/main" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/stream" className={({ isActive }) => (isActive ? 'active' : '')}>
          Stream Management
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
          Chat
        </NavLink>
        <NavLink to="/channel-points-managments" className={({ isActive }) => (isActive ? 'active' : '')}>
          Channel Points Managments
        </NavLink>
      </div>
      
    </div>
  );
};

export default Navbar;
