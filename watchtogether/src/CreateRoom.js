import React from 'react';
import style from './createroom.module.css';



const CreateRoom = () => {

    const userId = localStorage.getItem("userId")

    function putUserInNewlyCreatedRoom(roomName){
        fetch(`https://gruppe2.toni-barth.com/rooms/${roomName}/users`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: userId
            })
        }).then((response) => {
            if(response.ok){
                console.log('User joined successful.')
                window.location.href = `/rooms/${roomName}`;
            } else {
                console.log('Fehler')
            }
        }).catch((error) => {
            console.log('Error:', error)
        })
    }
    
    function createNewRoom(){
       fetch('https://gruppe2.toni-barth.com/rooms/', {
            method: 'POST',
        }).then(res => {
            return res.json()
        })
        .then(data => {
            const newRoom = data.name
            console.log(newRoom)
            putUserInNewlyCreatedRoom(newRoom)
        })
        .catch(error => console.log('ERROR'));
    }


    return(
        <div className={style.mainContainer}>
            <input type="button" value="Create room!" onClick={createNewRoom}></input>
        </div>
    );
};

export default CreateRoom;