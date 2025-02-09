import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const nameToSocketIdMap = new Map();
const socketIdToNameMap = new Map();
let participantsArray = [];

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  socket.on("room:join", (data) => {
    //console.log(data);
    const { name, room } = data;
    nameToSocketIdMap.set(name, socket.id);
    socketIdToNameMap.set(socket.id, name);

    // Add a participant to the array
    participantsArray.push({ room: room, id: socket.id, name: name });
    console.log(participantsArray);

    //Emit the array directly to the room
    io.to(room).emit(
      "room:participants",
      participantsArray.filter((p) => p.room === room)
    );

    io.to(room).emit("user:joined", { name, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
