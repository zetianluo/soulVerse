import "video-react/dist/video-react.css";
import video from './Second.mp4';
import filmRollFrame from './film_roll_transparent.png';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Player } from 'video-react';

const useStyles = makeStyles({
  frame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '50vh',
    width:'50vw' 
  },
  outerFrame :{
    border: '1px solid #ffffff',
  },
  filmRoll: {
    backgroundImage: `url(${filmRollFrame})`,
    backgroundSize: 'contain',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
  }
});

export default props => {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex', height: '70vh', width: '60vw', justifyContent: 'center', alignItems: 'center' }}>
      <div className={classes.ouSterFrame} style={{ width: '50vw', height: '40vh' }}>
        <div className={classes.frame}>
          <div className={classes.filmRoll} style={{ width: '40vw', height: '60vh' }}>
            <video
              playsInline
              src={video}
              autoPlay={true}
              loop={true}
              bigPlayButton={false}
              muted={true}
              autoHide={true}
              autoHideTime={100}
              width='600vw'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
