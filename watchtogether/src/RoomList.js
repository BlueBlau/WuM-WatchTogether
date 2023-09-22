import React, { useEffect } from 'react';
import RoomListCSS from './roomlist.module.css';
import {useState} from 'react';
import CreateRoom from './CreateRoom';
import Join from './Join';
import {Link} from 'react-router-dom';


//Raumiste für einen Raum
const RoomList = () => {
    const [rooms, setListData] = useState([]);
    const userId = localStorage.getItem("userId");

    //rendert Liste wenn Componente mounted
   useEffect(() => {
        fetch("https://gruppe2.toni-barth.com/rooms/")
        .then(res => res.json())
        .then(data => setListData(data.rooms));
    },[]);

    //rendert Liste wenn Component mounted, aber alle 5 sekunde, damit neue Räume angezeigt werden können
    useEffect(()=> {
        const interval = setInterval(refresh, 5000)
        return () => clearInterval(interval);
    });
    
    //Funktion fragt Raumliste von der API ab
    function refresh(){
        fetch("https://gruppe2.toni-barth.com/rooms/")
        .then(res => res.json())
        .then(data => setListData(data.rooms))
    }

    //Funktion, damit der User den Raum beitritt, wenn er auf einen Link klingt -> wird dann an die API geschickt
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


    
    //Componentenaufbau
    return(
        <div className={RoomListCSS.mainContainer}>
            <ul className={RoomListCSS.table}>
                {rooms.map((room, index) => (
                  <li key={index}>
                    <Link to={`/rooms/${room.name}`} onClick={() => putUserIn(room.name)}>{room.name}</Link>
                  </li>  
                ))}
            </ul>
            <div className={RoomListCSS.createAndJoin}>
            <Join></Join>
            </div>
        </div>
    );
};

export default RoomList;