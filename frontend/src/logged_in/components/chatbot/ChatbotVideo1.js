import React from "react";
import withStyles from "@mui/styles/withStyles";
import backwardIcon from './backward.svg';
import playIcon from './play.svg';
import forwardIcon from './forward.svg';
import pauseIcon from './pause.svg';
import ChatBox from './ChatbotBox';
import video from './exp.mp4';
import { useState, useRef } from "react";


const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      },
      controlsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        backgroundColor: 'transparent',
        marginTop: '-50vw',
        padding: '0 40px',
        zIndex: 20,
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: '18rem',
        margin: 'auto',
      },
      controlsIcon: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        marginLeft: '10rem',
        marginRight: '10rem',
      },
      controlsIconSmall: {
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        marginLeft: '10rem',
        marginRight: '10rem',
      },
      timecontrols: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: '4rem',
        marginLeft: '10vw',
      },
      time_progressbarContainer: {
        backgroundColor: 'gray',
        borderRadius: '15px',
        width: '75vw',
        height: '5px',
        zIndex: 30,
        position: 'relative',
        margin: '0 20px',
      },
      time_progressBar: {
        borderRadius: '15px',
        backgroundColor: 'indigo',
        height: '100%',
      },
      controlsTime: {
        color: 'white',
      },
};

function ChatbotVideo(props) {
    const videoRef = useRef(null);
    const { classes } = props;
    const [playing, setPlaying] = useState(false);

    const videoHandler = (control) => {
        if (control === "play") {
          videoRef.current.play();
          setPlaying(true);
        } else if (control === "pause") {
          videoRef.current.pause();
          setPlaying(false);
        }
      };

    {playing ? (
        <img
          onClick={() => videoHandler("pause")}
          className="controlsIcon--small"
          alt=""
          src={pauseIcon}
        />
      ) : (
        <img
          onClick={() => videoHandler("play")}
          className="controlsIcon--small"
          alt=""
          src={playIcon}
        />
      )}
    

      
    return (
        <div className={classes.app}>
             {/* <video 
                className={classes.video}
                src="https://www.youtube.com/watch?v=ENANyeGqKR8"
            ></video> */}
            {/* <div style={{ width: '50%', height: '100%' }}>  */}
                {/* <iframe className={classes.video}
                    width="80%" 
                    height="70%" 
                    src="https://www.youtube.com/embed/ENANyeGqKR8" 
                    title="YouTube video player" 
                    frameBorder="1" 
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    // allowFullScreen
                ></iframe> */}
                <video 
                    ref={videoRef}
                    className={classes.video}
                    src={video}
                ></video>
                <div className={classes.controlsContainer}>
                        <div className={classes.controls}>
                        <img className={classes.controlsIcon} alt="backward" src={backwardIcon} />
                        <img onClick={() => videoHandler("play")} className={classes.controlsIconSmall} alt="play" src={playIcon} />
                        <img onClick={() => videoHandler("pause")} className={classes.controlsIconSmall} alt="pause" src={pauseIcon} />
                        <img className={classes.controlsIcon} alt="forward" src={forwardIcon} />
                        </div>
                </div>

                <div className={classes.timecontrols}>
                    <p className={classes.controlsTime}>1:02</p>
                    <div className={classes.time_progressbarContainer}>
                    <div style={{ width: "40%" }} className={classes.time_progressBar}></div>
                    </div>
                    <p className={classes.controlsTime}>2:05</p>
                </div> 
                {/* </div>  */}

                {/* <div style={{ width: '50%', height: '100%' }}>
                    <ChatBox />
                </div> */}

        </div>
    )
}

// export default ChatbotVideo;
export default withStyles(styles)(ChatbotVideo);