import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import ParticipantsList from "./components/ParticipantsList";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <ParticipantsList participants={["Satyam", "Sumit"]} />
    </>
  );
}

export default App;
