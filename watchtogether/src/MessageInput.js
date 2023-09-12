import React from "react";
import { useState } from "react";

let currentMessage = 0;

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

    function getMessage(){

        fetch(url, {
            method: "GET",
        }).then((response) => {
            if(response.ok){
                console.log("Message request succsessfull")
                return response.json();

            } else {
                console.log("Fehler")
            }
        }).then((data) =>{
            if(currentMessage < data.messages.length){
                console.log(currentMessage)
                console.log(data.messages.length)
                whenSended(data.messages[data.messages.length - 1].text)
                currentMessage = data.messages.length
                console.log(currentMessage)
                console.log(data.messages.length)
             }
        }).catch((error) => {
            console.log("Fehler:", error)
        })
    }


    return(
        <div>
            <input type="text" value={messageText} onChange={handleInputChange} placeholder="Write a message"></input>
            <input type="button" value="Send" onClick={sendMessage}></input>
            <input type="button" value="Get" onClick={getMessage}></input>
        </div>
    );
};

export default MessageInput;