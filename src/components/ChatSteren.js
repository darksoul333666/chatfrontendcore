import React, { useState, useRef, useEffect } from 'react';
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

const ChatSteren = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [search, setSearch] = useState('');
  const lastMessageRef = useRef(null);
  let { idTemplate, idx } = useParams();

  const [isTyping, setIsTyping] = useState(false);
  const templateProfesion = useSelector((store) => store.Chat.templateProfesion);
  const templateStyle = useSelector((store) => store.Chat.templateStyle);

  useEffect(() => {
    if (idTemplate !== undefined) {
      const avatars = Array.from(Array(0).keys());
    }
  }, [idTemplate]);

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
        style: { color: 'blue' },
      };
      const chatList = [...messages, userMessage];
      setMessages(chatList);

      const response = await (await API()).post(ROUTES.GET_AI_RESPONS, JSON.stringify(data));

      if (response?.data?.data) {
        let newChatList = chatList;
        const aiMessage = {
          position: 'left',
          type: 'text',
          text: response.data.data,
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require("../assets/fondo.jpg")})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <HeaderComponent indexAvatar={idx} />
      <div style={{ height: '100%', textAlign: 'justify', marginTop: 100, marginBottom: 100 }}>
        {messages.map((message, index) => {
          if (message.position === 'right') {
            return (
              <div key={index} className="prompt-container right">
                <PromptQuestion message={message.text} />
              </div>
            );
          } else {
            return (
              <div key={index} className="prompt-container left">
                <ResponseAi message={message.text} />
              </div>
            );
          }
        })}
        {isTyping && <div>El usuario está escribiendo...</div>}
      </div>
      <div ref={lastMessageRef} style={{ flex: 1, flexDirection: 'row' }}>
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
              background: '#f5f5f5',
              borderRadius: '25px',
              margin: '8px 0',
              position: 'fixed',
              width: '40%',
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
                background: 'none',
                outline: 'none',
                fontSize: '16px',
                marginLeft: '10px',
                justifySelf: 'center',
              }}
            />
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab onClick={(e) => handleMessageSubmit(e)}>
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
