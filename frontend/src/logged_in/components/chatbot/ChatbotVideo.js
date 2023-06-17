import "video-react/dist/video-react.css";
import './App.css';
import video from './video.mp4';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Player } from 'video-react';
import ChatBox from './ChatbotBox';
import { alpha } from '@mui/system';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useSpring, animated } from 'react-spring';

// Your styles
const useStyles = makeStyles({
  frame: {
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '80vh', 
  },
  outerFrame :{
    border:  `1px solid ${'#fafbfc'}`,
  },
  textBox: {
    backgroundColor: '#FFFFFF', // white background
    borderRadius: '5px', // rounded corners
    border: '1px solid #ccc', // light gray border
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', // shadow effect
    padding: '10px',
    margin: '10px',
  },
  title: {
    position: 'absolute', 
    top: '20px', 
    left: '20px',
    fontSize: '2em',
    color: '#000', // Change color as per your needs
    zIndex: 10, // Ensures the title is on top of other elements
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
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <animated.div style={titleAnimation} className={classes.title}>
        Baby
    </animated.div>
    <div className={classes.outerFrame} style={{ width: '100vw', height: '100vh' }}>  {/* Updated width and height to 100vw and 100vh */}
      <div className={classes.frame}>
        <div style={{ width: '50%', height: '100%' }}>
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
          <div className={classes.textBox}>
            Here is some text below the video from the backend.
          </div>
        </div>

        <div style={{ width: '50%', height: '100%' }}>
          <ChatBox />
        </div>
      </div>
    </div>
  </div>
);
};
