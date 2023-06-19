import React from 'react';
import { useState } from 'react';

const UserName = () => {
    const [username, setUserName] = useState('None')

    function createUser(){
        let userName = document.getElementById('userNameInput').value;
        setUserName(userName);

        fetch('https://gitlab.hs-anhalt.de/barth_to/watch2gether/users/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName
            })
        }).then(res => {
            return res.json()
        })
        .then(data => console.log(data))
        .catch(error => console.log('ERROR'))
    };

    return(
        <div>
             <p>{username}</p>
             <input type='text' id='userNameInput'></input>
             <input type='Button' value='create User' onClick={createUser}></input>
        </div>
    );
};

export default UserName;