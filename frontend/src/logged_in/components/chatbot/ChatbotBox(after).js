import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/system';
import { TextField, Button, List, ListItem, Paper, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import GrandmaAvatar from './grandma.png';
import axios from 'axios';
import RobotAvatar from '@mui/icons-material/SmartToy';

// Web Speech API for speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';


recognition.interimResults = true;

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
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(45deg, #888888 30%, #CCCCCC 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
    backgroundColor: '#e0e0e0',
  },
  chatInput: {
    width: '100%',
    backgroundColor: '#FFFFFF', // white background
    borderRadius: '5px', // rounded corners
    border: '1px solid #ccc', // light gray border
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendButton: {
    backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white', // white text
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

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
    setMessages(prevMessages => [...prevMessages, {text: input, sender: 'user'}]); // User message
    axios.post('/gpt4', {
      message: input
    })
    .then(function (response) {
      let output = response.data.output; // the output from GPT-4 API
      setMessages(prevMessages => [...prevMessages, {text: input, sender: 'user'}, {text: output, sender: 'robot'}]); // Robot message
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
           <Avatar src={message.sender === 'user' ? GrandmaAvatar : RobotAvatar} />
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