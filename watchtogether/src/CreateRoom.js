import React from 'react';
import style from './createroom.module.css'

const CreateRoom = () => {
    return(
        <div className={style.mainContainer}>
            <input type="text" id='roomName' placeholder='room name'></input>
            <input type="button" value="Create room!" onClick={createNewRoom}></input>
        </div>
    );
};

function createNewRoom(){
    let roomName = document.getElementById('roomName').value;
    alert(roomName);
}

export default CreateRoom;