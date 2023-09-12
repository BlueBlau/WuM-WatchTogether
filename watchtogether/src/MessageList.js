import React from "react";
import MessageListCSS from "./messagelist.module.css"

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