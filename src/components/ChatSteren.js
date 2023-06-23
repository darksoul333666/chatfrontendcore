import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API, ROUTES } from '../api';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PromptQuestion from './PromptQuestion';
import ResponseAi from './ResponseAi';
import useScreenSize from '../hooks/resize';
import Header from './header';
import SendMessage from './SendMessge';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';


const ChatSteren = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [search, setSearch] = useState('');
  const lastMessageRef = useRef(null);
  let { idTemplate, idx } = useParams();
  const { height, width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const templateProfesion = useSelector((store) => store.Chat.templateProfesion);
  const templateStyle = useSelector((store) => store.Chat.templateStyle);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animation, setAnimation] = useState({
    button:false, input:false, header:false
  })
  useEffect(() => {
    setIsMobile(width < 1000);
    // setTimeout(() =>{
    //   setAnimation({
    //     button:false, input:true, header:false
    //   })
    // }, 1500);
  }, [width]);

  const handleMessageSubmit = async (event) => {
    try {
      if (event) event.preventDefault(); // Prevent the default form submission behavior
      setSendingMessage(true);
      const userInput = search;
      if (search === '') return;
      setSearch('');

      const data = {
        input: userInput,
        style: templateStyle,
        profesion: templateProfesion,
        idTemplate,
      };
      const userMessage = {
        position: 'right',
        type: 'text',
        text: userInput,
        date: new Date(),
        isResponsed: false,
        style: { color: 'blue' },
      };
      const aiMessage = {
        position: 'left',
        type: 'text',
        text: '',
        isResponsed: false,
        date: new Date(),
        style: { color: 'blue' },
      };
      const chatList = [...messages, userMessage, aiMessage];
      setMessages(chatList);

      const response = await (await API()).post(
        ROUTES.GET_AI_RESPONS,
        JSON.stringify(data)
      );

      if (response?.data?.data) {
        if (isSpeaking) await synthesizeTextToSpeech(response.data.data);
        let newChatList = chatList;
        newChatList.pop();
        const aiMessage = {
          position: 'left',
          type: 'text',
          text: response.data.data,
          isResponsed: true,
          date: new Date(),
          style: { color: 'blue' },
        };
        setMessages([...newChatList, aiMessage]);
        setSendingMessage(false);
        scrollToBottom();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoiceSubmit = async (text) => {
    try {
      setSendingMessage(true);
      const userInput = text;
      setSearch('');
      const data = {
        input: userInput,
        style: templateStyle,
        profesion: templateProfesion,
        idTemplate,
      };
      const userMessage = {
        position: 'right',
        type: 'text',
        text: userInput,
        date: new Date(),
        isResponsed: false,
        style: { color: 'blue' },
      };
      const aiMessage = {
        position: 'left',
        type: 'text',
        text: '',
        isResponsed: false,
        date: new Date(),
        style: { color: 'blue' },
      };
      const chatList = [...messages, userMessage, aiMessage];
      setMessages(chatList);

      const response = await (await API()).post(
        ROUTES.GET_AI_RESPONS,
        JSON.stringify(data)
      );

      if (response?.data?.data) {
        if (isSpeaking) await synthesizeTextToSpeech(response.data.data);
        let newChatList = chatList;
        newChatList.pop();
        const aiMessage = {
          position: 'left',
          type: 'text',
          text: response.data.data,
          isResponsed: true,
          date: new Date(),
          style: { color: 'blue' },
        };
        setMessages([...newChatList, aiMessage]);
        setSendingMessage(false);
        scrollToBottom();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const synthesizeTextToSpeech = async (text) => {
    try {
      const responseEleven = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech/ErXwobaYiN019PkySvjV',
        {
          text: text,
          model_id: 'eleven_multilingual_v1',
          voice_settings: {
            stability: 0.7,
            similarity_boost: 0.62,
          },
        },
        {
          headers: {
            Accept: 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': '591efd21c7858c3dc9be2c39147ab437',
          },
          responseType: 'arraybuffer',
        }
      );

      // const responseEleven = await axios.get(
      //   'https://api.elevenlabs.io/v1/voices',
        
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'xi-api-key': '591efd21c7858c3dc9be2c39147ab437',
      //     },
      //   }
      // );

      console.log(responseEleven);
      const audioData = responseEleven.data;
      const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSubmit();
    }
  };

  return (
    <div
      style={{
        // backgroundImage: `url(${require('../assets/fondo.jpg')})`,
        backgroundColor:'#fafafa',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: height,
        width:width,
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* <HeaderComponent indexAvatar={idx} /> */}
   
      <Header animationHeader={animation} width={width} setSpeak={setIsSpeaking} />
      <div
        ref={lastMessageRef}
        style={{
          height: '100%',
          width: isMobile ? '95%' : '50%',
          overflow: 'scroll',
          textAlign: 'justify',
          marginBottom: 80,
          marginTop: !isMobile ? 80 : 10,
        }}
      >
        {messages.map((message, index) => {
          if (message.position === 'right') {
            return (
              <div key={index} className="prompt-container right">
                <PromptQuestion message={message.text} />
              </div>
            );
          } else {
            return (
              <div key={index} className="prompt-container center">
                <ResponseAi isResponsed={message.isResponsed} message={message.text} />
              </div>
            );
          }
        })}
        {isTyping && <div>El usuario está escribiendo...</div>}
      </div>
      <div style={{ flex: 1, flexDirection: 'row' }}>
        <div
          style={{ display: 'flex', justifyContent: 'center' }}
          // onSubmit={handleMessageSubmit}
          className="message-input"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'justify',
              backgroundColor: 'white',
              borderRadius: '25px',
              margin: '8px 0',
              position: 'fixed',
              width: isMobile ? '80%' : '40%',
              bottom: 0,
            }}
          >
            <Tooltip
                visible={animation.input}
                overlay="Espacio para escribir consultas o mensajes, junto con un botón para enviar el mensaje."
                placement="top"
                afterVisibleChange={(visible) => {
                  if(visible){
                  setTimeout(() =>{
                    setAnimation({
                      button:true, input:false, header:false
                    })
                  }, 3000 )
                  }
                }}
                overlayStyle={{
                background: '#9CF1EB',
                color: '#fff',
                borderRadius: '10px',
                fontSize: '10px',
                padding: '10px',
                textAlign: 'center',
                width:'70%'
              }}
            >
              <input
                type="text"
                name="message"
                value={search}
                onKeyPress={handleKeyPress}
                autoComplete='off'
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Escribe un mensaje"
                style={{
                  flex: '1',
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  marginLeft: '10px',
                  justifySelf: 'center',
                }}
              />
            </Tooltip>
            <Tooltip
              visible={animation.button}
              overlay="Permite grabar mensajes de voz y utilizar la interacción por voz en lugar de escribir un mensaje."
              placement="leftTop"
              afterVisibleChange={(visible) => {
                if(visible){
                  setTimeout(() =>{
                    setAnimation({
                      button:false, input:false, header:true
                    })
                  } , 3000)
                }
              }}
              overlayStyle={{
                backgroundColor: '#9CF1EB',
                borderRadius: '10px',
                fontSize: '10px',
                padding: '10px',
                textAlign: 'center',
                width:'50%'
              }}
              >
    
            <Box sx={{ m: 1, position: 'relative' }}>
              <SendMessage setSendMessage={handleMessageSubmit} setText={handleVoiceSubmit} />
            </Box>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSteren;
