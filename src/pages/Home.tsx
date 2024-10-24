import React, { useState } from 'react';
import FlightTable from '../components/FlightTable';
import flight from "../assets/Flight.jpg";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <>
      <header style={{ position: 'relative', textAlign: 'center', padding: '10px' }}>
        <img 
          src={flight}
          alt="Flight Status"
          className="flight-image"
          style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px' }} 
        />
        <h1 className='Logo' style={{ position: 'absolute', top: '10px', left: '10px', margin: '0', padding: '10px', borderRadius: '5px' }}>
          Travelopia
        </h1>
        <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)',  }}>
          Flight Status Board
        </h1>
        <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <input 
            type="text" 
            placeholder="Search by flight number..." 
            value={searchTerm}
            onChange={handleSearch} 
            style={{ padding: '10px', width: '80%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc',marginTop:'20px' }} 
          />
        </div>
      </header>
      <button 
        onClick={toggleDarkMode} 
        className="toggle-dark-mode" 
        style={{ position: 'absolute', top: '10px', right: '10px', margin: '0', padding: '10px', borderRadius: '5px' }}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <FlightTable searchTerm={searchTerm} />
    </>
  );
};

export default Home;
