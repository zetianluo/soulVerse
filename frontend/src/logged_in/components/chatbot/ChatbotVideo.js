import "video-react/dist/video-react.css";
import './App.css';
import video from './video.mp4';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Player } from 'video-react';
import ChatBox from './ChatbotBox';
import { useSpring, animated } from 'react-spring';

// Your styles
const useStyles = makeStyles({
  // parentContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '100vh',
  //   width: '100vw',
  // },
  frame: {
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '80vh', 
    width: '85vw',
    marginLeft: '-130px',
  },
  videoBox: {
    width: '45vw',
    height: '60vh',
  },
  chatBox: {
    width: '35vw',
    height: '60vh',
  },
  title: {
    position: 'absolute', 
    top: '20px', 
    left: '20px',
    fontSize: '2em',
    color: '#000',
    zIndex: 10, 
  },
});

export default props => {
  const classes = useStyles();

  // Define the animation
  const titleAnimation = useSpring({
    from: { opacity: 0, marginTop: -1000 }, 
    to: { opacity: 1, marginTop: 0 },
    config: { duration: 1000 },
  });

  return (
    // <div className={classes.parentContainer}>
      <div className={classes.frame}>
        
        <div className={classes.videoBox}>
          <Player
            playsInline
            src={video}
            autoPlay={true}
            loop = {true}
            bigPlayButton={false}
            muted={true}
            autoHide={true}
            autoHideTime={100}
          />
        </div>
        <div className={classes.chatBox}>
          <ChatBox />
        </div>
      </div>
    // </div>
  );
};