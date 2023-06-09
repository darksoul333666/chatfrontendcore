import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import EngineerAvatar from '../assets/engineer.svg';
import InvestorAvatar from '../assets/investor.svg';
import LawyerAvatar from '../assets/lawyer.svg';
import PhysicistAvatar from '../assets/physicist.svg';
import TherapistAvatar from '../assets/therapist.svg';
import MyAvatar from '../assets/myAvatar.svg';
import MyAvatar1 from '../assets/myAvatar (1).svg';
import MyAvatar2 from '../assets/myAvatar (2).svg';
import MyAvatar3 from '../assets/myAvatar (3).svg';
import MyAvatar4 from '../assets/myAvatar (4).svg';
import MyAvatar5 from '../assets/myAvatar (5).svg';
import MyAvatar6 from '../assets/myAvatar (6).svg';
import Robot from '../assets/robot.png';
import { useSelector } from 'react-redux';

const HeaderComponent = ({indexAvatar, isMobile}) => {
  const [avatarShowed, setAvatarShowed] = useState(null);
  const templateProfesion = useSelector(store => store.Chat.templateProfesion); 
  const templateStyle = useSelector(store => store.Chat.templateStyle);

  useEffect(() => {
    // switch(templateProfesion){
    //   case 'Doctor':
    //     setAvatarShowed(Doctor)
    //     break;
    //   case 'Abogado':
    //     setAvatarShowed(Lawyer)
    //     break;
    //   case 'Terapeuta':
    //     setAvatarShowed(Therapist)
    //     break;
    //   case 'Inversionista':
    //     setAvatarShowed(Investor)
    //     break;
    //   case 'Ingeniero':
    //     setAvatarShowed(Engineer)
    //     break;
    //     case 'Físico':
    //       setAvatarShowed(Physicist)
    //       break;
    // }
    const avatars = Array.from(Array(20).keys());
    const avatarImages = [
      InvestorAvatar,
      LawyerAvatar,
      PhysicistAvatar,
      TherapistAvatar,
      MyAvatar,
      MyAvatar1,
      MyAvatar2,
      MyAvatar3,
      MyAvatar4,
      MyAvatar5,
      MyAvatar6,
      Robot,
    ];
    setAvatarShowed(avatarImages[indexAvatar])
  },[indexAvatar])

  return(
    <AppBar position="fixed" >
      {/* <Toolbar   sx={{ justifyContent: 'center',backgroundColor:'white' }}> */}
        <Box sx={{ display: 'flex',  width:"100%", position:'absolute',justifyContent: 'center' }}>
          <Avatar src={Robot} sx={{ width: isMobile ? 50 : 65,  height: isMobile ? 70 : 90, marginTop: isMobile ? 0 : 6}} />
        </Box>
      {/* </Toolbar> */}
    </AppBar>
);
}

export default HeaderComponent;

