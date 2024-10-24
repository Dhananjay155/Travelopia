import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <h2  style={{ position: 'absolute', top: '40px', left: '30px', margin: '0', padding: '10px', borderRadius: '5px' }} > Travelopia </h2> 
        </Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
