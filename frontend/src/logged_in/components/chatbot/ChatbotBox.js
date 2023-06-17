import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Paper, Avatar, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MicIcon from '@mui/icons-material/Mic';
import GrandmaAvatar from './grandma.png';
import axios from 'axios';

const useStyles = makeStyles({
  chatContainer: {
    width: '100%',
    height: '80vh',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  decorativeFrame: {
    border: '5px solid #FFD700', // gold decorative border
    borderRadius: '20px',
  },
  chatList: {
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  chatItem: {
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: '5px auto',
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: '#e0e0f0',
  },
  chatInput: {
    width: '100%',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

// Web Speech API for speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US'; // English language
recognition.interimResults = true;

function ChatBox() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

  const toggleListen = () => {
    if (!listening) {
      recognition.start();
      recognition.onresult = event => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setInput(input + event.results[i][0].transcript);
          }
        }
      };
    } else {
      recognition.stop();
    }
    setListening(!listening);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      axios.post('/gpt4', {
        message: input
      })
      .then(function (response) {
        let output = response.data.output; // the output from GPT-4 API
        setMessages([...messages, {text: output}]);
      })
      .catch(function (error) {
        console.log(error);
      });
      setInput('');
    }
  };

  return (
    <Paper className={`${classes.chatContainer} ${classes.decorativeFrame}`}>
      <List className={classes.chatList}>
         {messages.map((message, index) => (
           <ListItem key={index} className={classes.chatItem}>
             <div>{message.text}</div>
             <Avatar src={GrandmaAvatar} />
           </ListItem>
         ))}
       </List>
      <form onSubmit={handleSend} className={classes.form}>
        <TextField
          className={classes.chatInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton onClick={toggleListen}>
          <MicIcon />
        </IconButton>
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </Paper>
  );
}

export default ChatBox;
