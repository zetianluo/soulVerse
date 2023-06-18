import "video-react/dist/video-react.css";
import './App.css';
import video from './video.mp4';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Player } from 'video-react';
import ChatBox from './ChatbotBox(after)';
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





// import "video-react/dist/video-react.css";
// import './App.css';
// import video from './video.mp4';
// import { makeStyles } from '@mui/styles';
// import React from 'react';
// import { Player } from 'video-react';
// import ChatBox from './ChatbotBox(after)';
// import { alpha } from '@mui/system';

// // Your styles
// const useStyles = makeStyles({
//   frame: {
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: '80vh', 
//   },
//   outerFrame :{
//     border:  `1px solid ${'#fafbfc'}`,
//   },
//   textBox: {
//     backgroundColor: '#FFFFFF', // white background
//     borderRadius: '5px', // rounded corners
//     border: '1px solid #ccc', // light gray border
//     boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', // shadow effect
//     padding: '10px',
//     margin: '10px',
//   }
// });

// export default props => {
//   const classes = useStyles();
// return (
//   <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
//     <div className={classes.outerFrame} style={{ width: '100vw', height: '100vh' }}>  {/* Updated width and height to 100vw and 100vh */}
//       <div className={classes.frame}>
//         <div style={{ width: '50%', height: '100%' }}>
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
//           <div className={classes.textBox}>
//             Here is some text below the video from the backend.
//           </div>
//         </div>

//         <div style={{ width: '50%', height: '100%' }}>
//           <ChatBox />
//         </div>
//       </div>
//     </div>
//   </div>
// );
// };
