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
    let [videoStatus, setVideoStatus] = useState('paused'); // Start Video immer auf Pause

    useEffect(()=> {
        const interval = setInterval(getButtonClick, 5000)
        return () => clearInterval(interval);
    });

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

        // Laden vom Video Status / von der API
        fetch(url2, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setVideoStatus(data.status);
                console.log(data.status);
                console.log('Status erfolgreich geladen.');
            })
            .catch((error) => {
                console.log('Fehler:', error);
            });

        // Laden von Video Position / von der API
        fetch(url3, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                handleSetPosition(data.position);
                console.log('Position erfolgreich geladen.');
            })
            .catch((error) => {
                console.log('Fehler:', error);
            });

    };

    // Handler beim Abspielen
    const handlePlay = () => {
        setVideoStatus('playing');
        sendVideoStatusToAPI('playing');
    };

    // Handler beim Pausieren
    const handlePause = () => {
        setVideoStatus('paused');
        sendVideoStatusToAPI('paused');
    };

    // Video Status zu API / nur von den oberen Handlern aufgerufen
    const sendVideoStatusToAPI = (status) => {
        fetch(url2, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: UserId, // User ID
                status: status // Video Status
            })
        }).then((response) => {
            if (response.ok) {
                console.log(`Video Status: (${status})`);
            } else {
                console.log('Fehler beim Senden des Status');
                console.log(status)
            }
        }).catch((error) => {
            console.log('Fehler:', error);
        });
    };

    // Handler bei Skip in Video (direkt mit Fetch)
    const handleSeek = (e) => {
        const newPosition = e.playedSeconds;
        console.log(`User springt zu ${newPosition} seconds.`);
        setUpdatePosition(true); //Änderungsanfrage bei Update

        //Sende Position zu API
        fetch(url3, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: UserId, // User ID
                position: newPosition // Video position in seconds
            })
        }).then((response) => {
            if (response.ok) {
                console.log('Position zur API gesendet.');
            } else {
                console.log('Fehler beim senden der Position.');
            }
        }).catch((error) => {
            console.log('Error:', error);
        });
    };

    //Setzt Position von Video an geladene Stelle
    const handleSetPosition = (positionInSeconds) => {
        if (UpdatePosition && playerRef.current) {
            playerRef.current.seekTo(positionInSeconds);
            setUpdatePosition(false); //Änderungsanfrage hier wieder resettet, damit sie nur geändert wird wenn muss
        }
    };

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
            controls
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={handleSeek}
           />
            <p>Video Status: {videoStatus}</p>
        </div>
    );
};

export default VideoPlayer;