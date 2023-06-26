import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = (videoUrl) => {
    return(
        <div>
           <ReactPlayer
            url='https://youtu.be/nhPcPZR9JRk'
            controls
            width='640px'
            height='360px'>
           </ReactPlayer>
        </div>
    );
};

export default VideoPlayer;