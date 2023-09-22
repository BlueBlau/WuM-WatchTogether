import React from 'react';
import { useState } from 'react';
import './userName.css'; // Import the CSS file

export let UserId;

const UserName = () => {
    const [username, setUserName] = useState('None');
    const [userId, setUserId] = useState('None');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isInputFieldVisible, setInputFieldVisible] = useState(false);
    const [wasUserCreated, setDeleteButton] = useState(true);

    const url = `https://gruppe2.toni-barth.com/users/28`;
    
    //create a User
    function createUser(){
        let userName = document.getElementById('userNameInput').value;
        setUserName(userName);

        fetch('https://gruppe2.toni-barth.com/users/',{
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
                name: userName,
            })
        }).then(res => {
            return res.json()
        })
        .then(data => {setUserId(data.id);
            localStorage.setItem("userId", data.id);})
        .catch(error => console.log('ERROR'))

        localStorage.setItem("userName", userName);
        setIsButtonClicked(true);
        setInputFieldVisible(true);
        setDeleteButton(false);
    };



    //delete a User
    function deleteIt(){
        fetch(url, {
            method:'DELETE'
        }).then((response) => {
            if(response.ok) {
                console.log('User was deleted');
            } else {
                console.log('You`re stupid!');
            }
        }).catch((error) => {
            console.log('Error:', error);
        })

        setUserName('None');
        setUserId('');
        setIsButtonClicked(false);
        setInputFieldVisible(false);

        localStorage.clear();
    };

    return(
        <div className="UserName">
             <p>Username: {username}</p>
             <p>UserId: {userId}</p>
             <input type='text' id='userNameInput' placeholder='Username' disabled={isInputFieldVisible}></input>
             <button onClick={createUser} disabled={isButtonClicked}>create User</button>
             <button onClick={deleteIt} disabled={wasUserCreated}>delete User</button>
        </div>
    );
};

export default UserName;