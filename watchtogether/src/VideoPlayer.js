import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css'; // Import the CSS file

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleButtonClick = () => {
    setVideoUrl(document.getElementById('videoUrlInput').value);
  };

    return(
        <div className="VideoPlayer">
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
            controls>
           </ReactPlayer>
        </div>
    );
};

export default VideoPlayer;