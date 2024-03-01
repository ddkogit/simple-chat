import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const socket = io.connect("http://localhost:3001");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId !== "") {
      socket.emit("join_room", roomId);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", {
      message,
      roomId,
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <div>
        <input
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="enter room id"
        />
        <button onClick={joinRoom}>Verify</button>
      </div>
      <form>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </form>
      <h1>{messageReceived}</h1>
    </>
  );
}

export default App;
