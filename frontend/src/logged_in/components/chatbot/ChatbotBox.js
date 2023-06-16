import React, { useState, useEffect } from 'react';

import { TextField, Button, List, ListItem, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
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
    backgroundColor: '#e0e0e0',
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

function ChatBox() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      axios.post('/gpt4', {
        message: input
      })
      .then(function (response) {
        console.log(response);
        // Handle the response from the server here
      })
      .catch(function (error) {
        console.log(error);
        // Handle the error here
      });
      setMessages([...messages, input]);
      setInput('');
    }
  };
  

  return (
    <Paper className={`${classes.chatContainer} ${classes.decorativeFrame}`}>
      {/* <List className={classes.chatList}>
        {messages.map((message, index) => (
          <ListItem key={index} className={classes.chatItem}>
            {message}
          </ListItem>
        ))}
      </List> */}
      <List className={classes.chatList}>
         {messages.map((message, index) => (
           <ListItem key={index} className={classes.chatItem}>
             <div>{message}</div>
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
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </Paper>
  );
}

export default ChatBox;

// import React, { useState } from 'react';
// import { TextField, Button, List, ListItem, Paper, Avatar } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import GrandmaAvatar from './grandma.png'; // replace 'path_to_your_image' with the actual path to your image file

// const useStyles = makeStyles({
//   chatContainer: {
//     width: '100%',
//     height: '80vh',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '20px',
//     padding: '20px',
//     boxSizing: 'border-box',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   chatList: {
//     overflowY: 'scroll',
//     marginBottom: '10px',
//   },
//   chatItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     wordBreak: 'break-word',
//     width: '80%',
//     margin: '5px auto',
//     borderRadius: '20px',
//     padding: '10px',
//     backgroundColor: '#e0e0f0',
//   },
//   chatInput: {
//     width: '100%',
//   },
//   form: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   }
// });

// function ChatBox() {
//   const classes = useStyles();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSend = (event) => {
//     event.preventDefault();
//     if (input.trim() !== '') {
//       setMessages([...messages, input]);
//       setInput('');
//     }
//   };

//   return (
//     <Paper className={classes.chatContainer}>
//       <List className={classes.chatList}>
//         {messages.map((message, index) => (
//           <ListItem key={index} className={classes.chatItem}>
//             <div>{message}</div>
//             <Avatar src={GrandmaAvatar} />
//           </ListItem>
//         ))}
//       </List>
//       <form onSubmit={handleSend} className={classes.form}>
//         <TextField
//           className={classes.chatInput}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <Button variant="contained" color="primary" type="submit">
//           Send
//         </Button>
//       </form>
//     </Paper>
//   );
// }

// export default ChatBox;