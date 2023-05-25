import React from 'react'
import Avatar from 'react-avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const HeaderComponent = () => (
    <Box sx={{ flexGrow: 1, backgroundColor:"red" }}>
    <AppBar position="static">
      <Toolbar>
        
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </Box>
  );

export default HeaderComponent;
