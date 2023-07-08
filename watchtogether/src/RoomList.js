import React, { useEffect } from 'react';
import RoomListCSS from './roomlist.module.css';
import {useState} from 'react';
import CreateRoom from './CreateRoom';


const RoomList = () => {
    const [rooms, setListData] = useState([]);

    useEffect(() => {
        fetch("https://gruppe2.toni-barth.com/rooms/")
        .then(res => res.json())
        .then(data => setListData(data.rooms));
    },[]);

    
    return(
        <div className={RoomListCSS.mainContainer}>
            <ul className={RoomListCSS.table}>
                {rooms.map((room, index) => (
                  <li key={index}>{room.name}
                  </li>  
                ))}
            </ul>
            <input type="button" value="Refresh!"></input>
            <div className={RoomListCSS.createAndJoin}>
            <CreateRoom></CreateRoom>
            </div>
        </div>
    );
};

export default RoomList;