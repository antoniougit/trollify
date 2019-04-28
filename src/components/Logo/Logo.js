import React from 'react';
import Tilt from 'react-tilt';
import troll from './logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='center mb2'>
      <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 200, width: 200 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} alt='logo' src={troll}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;