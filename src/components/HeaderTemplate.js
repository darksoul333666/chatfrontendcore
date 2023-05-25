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
        <Avatar sx={{ bgcolor: "green", width:75, height:75,  position:'absolute', top:25 }}></Avatar>
        {/* <Button color="inherit">Asistente</Button> */}
      {/* <Button color="inherit">Right Button</Button> */}
      <TypingText />
    </Toolbar>
  </AppBar>
</Box>

  );

export default HeaderComponent;
