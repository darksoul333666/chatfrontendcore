import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from '../components/HeaderTemplate';
import { API, ROUTES } from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import { Fab } from '@mui/material';
import { Box } from '@mui/material';
import { Send } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import robot from '../assets/robot.png';
import enviarIcon from '../assets/Enviar.png';
import PromptQuestion from './PromptQuestion';
import ResponseAi from './ResponseAi';
import useScreenSize from '../hooks/resize';
import Header from './header';

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

  useEffect(() => {
    if (idTemplate !== undefined) {
      const avatars = Array.from(Array(0).keys());
    }
  }, [idTemplate]);

  useEffect(() => {
    setIsMobile(width < 1000);
  }, [width]);

  const handleMessageSubmit = async (event) => {
    try {
      setSendingMessage(true);
      event.preventDefault();
      const userInput = search;
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
        
        const responseEleven = await axios.post('https://api.elevenlabs.io/v1/text-to-speech/6t6mDwPhuoeCdhY683Zp', {
        text: response.data.data,
        model_id: "eleven_multilingual_v1",
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.62
        }
      }, {
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": "f2bdde34e653f534c5b3fc9c1b90ac2c"
        },
        responseType: "arraybuffer" // Especifica el tipo de respuesta como arraybuffer
      });
  
      if (responseEleven.status === 200) {
        const audioData = responseEleven.data;
        const audioBlob = new Blob([audioData], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
  
        const audio = new Audio(audioUrl);
        audio.play();
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
        //setAiResponse(response.data.data);
        setSendingMessage(false);
        scrollToBottom();   
      }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <Header />
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
        <form
          style={{ display: 'flex', justifyContent: 'center' }}
          onSubmit={handleMessageSubmit}
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
            <input
              type="text"
              name="message"
              value={search}
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
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab onClick={handleMessageSubmit}>
                <img src={enviarIcon} alt="Enviar" style={{ width: '60px', height: '60px' }} />
              </Fab>
              {sendingMessage && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: 'green',
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSteren;
