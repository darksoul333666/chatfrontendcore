import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import  Avatar  from '@mui/material/Avatar';
import TypingText from './TypiygText';
const HeaderComponent = () => (
    <Box sx={{ flexGrow: 1, backgroundColor: "red" }}>
  <AppBar position="static">
    <Toolbar sx={{ justifyContent: "center", flex:1, display:'flex' }}>
    <h1>Hello! Welcome to your Chat Bot. How can I assist you today?</h1>
        <Avatar sx={{ bgcolor: "green", width:75, height:75 }}></Avatar>
        {/* <Button color="inherit">Asistente</Button> */}
      {/* <Button color="inherit">Right Button</Button> */}
    </Toolbar>
  </AppBar>
</Box>

  );

export default HeaderComponent;
