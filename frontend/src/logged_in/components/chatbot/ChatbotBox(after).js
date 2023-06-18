import React, { useState, useEffect, useRef } from 'react';
import { alpha } from '@mui/system';
import { TextField, Button, List, ListItem, Paper, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import GrandmaAvatar from './grandma.png';
import axios from 'axios';
import RobotAvatar from '@mui/icons-material/SmartToy';
import RobotIcon from './robot.png';


const useStyles = makeStyles({
  chatItemRobot: {
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: '5px auto',
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: '#a6a4a4',  // Changed color for Robot;
  },
  chatItemUser: {
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: '5px auto',
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: '#FFFFFF',  // Color for User remains same;
  },
  chatContainer: {
    width: '100%',
    height: '80vh',
    backgroundColor: '#f0f0f0',  // This is for Robot;
    borderRadius: '20px',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  decorativeFrame: {
    // border: `5px solid ${alpha('#FFD700', 0.6)}`, // gold decorative border
    borderRadius: '20px',
    // backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // linear-gradient(to left bottom, #627f7f, #40616a, #254354, #14263c, #0c0422)
    backgroundImage: 'radial-gradient(circle, #314343, #273539, #1f272d, #171a1f, #0c0b11)', //background-image: radial-gradient(circle, #314343, #273539, #1f272d, #171a1f, #0c0b11);
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
    backgroundImage: 'linear-gradient(45deg, #8C05EE 30%, #DB05EE 90%)',
    color: 'white', // white text
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
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
  
  const endOfMessagesRef = useRef(null); // Moved useRef into ChatBox function

  useEffect(() => { // Moved useEffect into ChatBox function
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        setMessages(prevMessages => [...prevMessages,  {text: output, sender: 'robot'}]); // Robot message {text: input, sender: 'user'},
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
      <ListItem 
        key={index} 
        className={message.sender === 'robot' ? classes.chatItemRobot : classes.chatItemUser}
      >
        {message.sender === 'robot' && <Avatar src={RobotIcon} />}
        <div>{message.text}</div>
        {message.sender === 'user' && <Avatar src={GrandmaAvatar} />}
      </ListItem>
    ))}
    <div ref={endOfMessagesRef} /> {/* Ref attached to an empty div */}
  </List>
    <form onSubmit={handleSend} className={classes.form}>
      <TextField
        className={classes.chatInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton onClick={toggleListen} color='success'>
        <MicIcon />
      </IconButton>
      <Button variant="contained" color="success" type="submit">
        Send
      </Button>
    </form>
  </Paper>
);
}

export default ChatBox;
