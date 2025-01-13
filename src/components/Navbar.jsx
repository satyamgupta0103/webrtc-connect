import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Mumble App</h1>
      <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md">
        Create Room
      </button>
    </nav>
  );
}

export default Navbar;
