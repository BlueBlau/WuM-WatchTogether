import React from 'react';
import style from './createroom.module.css';

//CreateRoom Componente -> ist dafür das, das ein neuer Raum erstellt werden kann
const CreateRoom = () => {

    const userId = localStorage.getItem("userId")

    //Nutzer wird in den neu erzeugten Raum gepackt -> also senden an API und dann folgen des Links auf diese Seite
    async function putUserInNewlyCreatedRoom(roomName){
       await fetch(`https://gruppe2.toni-barth.com/rooms/${roomName}/users`, {
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
    
    //Function, die einen neuen Raum erzeugt und dann Funktion aufruft, die Nutzer in diesen Raum packt
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
            <button className="create-button" onClick={createNewRoom}>
                Create room!
            </button>
        </div>
    );
};

export default CreateRoom;