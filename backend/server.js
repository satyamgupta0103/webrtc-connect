import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const nameToSocketIdMap = new Map();
const socketIdToNameMap = new Map();
const roomParticipants = new Map(); // Map to store participants for each room

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  socket.on("room:join", (data) => {
    //console.log(data);
    const { name, room } = data;
    nameToSocketIdMap.set(name, socket.id);
    socketIdToNameMap.set(socket.id, name);

    // Manage participants in the room
    if (!roomParticipants.has(room)) {
      roomParticipants.set(room, new Map());
    }
    roomParticipants.get(room).set(socket.id, name);
    //console.log(roomParticipants);

    //const serializedParticipantsMap = [...roomParticipants.entries()];

    const serializedParticipantsArray = Array.from(
      roomParticipants.values()
    ).flatMap((participantsMap) =>
      Array.from(participantsMap.entries()).map(([id, name]) => ({ id, name }))
    );

    console.log(serializedParticipantsArray);

    // Notify everyone in the room about the new participant
    io.to(room).emit("room:participants", serializedParticipantsArray);

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
