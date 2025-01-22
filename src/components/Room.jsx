import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "../Context/SocketProvider";
import peer from "../service/peer";
import ReactPlayer from "react-player";
import Navbar from "./Navbar";
import { FcVideoCall } from "react-icons/fc";
import ParticipantsList from "./ParticipantsList";

function RoomPage() {
  // Socket instance
  const socket = useSocket();

  // State management
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [participants, setParticipants] = useState(["Dennis", "Tim"]);

  /**
   * Handle when a user joins the room.
   * @param {Object} param0 - Contains the user's name and ID.
   */
  const handleUserJoined = useCallback(({ name, id }) => {
    console.log(`Name ${name} joined room ${id}`);
    setRemoteSocketId(id);
  }, []);

  /**
   * Initiates a call to the remote user.
   */
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  /**
   * Handles incoming calls and sets up media streams.
   * @param {Object} param0 - Contains the caller's ID and the offer.
   */
  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  /**
   * Sends local media tracks to the peer connection.
   */
  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  /**
   * Handles when a call is accepted by the remote user.
   * @param {Object} param0 - Contains the caller's ID and the answer.
   */
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted");
      sendStreams();
    },
    [sendStreams]
  );

  /**
   * Handles negotiation needed event for incoming offer.
   * @param {Object} param0 - Contains the caller's ID and the offer.
   */
  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  /**
   * Handles the final negotiation step with the answer.
   * @param {Object} param0 - Contains the answer for the negotiation.
   */
  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    console.log("nego:needed", ans);
    await peer.setLocalDescription(ans);
  }, []);

  /**
   * Sets up the remote stream when a track is received.
   */
  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStreams = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStreams[0]);
    });
  }, []);

  /**
   * Initiates negotiation when needed.
   */
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  /**
   * Sets up event listeners for negotiation.
   */
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  /**
   * Sets up socket event listeners and cleans up on component unmount.
   */
  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      //cleanup or de-register
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content layout */}
      <div className="flex flex-grow">
        {/* Sidebar for Participants */}
        <ParticipantsList participants={participants} />

        {/* Main content area */}
        <div className="flex-grow bg-gray-900 text-white p-4">
          <h1>Welcome to Room</h1>
          <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>

          {remoteSocketId && (
            <button onClick={handleCallUser}>
              <svg
                className="h-8 w-8 text-green-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 7a2 2 0 0 1 2 2" />
                <path d="M15 3a6 6 0 0 1 6 6" />
              </svg>
            </button>
          )}
          {myStream && <button onClick={sendStreams}>Send Stream</button>}
          {myStream && (
            <>
              <h1>My Stream</h1>
              <ReactPlayer
                playing
                muted
                height="100px"
                width="200px"
                url={myStream}
              />
            </>
          )}
          {remoteStream && (
            <>
              <h1>Remote Stream</h1>
              <ReactPlayer
                playing
                muted
                height="100px"
                width="200px"
                url={remoteStream}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
