import StartPage from "./StartPage";
import React from "react";
import  {Route, Routes} from 'react-router-dom';
import RoomPage from "./RoomPage";
import UserName from "./UserName";

function App() {
  return (
    
    <Routes>
      <Route path="/WuM-WatchTogether" element={<StartPage />}/>
      <Route path="/rooms/:roomName" element={<RoomPage />} />
    </Routes>

    );
}

export default App;
