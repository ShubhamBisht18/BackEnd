import React, { useState, useEffect } from "react";
import socket from "./socket";

function App() {
  const [username, setUsername] = useState("");
  const [toUser, setToUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receivePrivateMessage", ({ from, message }) => {
      setChat((prev) => [...prev, `From ${from}: ${message}`]);
    });

    return () => socket.off("receivePrivateMessage");
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit("join", username);
    }
  };

  const sendMessage = () => {
    if (toUser.trim() && message.trim()) {
      socket.emit("privateMessage", { to: toUser, message });
      setChat((prev) => [...prev, `To ${toUser}: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Private Chat</h2>

      <input
        placeholder="Your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={joinChat}>Join</button>

      <hr />

      <input
        placeholder="Send to username"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Messages:</h3>
        {chat.map((c, i) => (
          <p key={i}>{c}</p>
        ))}
      </div>
    </div>
  )
}

export default App
