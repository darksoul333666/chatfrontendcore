import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Container } from '@mui/material';
import { BotIconNotSpeaking, BotIconSpeaking } from '../assets';
import LongPress from 'react-longpressable';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';


const Header = ({isMobile, animationHeader, setSpeak= Function}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animation, setAnimation] = useState({
    talking:false, noTalking:false
  })
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

  useEffect(() =>{
   if( animationHeader.header){
    setAnimation({
      talking:false, noTalking:true
    })
   }
  },[animationHeader])

  useEffect(() => {
   
    if(animation.noTalking){
      setTimeout(() =>{
        setIsSpeaking(true)
        setAnimation({
          talking:true, noTalking:false
        })

      },3000)
    }

    if(animation.talking){
      setTimeout(() =>{
        setIsSpeaking(false)
        setAnimation({
          talking:false, noTalking:false
        })

      },3000)
    }
  }, [animation])


  return (
    <header className={styles.header}>
      <Container>
      <Tooltip
  visible={animation.talking | animation.noTalking}
  // onVisibleChange={(visible) => {
    
    
  // }}
  overlay={ !isSpeaking ? 'Activa la funcionalidad de Texto a Voz para escuchar la respuesta del chatbot' : 'Desactiva la funcionalidad de Texto a Voz para dejar de escuchar la respuesta del chatbot.'}
  placement={!isSpeaking? "bottom":"bottom"}
  overlayStyle={{
    backgroundColor: '#9CF1EB',
    borderRadius: '10px',
    fontSize: '10px',
    padding: '8px',
    textAlign: 'center',
    width:'40%'
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
