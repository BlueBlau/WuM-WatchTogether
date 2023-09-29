import React from "react";
import {useEffect, useState} from "react"
import CreateRoom from "./CreateRoom";
import {Link} from 'react-router-dom';
import "./startpageroomlist.css";


//Raumliste für den Startbildschirm
const StartPageRoomList = () => {

    const [rooms, setListData] = useState([]);
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        fetch("https://gruppe2.toni-barth.com/rooms/")
        .then(res => res.json())
        .then(data => setListData(data.rooms));
    },[]);

    function refresh(){
        fetch("https://gruppe2.toni-barth.com/rooms/")
        .then(res => res.json())
        .then(data => setListData(data.rooms))
    }

    //Funktion, die den Nutzer in den jeweiligen Raum packt, sollte er auf den jeweiligen Link klicken
    function putUserIn(roomName){
            fetch(`https://gruppe2.toni-barth.com/rooms/${roomName}/users`, {
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

   
    return(
    <div className="room-list-container">
            <ul>
                {rooms.map((room, index) => (
                  <li key={index}>
                    <Link to={`/rooms/${room.name}`}  onClick={() => putUserIn(room.name)}>{room.name}</Link>
                  </li>  
                ))}
            </ul>
            <CreateRoom></CreateRoom>
    </div>
        
    )
}

export default StartPageRoomList;