import { useState, useEffect } from "react"
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
  withCredentials: true
})

function App() {

  const [username, setUserName] = useState('')
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('')
  const [isJoined, setIsJoined] = useState(false);
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('receive_private_message', (data) => {
      setChat((prev) => [...prev, { sender: data.from, text: data.text }])
    })
    return () => {
      socket.off('receive_private_message')
    }
  }, [])

  const joinChat = () => {
    if (username) {
      socket.emit('private_chat', username)
      setIsJoined(true)
    }
  }

  const sendMessage = () => {
    if (message && recipient) {
      socket.emit('send_private_message', {
        to: recipient,
        from: username,
        text: message
      })
      setChat((prev) => [...prev, { sender: username, text: message }])
      setMessage('');
    }
  }
  return (
    <>
      <div>
        {!isJoined && (
          <div>
            <h1>Private Chat</h1>
            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Enter receiver name" />
            <button onClick={joinChat}>Join</button>
          </div>
        )}
      </div>
      {isJoined && (
        <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
          {chat.map((c, i) => (
            <div key={i}>{`${c.sender}: ${c.text}`}</div>
          ))}
          <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter the message..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

    </>
  )
}

export default App
