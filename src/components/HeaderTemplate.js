import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Doctor from '../assets/doctor.svg';
import Investor from '../assets/investor.svg';
import Lawyer from '../assets/lawyer.svg';
import Therapist from '../assets/therapist.svg';
import Engineer from '../assets/engineer.svg';
import Physicist from '../assets/physicist.svg';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
  const [avatarShowed, setAvatarShowed] = useState(null);
  const templateProfesion = useSelector(store => store.Chat.templateProfesion); 
  const templateStyle = useSelector(store => store.Chat.templateStyle);

  useEffect(() => {
    switch(templateProfesion){
      case 'Doctor':
        setAvatarShowed(Doctor)
        break;
      case 'Abogado':
        setAvatarShowed(Lawyer)
        break;
      case 'Terapeuta':
        setAvatarShowed(Therapist)
        break;
      case 'Inversionista':
        setAvatarShowed(Investor)
        break;
      case 'Ingeniero':
        setAvatarShowed(Engineer)
        break;
        case 'Físico':
          setAvatarShowed(Physicist)
          break;
    }
  },[templateProfesion])

  return(
    <AppBar position="fixed" >
      <Toolbar sx={{ justifyContent: 'center', }}>
        <Box sx={{ display: 'flex', position:'absolute' }}>
          <Avatar src={avatarShowed} sx={{ width: 95, height: 95, marginTop:4 }} />
        </Box>
      </Toolbar>
    </AppBar>
);
}

export default HeaderComponent;

