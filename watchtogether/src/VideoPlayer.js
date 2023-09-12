import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css'; // Import the CSS file


    const currentUrl = window.location.href;
    const findRoomName = currentUrl.match(/\/rooms\/([^/]+)$/);
    const roomName = "o"
    
    const url = `https://gruppe2.toni-barth.com/rooms/${roomName}/video`;
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

    const getButtonClick = () => {
    // Make a GET request to fetch the video URL from your API
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the video URL in your component's state with the fetched value
                setVideoUrl(data.url);
                console.log('Video fetched successfully.');
            })
            .catch((error) => {
                console.log('Error:', error);
            });
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
            <button onClick={getButtonClick}>
                Get Video
            </button>
           <ReactPlayer
            url={videoUrl}
            controls>
           </ReactPlayer>
        </div>
    );
};

export default VideoPlayer;