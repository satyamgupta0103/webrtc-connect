export default (socket, io) => {
  try {
    console.log("Client connected:", socket.id);

    socket.on("code", (data) => {
      socket.broadcast.emit("code", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  } catch (ex) {
    console.log("Socket error", ex.message);
  }
};
