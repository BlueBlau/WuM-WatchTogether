import React from 'react';
import UserName from './UserName';
import StartPageCSS from './startpage.module.css';
import RoomList from './RoomList';
import VideoPlayer from './VideoPlayer';

const StartPage = () => {
    return(
        <div className={StartPageCSS.mainContainer}>
            <h1 className={StartPageCSS.header}>Welcome at WatchTogether!</h1>
            <UserName></UserName>
            <RoomList></RoomList>
            <VideoPlayer></VideoPlayer>
        </div>
    );
};

export default StartPage;