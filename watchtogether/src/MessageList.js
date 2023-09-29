import React from "react";
import MessageListCSS from "./messagelist.module.css"

//Componente, die die Nachrichten eines Chats darstellt
const MessageList = ({messages}) => {
    
    return(
        <ul className={MessageListCSS.MessageWindow} >
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
    )
}

export default MessageList;