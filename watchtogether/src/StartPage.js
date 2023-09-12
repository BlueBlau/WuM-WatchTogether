import React from 'react';
import UserName from './UserName';
import StartPageCSS from './startpage.module.css';
import RoomList from './RoomList';
import HelpPageButton from './HelpPageButton';

const StartPage = () => {
    return(
    
        <div className={StartPageCSS.mainContainer}>
            <h1 className={StartPageCSS.header}>Welcome to WatchTogether!</h1>
            <UserName></UserName>
            <HelpPageButton></HelpPageButton>
            <RoomList></RoomList>
        </div>
    );
};

export default StartPage;