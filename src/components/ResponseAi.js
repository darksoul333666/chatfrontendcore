import React from 'react';
// import robotAvatar from '../assets/robot.png';
import robotAvatar from '../assets/botchat.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TypingEffect from './TypiygText';
const ResponseAi = ({ message, isResponsed }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <div style={{ backgroundColor: '#fff', color: 'black', padding: '10px', borderRadius: '10px',marginLeft: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={robotAvatar} alt="Robot Avatar" style={{ width: '30px', height: '30px', marginLeft:10, marginRight:10, marginTop:2 }} />

          {isResponsed ? (
            <TypingEffect text={message} style={{marginLeft:10}} speed={10}/>
          ) : (
            <MoreHorizIcon  />
)}
        </div>
      </div>
    </div>
  );
};

export default ResponseAi;
