import StartPage from "./StartPage";
import React from "react";
import  {Route, Routes} from 'react-router-dom';
import RoomPage from "./RoomPage";
import UserName from "./UserName";
import HelpPage from "./HelpPage.";

function App() {
  return (
    
    <Routes>
      <Route path="/WuM-WatchTogether" element={<StartPage />}/>
      <Route path="/rooms/:roomName" element={<RoomPage />} />
      <Route path="/help" element={<HelpPage/>} />
    </Routes>

    );
}

export default App;
