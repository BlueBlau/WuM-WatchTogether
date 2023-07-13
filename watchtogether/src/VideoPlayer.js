import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleButtonClick = () => {
    setVideoUrl(document.getElementById('videoUrlInput').value);
  };

    return(
        <div>
            <input
            id="videoUrlInput"
            type="text"
            placeholder="Enter video URL"
            />
            <button onClick={handleButtonClick}>
                Set Video
            </button>
           <ReactPlayer
            url={videoUrl || 'https://youtu.be/nhPcPZR9JRk'}
            controls
            width='640px'
            height='360px'>
           </ReactPlayer>
        </div>
    );
};

export default VideoPlayer;