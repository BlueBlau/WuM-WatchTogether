import React from 'react';
import {useState} from 'react';
import { Route, Routes } from "react-router-dom";

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
            <input type="button" value="LeaveRoom"  onClick={leaveRoom} ></input>
            <input type="button" value="getallUsersinRoom" onClick={getUsers}></input>
        </div>
    );
};



export default Join;