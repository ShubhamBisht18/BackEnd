// import { use } from "react"
// import { useState, useEffect } from "react"
// import { io } from 'socket.io-client'

// const socket = io('http://localhost:3000')

// function App() {
//   const [mssg, setMssg] = useState("")
//   const [mssgs, setMssgs] = useState([])

//   useEffect(() => {
//     socket.on("receiveMessage", (data) => {
//       setMssgs((prev) => [...prev, data])
//     })
//     return () => {
//       socket.off("receiveMessage")
//     }
//   }, [])

//   const sendMessage = () => {
//     if (mssg.trim()) {

//     } socket.emit("sendMessage", mssg);
//     setMssg("");
//   }

//   return (
//     <>
//       <h1>Chat Web Two Person</h1>
//       <div>
//         {mssgs.map((m, i) => {
//           <div key={i}>{m}</div>
//         })}
//       </div>

//       <div>
//         <input type="text" value={mssg}
//           onChange={(e) => setMssg(e.target.value)} placeholder="Type a message..." />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//     </>
//   )
// }

// export default App

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [mssg, setMssg] = useState("");
  const [mssgs, setMssgs] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMssgs((prev) => [...prev, data]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (mssg.trim()) {
      socket.emit("sendMessage", mssg);
      setMssg("");
    }
  };

  return (
    <>
      <h1>Chat Web Two Person</h1>
      <div>
        {mssgs.map((m, i) => (
          <div key={i}>{m}</div>
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
