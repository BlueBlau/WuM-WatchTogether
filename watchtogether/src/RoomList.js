import React from 'react';
import Room from './Room'; 
import RoomListCSS from './roomlist.module.css';
import {useState} from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const InitalRoomList = [
    {id: 0, name:'Raum 1'},
    {id: 1, name:'Raum 2'},
    {id: 2, name:'Raum 3'},
];
const RoomList = () => {
    const [RoomList, insertNewRoom] = useState(InitalRoomList);
    
    return(
        <div className={RoomListCSS.mainContainer}>
            <ul className={RoomListCSS.table}>
                {RoomList.map((room) => <Room key={RoomList.id} name={room.name}/>)}
            </ul>
            <div className={RoomListCSS.createAndJoin}>
            <CreateRoom></CreateRoom>
            <JoinRoom></JoinRoom>
            </div>
        </div>
    );
};

export default RoomList;