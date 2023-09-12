import React from "react";
import { useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const ChatWindow = () => {

    const [messages, setMessages] = useState([]);

    function handleWhenSended(message){
        setMessages([...messages, message])

    }

    return(
        <div>
            <MessageList messages = {messages}></MessageList>
            <MessageInput whenSended = {handleWhenSended}></MessageInput>
        </div>
    );
};

export default ChatWindow;