import Chat, { Bubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { API, ROUTES } from '../api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TypingText from '../components/TypiygText'
const Messages = ({text}) => {
  const { messages, appendMsg, setTyping } = useMessages([]);

  async function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);
      const response = await (await API()).post(ROUTES.GET_AI_RESPONS, JSON.stringify({input:val}));
        appendMsg({
          type: 'text',
          content: { text: response.data.data },
        });
      // setTimeout(() => {
     
      // }, 1000);


    }
  }


  return (
    <Card
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginTop:"25%",
      height: '70%',
    }}
  >
    <CardContent>
    

      <TypingText textProp={text}/>
    </CardContent>
  </Card>
  );
};

export default Messages