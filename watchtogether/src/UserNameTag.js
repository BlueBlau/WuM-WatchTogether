import React from "react";
import {useState, useEffect} from 'react';


//Compontente, die den Nutzer auf der Raumseite darstellt (seinen Namen und seine ID)
const UserNameTag = () => {
    const [userName, setUserName] = useState('None');
    const [userId, setUserId] = useState('None');

    let UserId = localStorage.getItem("userId");
    let UserName = localStorage.getItem("userName");

    useEffect(()=>{
		setUserName(UserName);
        setUserId(UserId);
	}, []);

    return(
    <div>
        <p>UserName: {userName}</p>
        <p>UserId: {userId}</p>
    </div>
    );
};

export default UserNameTag;