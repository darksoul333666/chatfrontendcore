import React, { useState, useRef, useEffect } from 'react';
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
import { useSelector } from 'react-redux';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messageListReference = useRef(null);
  const messageContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const templateProfesion = useSelector(store => store.Chat.templateProfesion);
  const templateStyle = useSelector(store => store.Chat.templateStyle);
  const templateActually = useState({
    templateStyle,
    templateProfesion,
    avatar:  templateProfesion
  });
  
  const handleMessageSubmit = async (event) => {
    try {
      setSendingMessage(true);
      event.preventDefault();
      const userInput = event.target.message.value;
      event.target.reset();
      const data = {
        input: userInput,
        style: templateStyle,
        profesion: templateProfesion,
      }
      const response = await (await API()).post(ROUTES.GET_AI_RESPONS, JSON.stringify(data));
      console.log(response);
     
      const aiMessage = {
        position: 'left',
        type: 'text',
        text: response.data.data,
        date: new Date(),
        style: { color: 'red' },
      };
      const userMessage = {
        position: 'right',
        type: 'text',
        text: userInput,
        date: new Date(),
        style: { color: 'blue' },
      };

      if(response?.data?.data){
         setMessages([...messages, userMessage, aiMessage]);
        setSendingMessage(false);
        scrollToBottom()
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
  

  const buttonSx = {
    ...(sendingMessage && {
      bgcolor: 'green',
      '&:hover': {
        bgcolor: 'red',
      },
    }),
  };

  return (
    <div style={{ textAlign: 'center', flex:1,  display:'flex', flexDirection:'column' }}>
      <HeaderComponent />
      <div style={{ height:"100%", textAlign:'justify', marginTop:100, marginBottom:100 }} >
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={messages.map((message, index) => ({
            ...message,
            id: index,
            position: message.position === 'right' ? 'right' : 'left',
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
      <div ref={lastMessageRef} style={{flex:1, flexDirection: 'row', }} >
      <form style={{display:'flex',  justifyContent:'center' }} onSubmit={handleMessageSubmit} className="message-input">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            textAlign:'justify',
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
            placeholder="Escribe un mensaje"
            style={{
              flex: '1',
              border: 'none',
              background: 'none',
              outline: 'none',
              fontSize: '16px',
              marginLeft: '10px',
              justifySelf:'center'
            }}
          />
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
