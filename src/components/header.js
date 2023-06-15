import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Container } from '@mui/material';
import Robot from '../assets/robot.png';

const useStyles = makeStyles(({isMobile}) => ({
  header: {
    height:!isMobile ? 100 : 40,
    borderBottomLeftRadius: '30%',
    borderBottomRightRadius: '20%',
    // overflow: 'hidden',
  },
  image: {
    // display: 'block',
    // margin: '0 auto',
    // maxWidth: '100%',
    width:60,
    height:70,
    background:'none'
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Container>
        <Box py={4}>
          <img
            src={Robot}
            alt="Logo"
            className={classes.image}
          />
        </Box>
      </Container>
    </header>
  );
};

export default Header;
