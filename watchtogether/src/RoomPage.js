import React from "react";
import RoomList from './RoomList';
import VideoPlayer from "./VideoPlayer";
import UserNameTag from "./UserNameTag";
import ChatWindow from "./ChatWindow";
import RoomPageCSS from "./roompage.module.css"

//Componente, die eine Raumseite darstellt
const RoomPage = () => {
    return(
        <div className={RoomPageCSS.main}> 
            <UserNameTag></UserNameTag>
            <RoomList></RoomList>
            <div className={RoomPageCSS.VideoChat}>
            <VideoPlayer></VideoPlayer>
            <ChatWindow></ChatWindow>
            </div>
        </div>
    );
}; 

export default RoomPage;