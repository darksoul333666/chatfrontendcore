import React, { useState, useRef } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'; // Importa el archivo CSS de react-chat-elements
import HeaderComponent from "../components/HeaderTemplate";
import { API } from '../api';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const messageListReference = useRef(null);


  (await API())
        .post(ROUTES.GET_CALLS_BY_ID, JSON.stringify({ idUser }))
        .then(response => {
          console.log(response.data.data);
          setCalls(response.data.data.calls);
          setLoadingUsers(false);

        })
        .catch(error => {
          console.log(error);
          setLoadingUsers(false);

        })

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;

    let aiResponse = '';

    // Lógica para determinar la respuesta del chatbot
    if (userInput === 'Hola') {
      aiResponse = '¡Hola! ¿En qué puedo ayudarte?';
    } else if (userInput === 'Cómo estás?') {
      aiResponse = 'Estoy bien, ¡gracias por preguntar!';
    } else {
      aiResponse = 'Lo siento, no entiendo tu pregunta.';
    }

    const userMessage = { position: 'right', type: 'text', text: userInput, date: new Date() };
    const aiMessage = { position: 'left', type: 'text', text: aiResponse, date: new Date() };
    
    setMessages([...messages, userMessage, aiMessage]);

    event.target.reset();
  };

  return (
    <div
    style={{ textAlign: 'center' }}>
       <HeaderComponent/>
      <MessageList
        ref={messageListReference}
        className="message-list"
        lockable={true}
        toBottomHeight={'100%'}
        dataSource={messages.map((message, index) => ({
          ...message,
          id: index, // Agrega un ID único para cada mensaje
        }))}
        style={{
          /* Estilos para ocultar los triángulos */
          '.message.right .triangle::after': {
            display: 'none',
          },
          '.message.left .triangle::after': {
            display: 'none',
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
            position:'absolute',
            width:399,
            alignSelf:'center',
            bottom:0
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