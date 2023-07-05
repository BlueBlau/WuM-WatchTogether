import React, { useEffect } from 'react';
import Room from './Room'; 
import RoomListCSS from './roomlist.module.css';
import {useState} from 'react';
import CreateRoom from './CreateRoom';

const data = {
    "rooms": [
        {
            "name": "room1"
        },
        {
            "name": "room2"
        },
    ]
}


const RoomList = () => {
    const [rooms, setListData] = useState(null);

    useEffect(() => {
        setListData(data);
    }, []);

    return(
        <div className={RoomListCSS.mainContainer}>
            <ul className={RoomListCSS.table}>
                <Room key={rooms.id}>{rooms.name}</Room>
            </ul>
            <div className={RoomListCSS.createAndJoin}>
            <CreateRoom></CreateRoom>
            </div>
        </div>
    );
};

export default RoomList;