import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const nameToSocketIdMap = new Map();
const socketIdToNameMap = new Map();
const participantsArray = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);

  //receiver
  socket.on("room:join", (data) => {
    const { name, room } = data;
    socket.join(room);

    nameToSocketIdMap.set(name, socket.id);
    socketIdToNameMap.set(socket.id, name);

    if (!participantsArray.has(room)) {
      console.log("There is no room with named:", room);
      participantsArray.set(room, []);
    }

    // Add participant to the room
    participantsArray.get(room).push({ id: socket.id, name: name });
    console.log(participantsArray);

    // Confirm to the user that they joined
    io.to(socket.id).emit("room:join", data);

    // Notify only the participants of this room
    console.log("Participants are", participantsArray.get(room));
    const participants = participantsArray.get(room);

    io.to(room).emit("room:participants", participants);
    io.to(room).emit("user:joined", { name, id: socket.id });

    // Send the updated participants list **only to the newly joined user**
    //io.to(socket.id).emit("room:participants", participants);
  });

  socket.on("disconnect", () => {
    for (const [room, participants] of participantsArray.entries()) {
      const index = participants.findIndex((user) => user.id === socket.id);
      if (index !== -1) {
        participants.splice(index, 1);

        // Notify updated participant list
        io.to(room).emit("room:participants", participants);

        // Remove room if empty
        if (participants.length === 0) {
          participantsArray.delete(room);
        }
        break;
      }
    }
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
