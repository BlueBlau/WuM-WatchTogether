import React from "react";
import "./HelpPage.css"; // Import your CSS file
import {Link} from "react-router-dom"

//Diese Componente stellt die Hilfeseite dar und gibt einen kleinen Einblick, was zutun ist.
const HelpPage = () => {
  return (
    <div className="help-page">
      <div className="header">
        <h1>HelpPage</h1>
      </div>

      <div className="content">
        <h2>How to get started:</h2>
        <p>Welcome to WatchTogether. When you want to use our service, please follow these steps:</p>
        <ul>
          <li>Step 1: Input a UserName. Thats really important. Otherwise the service won´t work.</li>
          <li>Step 2: Click on a room name in the room list to join (sometimes you have to click the link twice, when in the room) or room or create your own room.</li>
          <li>Step 3: When you want to create your own room just click the button below the room list.</li>
          <li>Step 4: In a room you can input a YouTube Url in the input box. This video is send to all users in this room.</li>
          <li>Step 5: To play or pause the video just click the play or pause button in the video. If you want to skip to another point in the video us the position bar.</li>
          <li>Step 6: In the chat you can chat with other users. Just input a message in the input field and click the send button.</li>
          <li>Step 7: If you want to leave a room please click the leave room button.</li>
          <li>Step 8: Have fun.</li>
        </ul>
        <p>This project was created under the auspices of Toni Barth</p>
      </div>
      <Link to="/WuM-WatchTogether">
        <button className="help-button">Back</button>
      </Link>
    </div>
  );
};

export default HelpPage;