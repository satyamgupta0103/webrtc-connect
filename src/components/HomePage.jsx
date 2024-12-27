import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function HomePage() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      navigate(`/room/${room}`, { state: { name, room } });
    } else {
      alert("Please enter both your name and room name.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="h-screen flex-1 flex items-center justify-center bg-gray-900">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl text-white font-bold mb-4">
            👋 Create or Join Room
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your display name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Room Name
              </label>
              <input
                type="text"
                placeholder="Enter room name..."
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600"
            >
              Go to Room →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
