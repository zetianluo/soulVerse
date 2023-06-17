import "video-react/dist/video-react.css";
// import './App.css';
import video from './look_after.mp4';
import filmRollFrame from './film_roll_transparent.png'; // import film roll frame
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Player } from 'video-react';
import { alpha } from '@mui/system';

// Your styles
const useStyles = makeStyles({
  frame: {
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '80vh', 
  },
  outerFrame :{
    border:  `1px solid ${'#ffffff'}`,
  },
  filmRoll: { // New style for the film roll frame
    backgroundImage: `url(${filmRollFrame})`,
    backgroundSize: 'contain', // This will make the image cover the entire div
    // backgroundRepeat: 'no-repeat',
    padding: '10px', // Give some padding so the video does not touch the frame
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: '#FFFFFF', // white background
    borderRadius: '5px', // rounded corners
    border: '1px solid #ccc', // light gray border
    //boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', // shadow effect
    padding: '10px',
    margin: '10px',
  }
});

export default props => {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div className={classes.outerFrame} style={{ width: '100vw', height: '100vh' }}>  {/* Updated width and height to 100vw and 100vh */}
        <div className={classes.frame}>
          <div className={classes.filmRoll} style={{ width: '85%', height: '100%' }}>
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
        </div>
      </div>
    </div>
  );
};