import React from "react";
import "./HelpPage.css"; // Import your CSS file
import {Link} from "react-router-dom"

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
          <li>Input a UserName.</li>
          <li>When you want to create your own WatchTogetherRoom, click the createRoom button.</li>
          <li>If you want to join a room, just click on it.</li>
        </ul>
      </div>
      <Link to="/WuM-WatchTogether">
        <button className="help-button">Back</button>
      </Link>
    </div>
  );
};

export default HelpPage;