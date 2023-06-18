// import "video-react/dist/video-react.css";
// import { makeStyles } from '@mui/styles';
// import React from 'react';
// import { Player } from 'video-react';
// import video from './dashboard.mp4'


// const useStyles = makeStyles({
//   appContainer: {
//     backgroundImage: 'linear-gradient(to left bottom, #627f7f7f, #40616a, #254354, #14263c, #0c0422)',
//     height: '100vh',
//     width: '100vw',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//   },
//   frame: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: '80vh', 
//     width: '80vw',
//     marginLeft: '180px',
//     marginTop: '130px',
//   },
//   videoBox: {
//         width: '43vw' ,// '42.7vw',
//         height: '100%',
//   },
//   chatBox: {
//     width: '35vw',
//     height: '50%' , // '100%',
//   },
// });

// export default props => {
//   const classes = useStyles();

//   return (
//     <div className={classes.appContainer}>
//       <div className={classes.frame}>
//         <div className={classes.videoBox}>
//           <Player playsInline autoPlay controls={false} loop src={video} width="100%"/>
//         </div>
//         <div className={classes.chatBox}>
          
//         </div>
//       </div>
//     </div>
//   );
// };


import { makeStyles } from '@mui/styles';
import React from 'react';
import video from './dashboard.mp4'

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
    marginTop: '100px',
  },
  videoBox: {
    borderRadius: '10px',
    width: '1000vw',
    height: '100%',
  },
  chatBox: {
    width: '35vw',
    height: '50%',
  },
});

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.appContainer}>
      <div className={classes.frame}>
        <div className={classes.videoBox}>
          <video
            src={video}
            autoPlay
            loop
            muted // video element requires the 'muted' attribute for autoplay to work
            style={{ width: "100%", height: "100%" }} // or adjust these values to fit the video in the container as you want
          />
        </div>
        <div className={classes.chatBox}>
          
        </div>
      </div>
    </div>
  );
};
