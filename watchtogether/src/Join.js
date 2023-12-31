import React from 'react';
import {useState} from 'react';
import { Route, Routes } from "react-router-dom";
import JoinCSS from './join.css';

//JoinComponente -> eine Componente die Teil einer Raumseite ist, anders als im Namen gilt diese Compontene hauptsächlich dem Verlassen eines Raums
const Join = () => {

    //const[userCanLeaveRoom, setIsLeaved] = useState(false);
   
    let userId = localStorage.getItem("userId");
    const currentUrl = window.location.href;

    const findRoomName = currentUrl.match(/\/rooms\/([^/]+)$/);
    const roomName = findRoomName[1]

    const url = `https://gruppe2.toni-barth.com/rooms/${roomName}/users`;

    //gibt alle User eines Raumes zurück
    function getUsers(){
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => {
            console.log('Error:', error)
        })
    }
    
    //entfernt den Nutzer aus dem Raum
    function leaveRoom(){
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId
            })
        }).then((res) => {
            if(res.ok){
                console.log('User left successeful')
                window.location.href = "/WuM-WatchTogether";


            } else {
                console.log('Fehler')
                console.log(roomName)
            }
        }).catch(error => {
            console.log('Error:', error)
        })
    }


    return(
        <div>
            <button className="join-button" onClick={leaveRoom}>Leave Room</button>
            <button className="join-button" onClick={getUsers}>Get All Users in Room</button>
        </div>
    );
};



export default Join;