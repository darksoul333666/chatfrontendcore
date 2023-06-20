import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { BotIconNotSpeaking, BotIconSpeaking } from '../assets';
import LongPressButton from './LongPress';
import Tooltip from 'rc-tooltip';


const Header = ({isMobile, animationHeader, width, setSpeak= Function}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animation, setAnimation] = useState({
    talking:false, noTalking:false
  })
  const styles = {
    header: {
      height:!isMobile ? 100 : 40,
      backgroundColor:'white',
      width:width,
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
        setTimeout(() =>{
          setAnimation({
            talking:true, noTalking:false
          })
        }, 400)
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
    <header style={styles.header} >
      <Container  >
      <Tooltip
  visible={animation.talking | animation.noTalking}
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
<Box py={4} >
          <LongPressButton
          onPress={() =>setIsSpeaking(!isSpeaking)}
          onLongPress={()=>{}}
          >
          {isSpeaking ? 
        <BotIconSpeaking onClick={() =>setIsSpeaking(!isSpeaking)} />
          :
        <BotIconNotSpeaking onClick={() =>setIsSpeaking(!isSpeaking)} />
          }
          </LongPressButton>
         
        </Box>
        </Tooltip>

       
      </Container>
    </header>
  );
};

export default Header;
