import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8080");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState(null);

  const joinRoom = () => {
    if (room !== "") socket.emit("join_room", { room });
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <br />
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>Message : </h1>
      {messageReceived}
    </div>
  );
}

export default App;
