// import React, { useCallback, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import { useSocket } from "../Context/SocketProvider";

// function HomePage() {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const navigate = useNavigate();

//   const socket = useSocket();

//   //
//   const handleSubmitForm = useCallback(
//     (e) => {
//       //Prevent form to submit automatically
//       e.preventDefault();

//       //console.log(socket);
//       socket.emit("room:join", { name, room });
//     },
//     [name, room, socket]
//   );

//   const handleJoinRoom = useCallback(
//     (data) => {
//       const { name, room } = data;
//       //console.log(name, room);
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     socket.on("room:join", handleJoinRoom);
//     return () => {
//       //de-register a listener
//       socket.off("room:join", handleJoinRoom);
//     };
//   }, [socket, handleJoinRoom]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div className="h-screen flex-1 flex items-center justify-center bg-gray-900">
//         <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
//           <h1 className="text-2xl text-white font-bold mb-4">
//             👋 Create or Join Room
//           </h1>
//           <form onSubmit={handleSubmitForm} className="space-y-4">
//             <div>
//               <label className="block text-gray-300 text-sm mb-2">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your display name..."
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300 text-sm mb-2">
//                 Room Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter room name..."
//                 value={room}
//                 onChange={(e) => setRoom(e.target.value)}
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600"
//             >
//               Go to Room →
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// import React, { useCallback, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { useSocket } from "../Context/SocketProvider";

// function HomePage() {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const navigate = useNavigate();
//   const socket = useSocket();

//   const handleSubmitForm = useCallback(
//     (e) => {
//       e.preventDefault();
//       socket.emit("room:join", { name, room });
//     },
//     [name, room, socket]
//   );

//   const handleJoinRoom = useCallback(
//     (data) => {
//       const { room } = data;
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     socket.on("room:join", handleJoinRoom);
//     return () => {
//       socket.off("room:join", handleJoinRoom);
//     };
//   }, [socket, handleJoinRoom]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 flex items-center justify-center bg-gray-900">
//         <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
//           <h1 className="text-2xl text-white font-bold mb-4">
//             👋 Create or Join Room
//           </h1>
//           <form onSubmit={handleSubmitForm} className="space-y-4">
//             <div>
//               <label className="block text-gray-300 text-sm mb-2">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your display name..."
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300 text-sm mb-2">
//                 Room Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter room name..."
//                 value={room}
//                 onChange={(e) => setRoom(e.target.value)}
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600"
//             >
//               Go to Room →
//             </button>
//           </form>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default HomePage;

import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSocket } from "../Context/SocketProvider";

function HomePage() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { name, room });
    },
    [name, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative flex-1">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1666625102659-12565c311855?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHZpZGVvJTIwY2FsbCUyMG1lZXRpbmdzfGVufDB8fDB8fHww')",
          }}
        ></div>

        {/* Overlay for dark effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>

        {/* Form Section */}
        <div
          className="relative z-10 flex items-center justify-center min-h-full"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="p-6 bg-gray-800 bg-opacity-60 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl text-white font-bold mb-4">
              👋 Create or Join Room
            </h1>
            <form onSubmit={handleSubmitForm} className="space-y-4">
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
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
