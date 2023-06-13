import React, { useState, useRef, useEffect } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import HeaderComponent from '../components/HeaderTemplate';
import { API, ROUTES } from '../api';
import 'react-chat-elements/dist/main.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Fab } from '@mui/material';
import {Box} from '@mui/material';
import { Send } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import EngineerAvatar from '../assets/engineer.svg';
import InvestorAvatar from '../assets/investor.svg';
import LawyerAvatar from '../assets/lawyer.svg';
import PhysicistAvatar from '../assets/physicist.svg';
import TherapistAvatar from '../assets/therapist.svg';
import MyAvatar from '../assets/myAvatar.svg';
import MyAvatar1 from '../assets/myAvatar (1).svg';
import MyAvatar2 from '../assets/myAvatar (2).svg';
import MyAvatar3 from '../assets/myAvatar (3).svg';
import MyAvatar4 from '../assets/myAvatar (4).svg';
import MyAvatar5 from '../assets/myAvatar (5).svg';
import MyAvatar6 from '../assets/myAvatar (6).svg';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [search, setSearch] = useState('');
  const lastMessageRef = useRef(null);
  let { idTemplate, idx } = useParams();

  const [isTyping, setIsTyping] = useState(false);
  const templateProfesion = useSelector(store => store.Chat.templateProfesion);
  const templateStyle = useSelector(store => store.Chat.templateStyle);
  const templateActually = useState({
    templateStyle,
    templateProfesion,
    avatar:  templateProfesion
  });

  useEffect(() => {
    if(idTemplate !== undefined){
      const avatars = Array.from(Array(20).keys());
      const avatarImages = [
        EngineerAvatar,
        InvestorAvatar,
        LawyerAvatar,
        PhysicistAvatar,
        TherapistAvatar,
        MyAvatar,
        MyAvatar1,
        MyAvatar2,
        MyAvatar3,
        MyAvatar4,
        MyAvatar5,
        MyAvatar6,
      ];
    }
    
  },[idTemplate])
  
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
        idTemplate
      }
      const userMessage = {
        position: 'right',
        type: 'text',
        text: userInput,
        date: new Date(),
        style: { color: 'blue' },
      };
      const chatList = [...messages, userMessage]
      setMessages(chatList);

      const response = await (await API()).post(ROUTES.GET_AI_RESPONS, JSON.stringify(data));     
     
    

      if(response?.data?.data){
        let newCHatList = chatList;
        // newCHatList.pop();
        const aiMessage = {
          position: 'left',
          type: 'text',
          text: response.data.data,
          date: new Date(),
          style: { color: 'red' },
        };
         setMessages([...newCHatList, aiMessage ]);
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
      <HeaderComponent indexAvatar={idx} />
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
            value={search}
            onChange={(e) => setSearch(e.target.value) }
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
          onClick={(e) => handleMessageSubmit(e) }
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
