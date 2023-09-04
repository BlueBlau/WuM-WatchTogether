import React, { useEffect } from 'react';
import RoomListCSS from './roomlist.module.css';
import {useState} from 'react';
import CreateRoom from './CreateRoom';
import Join from './Join';
import {Link} from 'react-router-dom';


const RoomList = () => {
    const [rooms, setListData] = useState([]);
    const userId = localStorage.getItem("userId");



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
        <div className={RoomListCSS.mainContainer}>
            <ul className={RoomListCSS.table}>
                {rooms.map((room, index) => (
                  <li key={index}>
                    <Link to={`/rooms/${room.name}`} onClick={putUserIn(room.name)}>{room.name}</Link>
                  </li>  
                ))}
            </ul>
            <input type="button" value="Refresh!" onClick={refresh}></input>
            <div className={RoomListCSS.createAndJoin}>
            <Join></Join>
            <CreateRoom></CreateRoom>
            </div>
        </div>
    );
};

export default RoomList;