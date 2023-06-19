import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Container } from '@mui/material';
import { BotIconNotSpeaking, BotIconSpeaking } from '../assets';
import LongPress from 'react-longpressable';
const Header = ({isMobile, setSpeak= Function}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const styles = {
    header: {
      height:!isMobile ? 100 : 40,
      borderBottomLeftRadius: '30%',
      borderBottomRightRadius: '20%',
      // overflow: 'hidden',
    },
    image: {
      width:60,
      height:70,
      background:'none'
    },
  }

  useEffect(() =>{
    setSpeak(isSpeaking);
  },[isSpeaking])

  return (
    <header className={styles.header}>
      <Container>
        <Box py={4}>
          <LongPress
          onShortPress={() =>setIsSpeaking(!isSpeaking)}
          onLongPress={()=>{}}
          >
          {isSpeaking ? 
        <BotIconSpeaking onClick={() =>setIsSpeaking(!isSpeaking)} />
          :
        <BotIconNotSpeaking onClick={() =>setIsSpeaking(!isSpeaking)} />
          }
          </LongPress>
         
        </Box>
      </Container>
    </header>
  );
};

export default Header;
