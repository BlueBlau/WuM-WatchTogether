import React from 'react';
import style from './createroom.module.css'

const CreateRoom = () => {
    return(
        <div className={style.mainContainer}>
            <p>Give your new room a name und click create, to create the room.</p>
            <input type="text"></input>
            <input type="button" value="Create room!"></input>
        </div>
    );
};

export default CreateRoom;