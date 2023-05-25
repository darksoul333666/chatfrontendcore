import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const HeaderComponent = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{ borderRadius: '0 0 10px 10px' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6" component="h1" sx={{ mr: 2, flexGrow: 1 }}>
            Hello! Welcome to your Chat Bot. How can I assist you today?
          </Typography>
          <Avatar sx={{ bgcolor: 'green', width: 75, height: 75 }} />
        </Box>
        {/* <Button color="inherit">Asistente</Button> */}
        {/* <Button color="inherit">Right Button</Button> */}
      </Toolbar>
    </AppBar>
  </Box>
);

export default HeaderComponent;

