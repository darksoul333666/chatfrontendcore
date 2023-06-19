import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderTemplate';
import { API, ROUTES } from '../api';
import CircularProgress from '@mui/material/CircularProgress';
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

  useEffect(() => {
    setIsMobile(width < 1000);
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
            'xi-api-key': '403248d65aefae80d73c342dfd9e33d3',
          },
          responseType: 'arraybuffer',
        }
      );
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
        backgroundImage: `url(${require('../assets/fondo.jpg')})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* <HeaderComponent indexAvatar={idx} /> */}
   
      <Header setSpeak={setIsSpeaking} />
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
                overlay="Espacio para escribir consultas o mensajes, junto con un botón para enviar el mensaje."
                placement="top"
                overlayStyle={{
                  background: '#9CF1EB',

                color: '#fff',
                borderRadius: '10px',
                fontSize: '10px',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <input
                type="text"
                name="message"
                value={search}
                onKeyPress={handleKeyPress}
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
  overlay="Permite grabar mensajes de voz y utilizar la interacción por voz en lugar de escribir un mensaje."
  placement="rightTop"
  overlayStyle={{
    backgroundColor: '#9CF1EB',
    borderRadius: '10px',
    fontSize: '10px',
    padding: '10px',
    textAlign: 'center',
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
