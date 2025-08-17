import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [mssg, setMssg] = useState("");
  const [mssgs, setMssgs] = useState([]);
  const [myId, setMyId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setMyId(socket.id);
      console.log("Connected with ID:", socket.id);
    });

    socket.on("receiveMessage", (data) => {
      setMssgs((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
    };
  }, []);

  const sendMessage = () => {
    if (mssg.trim()) {
      const msgData = {
        text: mssg,
        senderId: socket.id
      };
      socket.emit("sendMessage", msgData);
      setMssg("");
    }
  };

  return (
    <>
      <h1>Chat Web Two Person</h1>
      <div>
        {mssgs.map((m, i) => (
          <div
            key={i}
            style={{
              backgroundColor: m.senderId === myId ? "lightgreen" : "lightblue",
              padding: "5px 10px",
              margin: "5px 0",
              borderRadius: "5px",
              maxWidth: "400px"
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={mssg}
          onChange={(e) => setMssg(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
