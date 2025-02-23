import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import CallPage from "./components/CallPage/CallPage";
import HomePage from "./components/HomePage/HomePage";
import NoMatch from "./components/NoMatch/NoMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<CallPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
