import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css'; // Import the CSS file


    const url = `https://gruppe2.toni-barth.com/rooms/appetizing-petite-zebra/video`;
    let UserId = localStorage.getItem("userId");

const VideoPlayer = () => {
    let [videoUrl, setVideoUrl] = useState('https://youtu.be/nhPcPZR9JRk');
  const handleButtonClick = () => {
    videoUrl = (document.getElementById('videoUrlInput').value);

        setVideoUrl(videoUrl);
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: UserId, // User ID
                url: videoUrl // Video URL

            })
        }).then((response) => {
            if(response.ok){
                console.log('Video set successful.')
            } else {
                console.log('Fehler')
            }
        }).catch((error) => {
            console.log('Error:', error)
        })
    }
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
            url={videoUrl}
            controls>
           </ReactPlayer>
        </div>
    );
};

export default VideoPlayer;