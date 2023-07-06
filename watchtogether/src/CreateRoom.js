import React from 'react';
import style from './createroom.module.css';

const CreateRoom = () => {
    
    function createNewRoom(){
       fetch('https://gruppe2.toni-barth.com/rooms/', {
            method: 'POST',
        }).then(res => {
            return res.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log('ERROR'));
    }

    return(
        <div className={style.mainContainer}>
            <input type="button" value="Create room!" onClick={createNewRoom}></input>
        </div>
    );
};

export default CreateRoom;