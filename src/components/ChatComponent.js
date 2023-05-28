import React, { useState, useRef } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import HeaderComponent from '../components/HeaderTemplate';
import { API, ROUTES } from '../api';
import 'react-chat-elements/dist/main.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Fab } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {Box} from '@mui/material';
import { Send } from '@material-ui/icons';
import TypingText from './TypiygText';
import { Templates, Personalities } from '../config/Templates';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messageListReference = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageSubmit = async (event) => {
    try {
      setSendingMessage(true);
      event.preventDefault();
      const userInput = event.target.message.value;
      event.target.reset();
      const data = {
        input: userInput,
        style: Personalities.Amigable.titulo,
        styleDescription: Personalities.Amigable.descripcion,
        profesion: Templates.Doctor.title,
        profesionDescription: Templates.Doctor.preparation
      }
      const response = await (await API()).post(ROUTES.GET_AI_RESPONS, JSON.stringify(data));
      console.log(response);
      const userMessage = {
        position: 'right',
        type: 'text',
        text: userInput,
        date: new Date(),
        style: { color: 'blue' },
      };
      const aiMessage = {
        position: 'left',
        type: 'text',
        text: response.data.data,
        date: new Date(),
        style: { color: 'red' },
      };

      if(response?.data?.data){
         setMessages([...messages, userMessage, aiMessage]);
      setSendingMessage(false)
      }
  
     
    } catch (error) {
      console.log(error);
    }
  
    };
  const buttonSx = {
    ...(sendingMessage && {
      bgcolor: 'green',
      '&:hover': {
        bgcolor: 'red',
      },
    }),
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <HeaderComponent  />

      <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto', marginTop:100 }}>
        <MessageList
          // ref={messageListReference}
          className="message-list"
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={messages.map((message, index) => ({
            ...message,
            id: index,
            position: message.position === 'right' ? 'right' : 'left',
            style: { background: message.position === 'right' ? 'blue' : 'red' },
          }))}
          styles={{
            message: {
              right: {
                '.triangle::after': {
                  display: 'none',
                  background:'red',
                },
              },
              left: {
                '.triangle::after': {
                  display: 'none',
                  background:'blue',
                },
              },
            },
          }}
        />
         {isTyping && <div>El usuario está escribiendo...</div>}
      </div>
      <div style={{flex:1, flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center',marginLeft:350 }} >
      <form onSubmit={handleMessageSubmit} className="message-input">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f5f5f5',
            borderRadius: '20px',
            padding: '4px 8px',
            margin: '8px 0',
            position: 'fixed',
            width: '399px',
            bottom: 0,
          }}
        >
          <input
            type="text"
            name="message"
            placeholder="Escribe un mensaje"
            style={{
              flex: '1',
              border: 'none',
              background: 'none',
              outline: 'none',
              fontSize: '16px',
              marginLeft: '8px',
            }}
          />{/* 
          <button
            type="submit"
            style={{
              border: 'none',
              background: 'none',
              outline: 'none',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
          >
            Enviar
          </button> */}
          {/* <CircularProgress  /> */}
          <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          onClickCapture={()=> handleMessageSubmit}
          sx={buttonSx}
        >
          {true && <Send /> }
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

export default ChatComponent;
