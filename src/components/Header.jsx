import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold flex items-center">
        <span className="bg-gray-700 p-2 rounded-full mr-3">M</span>
        Mumble
      </h1>
      <button className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded">
        Create Room
      </button>
    </header>
  );
};

export default Header;
