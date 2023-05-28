import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TypingText from './TypiygText';
import {DoctorIcon} from '../assets'
import  SvgIcon  from '../assets/doctor.svg';
const HeaderComponent = () => (
    <AppBar position="fixed" sx={{ borderRadius: '0 0 10px 10px' }}  >
      <Toolbar sx={{ justifyContent: 'center', }}>
        <Box sx={{ display: 'flex', }}>
          {/* <Typography variant="h6" component="h1" sx={{ mr: 2, flexGrow: 1 }}>
            
          </Typography> */}
          {/* <TypingText textProp="Hola! Cómo puedo ayudarte?" /> */}
          <Avatar src={SvgIcon} sx={{ width: 125, height: 125 }} />
          {/* <img src={DoctorIcon} width={100} height={100} />
          <SvgIcon >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon> */}
          
        </Box>
        {/* <Button color="inherit">Asistente</Button> */}
        {/* <Button color="inherit">Right Button</Button> */}
      </Toolbar>
    </AppBar>
);

export default HeaderComponent;

