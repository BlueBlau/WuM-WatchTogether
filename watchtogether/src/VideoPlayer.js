import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css'; // Import the CSS file

const VideoPlayer = () => {

    const currentUrl = window.location.href;
    const findRoomName = currentUrl.match(/\/rooms\/([^/]+)$/);
    const roomName = findRoomName[1]
    const playerRef = useRef(null);
    const [UpdatePosition, setUpdatePosition] = useState(false);
    
    const url = `https://gruppe2.toni-barth.com/rooms/${roomName}/video`;
    const url2 = `https://gruppe2.toni-barth.com/rooms/${roomName}/status`;
    const url3 = `https://gruppe2.toni-barth.com/rooms/${roomName}/position`;
    let UserId = localStorage.getItem("userId");

    let [videoUrl, setVideoUrl] = useState('https://youtu.be/nhPcPZR9JRk');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);

   

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
                console.log('Video erfolgreich gesetzt.')
            } else {
                console.log('Fehler beim setzen des Videos.')
            }
        }).catch((error) => {
            console.log('Error:', error)
        })
    }

    const getButtonClick = () => {
        // Laden von der URL / von der API
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const newVideoUrl = data.url;

                handleSetVideoUrl(newVideoUrl);
                console.log('Video erfolgreich geladen.');

            })
            .catch((error) => {
                console.log('Fehler:', error);
            });
        
        };

    // Handler beim Abspielen
    const handlePlay = () => {
        if (playerRef.current){
            setIsPlaying(true);
            startVideo()
        }
    };

    // Handler beim Pausieren
    const handlePause = () => {
        if(playerRef.current) {
            setIsPlaying(false)
            stopVideo()
        }
    };
    
    //Funktion, die den play-status setzt
    async function startVideo(){
        try {
            await fetch(url2, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: UserId,
                    status: 'playing'
                }),
            });
        } catch (error){
            console.error('Error while send start request:', error)
        }
    }


    //Funktion, die den paused Status setzt
    async function stopVideo(){
        try{
            await fetch(url2, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: UserId,
                    status: 'paused'
                }),
            });
        } catch (error) {
            console.error('Error while sending stop request:', error)
        }
    }

    useEffect (() => {
        async function getVideoStatus(){
            try{
                const response = await fetch(url2, {
                    method: 'GET',
                });
                if(response.ok){
                    const data = await response.json();
                    console.log(data.status)
                    setIsPlaying(data.status === 'playing');
                } else {
                    console.error('Failed to get status from API');
                }
            } catch (error) {
                console.error('Error while requesting status:', error)
            }
        };

        const Interval = setInterval(getVideoStatus, 3000);

        return () => clearInterval(Interval)

    })

    function getCurrentVideoPosition(){
        if(playerRef.current){
            const currentPosition = playerRef.current.getCurrentTime();
            console.log('Current position:', currentPosition);
            sendVideoPosition(currentPosition)
        }
    }
    
    const handleSeek = (e) => {
        if(playerRef.current){
            playerRef.current.seekTo(e);
            setCurrentPosition(e);
            sendVideoPosition(e)
        }
    }


    async function sendVideoPosition(videoPosition){
        try{
            await fetch(url3, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: UserId,
                    position: videoPosition
                })
            }).then((response) => {
                if(response.ok){
                    console.log("Video position was updated");
                } else {
                    console.log("Failed to update video postion")
                }
            })
        } catch (error){
            console.error('Failed to send videoposition:',error)
        }
    }

    const getVideoPosition = async() => {
        try{
            const response = await fetch(url3)
            if(response.ok){
                const data = await response.json();
                setCurrentPosition(data.position);
            } else {
                console.error('Failed to get video position');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getInterval = 1000;
    
    useEffect(() => {
        const interval = setInterval(getVideoPosition, getInterval)

        return () => clearInterval(interval)
    })
   
  

    //Setzt neue Video Url
    const handleSetVideoUrl = (newVideoUrl) => {
        if (newVideoUrl !== videoUrl) {
            setVideoUrl(newVideoUrl);
        }
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
            ref={playerRef}
            playing={isPlaying}
            controls
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={(e) => handleSeek(e)}
            onProgress={(e) => setCurrentPosition(e.playedSeconds)}
           />
           <div>
            <p>Current position: {currentPosition} </p>
           </div>
           <button onClick={getCurrentVideoPosition}>GetCurrentPosition</button>
           <button onClick={getVideoPosition}>getNewPosition</button>
        </div>
    );
};

export default VideoPlayer;