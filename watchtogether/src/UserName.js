import React from 'react';
import { useState } from 'react';

const UserName = () => {
    const [username, setUserName] = useState('None')

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
        .then(data => console.log(data))
        .catch(error => console.log('ERROR'))
    };

    //delete a User
    function deleteIt(){
        fetch('https://gruppe2.toni-barth.com/users/7', {
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
    };

    return(
        <div>
             <p>{username}</p>
             <input type='text' id='userNameInput' placeholder='Username'></input>
             <input type='Button' value='create User' onClick={createUser}></input>
             <input type='Button' value='delete all users' onClick={deleteIt}></input>
        </div>
    );
};

export default UserName;