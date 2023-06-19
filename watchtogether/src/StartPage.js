import React from 'react';
import CreateRoom from './CreateRoom';
import UserName from './UserName';
import StartPageCSS from './startpage.module.css';

const StartPage = () => {
    return(
        <div className={StartPageCSS.mainContainer}>
            <h1 className={StartPageCSS.header}>Welcome at WatchTogether!</h1>
            <UserName></UserName>
            <input type="Button"  value="Join!"></input>
            <CreateRoom></CreateRoom>
        </div>
    );
};

export default StartPage;