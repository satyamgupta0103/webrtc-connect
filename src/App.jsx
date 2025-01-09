import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import ParticipantsList from "./components/ParticipantsList";
import VideoGrid from "./components/VideoGrid";
import HomePage from "./components/HomePage";
import { SocketProvider } from "./Context/SocketProvider";
import RoomPage from "./components/Room";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
