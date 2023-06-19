import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SubmitIcon } from '../assets';
import LongPressButton from './LongPress';
import LongPress from 'react-longpressable';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Fab } from '@mui/material';

const SendMessage = ({ setText = Function, setSendMessage = Function }) => {
  const {
    finalTranscript,
    listening,
    resetTranscript,
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
  if(finalTranscript !== '') {
         setText(finalTranscript);
     }
    SpeechRecognition.stopListening()
   
  }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleShortPress = () => {
    setSendMessage();
  };

 
  const handleLongPress = () => {
    SpeechRecognition.startListening()
  };


  return (
    <LongPressButton
      onPress={() => !listening ? handleShortPress(): null}
      onLongPress={ ()=> !listening ? handleLongPress(): null}
      // onRelease={handleRelease}
      delay={1000}
    >
       {!listening ? <SubmitIcon /> : 
         <Fab onClick={() => SpeechRecognition.stopListening()}>
          <MicOffIcon  sx={{width:40, height:40, color:'red'}} />
       </Fab>}

    </LongPressButton>
  );
};

export default SendMessage;
