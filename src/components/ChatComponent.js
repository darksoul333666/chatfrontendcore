import React, { useState, useRef, useEffect } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import HeaderComponent from '../components/HeaderTemplate';
import { API, ROUTES } from '../api';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const messageListReference = useRef(null);

  
  
 

  const handleMessageSubmit =async (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;
    //const response = await API.post(ROUTES.GET_AI_RESPONS, JSON.stringify({ input:userInput}));
    const response = await (await API()).post(ROUTES.GET_AI_RESPONS, JSON.stringify({ input:userInput}));
    const userMessage = { position: 'right', type: 'text', text: userInput, date: new Date() };
    const aiMessage = { position: 'left', type: 'text', text: response.data.data, date: new Date() };

    setMessages([...messages, userMessage, aiMessage]);

    event.target.reset();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <HeaderComponent />
      <MessageList
        ref={messageListReference}
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={messages.map((message, index) => ({
          ...message,
          id: index,
        }))}
        styles={{
          message: {
            right: {
              '.triangle::after': {
                display: 'none',
              },
            },
            left: {
              '.triangle::after': {
                display: 'none',
              },
            },
          },
        }}
      />
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
            width: 399,
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
          />
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
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
