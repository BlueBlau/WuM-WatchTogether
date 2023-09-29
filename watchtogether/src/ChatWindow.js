import React from "react";
import { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

//ChatWindow Componente -> setzt sich zusammen aus einer MessageList COmponente und einer Input Componente für die Nachrichten
const ChatWindow = () => {

    const currentUrl = window.location.href;

    const findRoomName = currentUrl.match(/\/rooms\/([^/]+)$/);
    const roomName = findRoomName[1]

    const url = `https://gruppe2.toni-barth.com/rooms/${roomName}/chat`;

    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(0);

    function handleWhenSended(message){
        setMessages([...messages, message])

    }

    //Funktion, die mitHilfe eines Get-Requests Nachrichten abruft (die neusten ChatNachrichten)
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
                const newMessages = data.messages.slice(currentMessage);
                newMessages.forEach((message) => {
                    handleWhenSended(message.text)
                });
                setCurrentMessage(data.messages.length)
             }
        }).catch((error) => {
            console.log("Fehler:", error)
        })
    }

    //bei Änderung wir der getMessageBefehl im Intervall von 5 Sekunden ausgeführt
    useEffect(()=> {
        const interval = setInterval(getMessage, 5000)
        return () => clearInterval(interval);
    });

    return(
        <div>
            <MessageList messages = {messages}></MessageList>
            <MessageInput whenSended = {handleWhenSended}></MessageInput>
        </div>
    );
};

export default ChatWindow;