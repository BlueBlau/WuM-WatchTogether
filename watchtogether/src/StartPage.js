import React from 'react';
import UserName from './UserName';
import StartPageCSS from './startpage.module.css';
import RoomList from './RoomList';
import HelpPageButton from './HelpPageButton';
import StartPageRoomList from './StartPageRoomList';

const StartPage = () => {

    const alertSound = document.getElementById("alertSound")

    function playSound(){
        if(alertSound){
            alertSound.play()
            console.log("Ja")
        } else {
            console.log("No sound there")
        }

    }


    return(
    <div className={StartPageCSS.mainContainer}>
            <h1 className={StartPageCSS.header}>Welcome to WatchTogether!</h1>
            <UserName></UserName>
            <HelpPageButton></HelpPageButton>
            <StartPageRoomList></StartPageRoomList>
            <audio id="alertSound" preload="auto">
                <source src="./messageSound.mp3" type="audio/mepg"></source>
            </audio>
           
        </div>
    );
};

export default StartPage;