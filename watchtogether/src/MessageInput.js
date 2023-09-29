import React from "react";
import { useState } from "react";

let currentMessage = 0;

//Componente, die den MessageInput verarbeitet
const MessageInput = ({whenSended}) => {
    const userId = localStorage.getItem("userId")
    const [messageText, setMessageText] = useState("");
    const currentUrl = window.location.href;

    const findRoomName = currentUrl.match(/\/rooms\/([^/]+)$/);
    const roomName = findRoomName[1]

    const url = `https://gruppe2.toni-barth.com/rooms/${roomName}/chat`;

    function handleInputChange(event){
        setMessageText(event.target.value)
    }

    //nimmt den Input einer ChatNachricht entgegen und sendet diese an die API -> dabei wird überprüft, ob das Inputfeld leer ist (is das der Fall, passoert nichts)
    function sendMessage(){
        if(messageText.trim() !== ""){
            
            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user": userId,
                    "message": messageText
                })
            }).then((response)=> {
                if(response.ok){
                    console.log("Message was successfully send")
                    setMessageText("")
                }else{
                    console.log("Message could not be sended")
                }
            }).catch((error) => {
                console.log("Fehler:", error)
            }) 
            
        }
    }

  


    return(
        <div>
            <input type="text" value={messageText} onChange={handleInputChange} placeholder="Write a message"></input>
            <input type="button" value="Send" onClick={sendMessage}></input>
        </div>
    );
};

export default MessageInput;