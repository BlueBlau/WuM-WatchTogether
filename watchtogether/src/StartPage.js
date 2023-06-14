import React from 'react';
import CreateRoom from './CreateRoom';
import StartPageCSS from './startpage.module.css';

const StartPage = () => {
    return(
        <div className={StartPageCSS.mainContainer}>
            <h1 className={StartPageCSS.header}>Welcome at WatchTogether!</h1>
            <p>Please enter a username. After that you can join a room or create a new one.</p>
            <input type="text" name="Username"></input>
            <input type="Button"  value="Join!"></input>
            <CreateRoom></CreateRoom>
        </div>
    );
};

export default StartPage;