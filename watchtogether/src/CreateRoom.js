import React from 'react';
import style from './createroom.module.css'

const CreateRoom = () => {
    return(
        <div className={style.mainContainer}>
            <p>Give your new room a name und click create, to create the room.</p>
            <input type="text" id='roomName'></input>
            <input type="button" value="Create room!" onClick={createNewRoom}></input>
        </div>
    );
};

function createNewRoom(){
    let roomName = document.getElementById('roomName').value;
    alert(roomName);
}

export default CreateRoom;