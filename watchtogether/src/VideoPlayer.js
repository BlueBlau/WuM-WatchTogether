import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css'; // Import the CSS file


//Componnte, die den VideoPlayer repräsentiert
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
    const [serverPosition, setServerPosition] = useState(0);

   

    //Funktion, die die VideoUrl eines Input entgegen nimmt und an die API sendet
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

        setInterval(getButtonClick, 2000)

      //nimmt den PlayInput entgegen und ruft Funktion auf, die den Status an die API sendet
      const handlePlay = () => {
        if (playerRef.current){
            setIsPlaying(true);
            startVideo()
        }
    };

    //nimmt den PauseInput entgegen und ruft Funktion auf, die den Status für Pause an die API sendet
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

    //Funktion, die in einem gewissen Abstand den status eines Videos von der URL abruft
    useEffect (() => {
        async function getVideoStatus(){
            try{
                const response = await fetch(url2, {
                    method: 'GET',
                });
                if(response.ok){
                    const data = await response.json();
                    setIsPlaying(data.status === 'playing');
                } else {
                    console.error('Failed to get status from API');
                }
            } catch (error) {
                console.error('Error while requesting status:', error)
            }
        };

        const Interval = setInterval(getVideoStatus, 1000);

        return () => clearInterval(Interval)

    })



    function getCurrentVideoPosition(){
        if(playerRef.current){
            const currentPosition = playerRef.current.getCurrentTime();
            console.log('Current position:', currentPosition);
            sendVideoPosition(currentPosition)
        }
    }

    //Funktion, die den Fortschritt eines Videos überwacht. Sollte ein Nutzer mehr als 5 Sekunden vorspulen, so wird die Funktion für setzten der neuen Position aufgerufen
    const handleChange = (state) =>{
        const newPosition = state.playedSeconds;

        if(Math.abs(newPosition - currentPosition) >= 5) {
            console.log("PositionSkip")
            sendVideoPosition(newPosition)
        }

        setCurrentPosition(newPosition)

    }


    //Funktion, die die neue Position an die API sendet
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

    //Funktion die jede Sekunde abfragt, ob sich etwas geändert hat (anfrage an die API) -> sollte das der Fall sein, so wird das Video auf die jeweilie Position gesetzt
    const getVideoPosition = async() => {
        try{
            const response = await fetch(url3)
            if(response.ok){
                const data = await response.json();
                const newPosition = data.position

              

                if(newPosition !== serverPosition){
                    setServerPosition(newPosition)
                   
                    playerRef.current.seekTo(newPosition)
                }
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
    });

   
  

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
            onProgress={handleChange}
           />
         
        </div>
    );
};

export default VideoPlayer;