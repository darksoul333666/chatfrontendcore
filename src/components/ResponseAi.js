import React from 'react';
import robotAvatar from '../assets/robot.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TypingEffect from './TypiygText';

const ResponseAi = ({ message, isResponsed }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <div style={{ backgroundColor: '#fff', color: 'black', padding: '10px', borderRadius: '10px',marginLeft: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{backgroundColor:'#9CF1EB', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', marginRight: '10px',
          borderRadius:50, width:45, height:45}} >
          <img src={robotAvatar} alt="Robot Avatar" style={{ width: '40px', height: '40px', marginLeft:3, marginTop:2 }} />
          </div>
          {isResponsed ? (
            <TypingEffect text={message} speed={40}/>
          ) : (
            <MoreHorizIcon sx={{marginLeft:-1}} />
)}
        </div>
      </div>
    </div>
  );
};

export default ResponseAi;
