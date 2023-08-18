import React from "react";
import RoomList from './RoomList';
import VideoPlayer from "./VideoPlayer";
import UserNameTag from "./UserNameTag";
import ChatWindow from "./ChatWindow";

const RoomPage = () => {
    return(
        <div> 
            <UserNameTag></UserNameTag>
            <RoomList></RoomList>
            <VideoPlayer></VideoPlayer>
            <ChatWindow></ChatWindow>
        </div>
    );
}; 

export default RoomPage;