import React from 'react';
import robotAvatar from '../assets/robot.png';

const ResponseAi = ({ message }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
      <div style={{ backgroundColor: '#fff', color: 'black', padding: '10px', borderRadius: '5px',marginLeft: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={robotAvatar} alt="Robot Avatar" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          {message}
        </div>
      </div>
    </div>
  );
};

export default ResponseAi;
