import React from 'react';
import {useState} from 'react';

const Join = () => {
    const[roomName, setRoomName] = useState('RoomName');
    //const[userCanLeaveRoom, setIsLeaved] = useState(false);
    const[userCanJoinRoom, setIsJoined] = useState(false);
    let userId = localStorage.getItem("userId");

    const url = `https://gruppe2.toni-barth.com/rooms/${roomName}/users`;

   async function joinRoom(){
        let name = document.getElementById('roomNameInput').value;
        setRoomName(name);
        console.log(userId);
        try {
            const response = await fetch("https://gruppe2.toni-barth.com/rooms/");
            const data = await response.json();
            checkRoom(data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    function checkRoom(data){
        const room = data.rooms.find((room) => roomName === room.name);
        if(room) {
            putUserInRoom(url);
        }
     }

    function putUserInRoom(url){
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId
            })
        }).then((response) => {
            if(response.ok){
                console.log('User joined successful.')
            } else {
                console.log('Fehler')
            }
        }).catch((error) => {
            console.log('Error:', error)
        })
    }

    function getUsers(){
        fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => {
            console.log('Error:', error)
        })
    }

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

            } else {
                console.log('Fehler')
            }
        }).catch(error => {
            console.log('Error:', error)
        })
    }


    return(
        <div>
            <input type="text" placeholder={roomName} id='roomNameInput'></input>
            <input type="button" value="Join!" onClick={joinRoom} disabled={userCanJoinRoom}></input>
            <input type="button" value="LeaveRoom"  onClick={leaveRoom} ></input>
            <input type="button" value="getallUsersinRoom" onClick={getUsers}></input>
        </div>
    );
};



export default Join;