// import "video-react/dist/video-react.css";
// import './App.css';
// import video from './video.mp4';
// import { makeStyles } from '@mui/styles';
// import React from 'react';
// import { Player } from 'video-react';
// import ChatBox from './ChatbotBox';

// // Your styles
// const useStyles = makeStyles({
//   appContainer: {
//     backgroundImage: 'linear-gradient(to left bottom, #627f7f, #40616a, #254354, #14263c, #0c0422)',
//     height: '100vh',
//     width: '100vw',
//     position: 'fixed',
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
//     marginTop: '100px',
//   },
//   videoBox: {
//         width: '42.7vw',
//         height: '60vh',
//       },
//   chatBox: {
//     width: '35vw',
//     height: '60vh',
//   },
// });

// export default props => {
//   const classes = useStyles();

//   return (
//     <div className={classes.appContainer}>
//       <div className={classes.frame}>
//         <div className={classes.videoBox}>
//           <Player
//             playsInline
//             src={video}
//             autoPlay={true}
//             loop = {true}
//             bigPlayButton={false}
//             muted={true}
//             autoHide={true}
//             autoHideTime={100}
//           />
//         </div>
//         <div className={classes.chatBox}>
//           <ChatBox />
//         </div>
//       </div>
//     </div>
//   );
// };


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


const useStyles = makeStyles({
  appContainer: {
    backgroundImage: 'linear-gradient(to left bottom, #627f7f7f, #40616a, #254354, #14263c, #0c0422)',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    position: 'absolute',
    top: 100, // adjust based on your needs
    left: 100, // adjust based on your needs
    color: '#fff', // adjust color based on your needs
    fontSize: '2em', // adjust size based on your needs
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
        width: '42.7vw',
        height: '100%',
  },
  chatBox: {
    width: '35vw',
    height: '100%',
  },
});

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.appContainer}>
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
    </div>
  );
};