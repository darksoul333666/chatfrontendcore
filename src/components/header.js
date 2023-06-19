import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Container } from '@mui/material';
import { BotIconNotSpeaking, BotIconSpeaking } from '../assets';
import LongPress from 'react-longpressable';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';


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
      <Tooltip
  overlay={ !isSpeaking ? 'Activa la funcionalidad de Texto a Voz para escuchar la respuesta del chatbot' : 'Desactiva la funcionalidad de Texto a Voz para dejar de escuchar la respuesta del chatbot.'}
  placement={!isSpeaking? "leftTop":"rightTop"}
  overlayStyle={{
    backgroundColor: '#9CF1EB',
    borderRadius: '10px',
    fontSize: '10px',
    padding: '8px',
    textAlign: 'center',
  }}
>

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
        </Tooltip>

       
      </Container>
    </header>
  );
};

export default Header;
