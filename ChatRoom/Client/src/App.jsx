// App.jsx
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true
});

function App() {
  const [username, setUsername] = useState("");
  const [groupName, setGroupName] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("group_notification", (data) => {
      setChat((prev) => [...prev, { system: true, text: data.text }]);
    });

    socket.on("receive_group_message", (data) => {
      setChat((prev) => [...prev, { sender: data.sender, text: data.text }]);
    });

    return () => {
      socket.off("group_notification");
      socket.off("receive_group_message");
    };
  }, []);

  const joinGroup = () => {
    if (username && groupName) {
      socket.emit("join_group", { groupName, userName: username });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_group_message", {
        groupName,
        userName: username,
        text: message
      });
      setMessage("");
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <h2>Join Group</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button onClick={joinGroup}>Join</button>
        </div>
      ) : (
        <div>
          <h2>Group: {groupName}</h2>
          <div style={{ border: "1px solid black", height: "200px", overflowY: "scroll", padding: "5px" }}>
             {chat.map((c, i) => (
              <div key={i}>
                {c.system ? (
                  <i>{c.text}</i>
                ) : (
                  <>
                    <b>{c.sender}: </b> {c.text}
                  </>
                )}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;


// import {useState, useEffect} from 'react'
// import {io} from 'socket.io-client'
// const socket = io("http://localhost:3000", {
//   withCredentials: true
// });


// function App(){

//   const [chat, setChat] = useState([])   // ✅ should be array
//   const [joined, setJoined] = useState(false) // ✅ should be boolean
//   const [username, setUserName] = useState('')
//   const [groupname, setGroupName] = useState('')
//   useEffect(()=>{
    
//     socket.on('receive_group_message',(data)=>{
//       setChat((prev) => [...prev,{sender: data.sender, text: data.text}])
//     })
//     return () => {
//       socket.off("receive_group_message");
//     };
//   },[])

//   const joinGroup = () => {
//     if (username && groupname) {   // ✅ correct condition
//       socket.emit('join_group', { groupname, username })  // ✅ use correct variables
//       setJoined(true)
//     }
//   }
//   return(
//      <div>
//       {!joined ? (
//         <div>
//           <h1>Chat Group</h1>
//           <input 
//             type="text" 
//             value={username}
//             onChange={(e) => setUserName(e.target.value)} 
//             placeholder='Enter the username' 
//           />
//           <input 
//             type="text" 
//             value={groupname}
//             onChange={(e) => setGroupName(e.target.value)} 
//             placeholder='Enter the groupname' 
//           />
//           <button onClick={joinGroup}>Join</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Group: {groupname}</h2>
//           {chat.map((c, i) => (
//             <div key={i}>
//               <b>{c.sender}:</b> {c.text}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default App