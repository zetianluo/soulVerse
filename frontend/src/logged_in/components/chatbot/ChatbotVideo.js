import "video-react/dist/video-react.css";
import './App.css';
import video from './First.mp4';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Player } from 'video-react';
import ChatBox from './ChatbotBox';


const useStyles = makeStyles({
  appContainer: {
    backgroundImage: 'linear-gradient(to left bottom, #627f7f7f, #40616a, #254354, #14263c, #0c0422)',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  frame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '80vh', 
    width: '80vw',
    marginLeft: '180px',
    marginTop: '130px',
  },
  videoBox: {
        width: '48vw' ,// '42.7vw',
        height: '100%',
  },
  chatBox: {
    width: '35vw',
    height: '50%' , // '100%',
  },
});

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.appContainer}>
      <div className={classes.frame}>
        <div className={classes.videoBox}>
        <video
            playsInline
            src={video}
            autoPlay={true}
            controls={false}
            style={{ 
              pointerEvents: "none",
              width: '60vw', // Scale the width to fill its container
              height: '80vh', // Scale the height to fill its container
              // objectFit: 'cover' // Make the video cover its container
              marginLeft: '-110px'
            }} 
          />
        </div>
        <div className={classes.chatBox}>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};