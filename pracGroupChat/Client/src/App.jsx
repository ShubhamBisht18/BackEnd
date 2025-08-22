import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

const socket = io("http://localhost:3000", { withCredentials: true })

function App() {
  const [groupName, setGroupName] = useState('')
  const [username, setUserName] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState([])

  // Listen for notifications and messages
  useEffect(() => {
    socket.on('group_notification', (data) => {
      setChats(prev => [...prev, { system: true, text: data.text }])
    })

    socket.on('receive_group_message', (data) => {
      setChats(prev => [...prev, { sender: data.sender, text: data.text }])
    })

    return () => {
      socket.off('group_notification')
      socket.off('receive_group_message')
    }
  }, [])

  // Join group
  const joinGroup = () => {
    if (username && groupName) {
      socket.emit('join_group', { groupName, userName: username })
      setIsJoined(true)
    }
  }

  // leave group
  const leaveGroup = () => {
    if (groupName.trim()) {
      socket.emit('leave_group', { groupName })  // only send groupName
      setIsJoined(false)
      setChats([])
      setGroupName('')
    }
  }


  // Send message
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_group_message', { groupName, text: message })
      setMessage('')
    }
  }

  return (
    <div className="App">
      {!isJoined ? (
        <div>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={joinGroup}>Join</button>
        </div>
      ) : (
        <div>
          <h3>Group: {groupName}</h3>
          <div className="chat-window" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
            {chats.map((chat, idx) => (
              <div key={idx} style={{ color: chat.system ? 'gray' : 'black' }}>
                {chat.system ? chat.text : <b>{chat.sender}:</b>}{!chat.system && ` ${chat.text}`}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
          <button
            onClick={leaveGroup}
            style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
          >
            Leave Group
          </button>
        </div>
      )}
    </div>
  )
}

export default App
