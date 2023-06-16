// import "video-react/dist/video-react.css";
// import video from './video.mp4';

// import React from 'react';
// import { Player } from 'video-react';
// import ChatBox from './ChatbotBox';

// export default props => {
//     return (
//       <div>
//         <div style={{ width: '30%', height: '100%' }}>
//           <Player
//           playsInline
//           // poster=""
//           src={video}
//           />
//         </div>

//         <div style={{ width: '30%', height: '100%' }}>
//           <ChatBox />
//         </div>
//       </div>
//     );
//   };

import "video-react/dist/video-react.css";
import video from './video.mp4';

import React from 'react';
import { Player } from 'video-react';
import ChatBox from './ChatbotBox';

export default props => {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ width: '50%', height: '100%' }}>
          <Player
          className="decorativeFrame"
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

        <div style={{ width: '50%', height: '100%' }}>
          <ChatBox />
        </div>
      </div>
    );
};