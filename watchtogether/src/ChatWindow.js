import React from "react";
import { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

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