import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { FaUserCircle, FaRobot, FaPaperPlane } from 'react-icons/fa'

function Chatbot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI assistant. How can I help today?" }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput(''); setIsTyping(true)

    axios.get("http://127.0.0.1:8000/", { params: { message: input } })
      .then(res => {
        setMessages(prev => [...prev, { sender: 'ai', text: res.data.message }])
      })
      .catch(() => {
        setMessages(prev => [...prev, {
          sender: 'ai',
          text: "Oops! Something went wrong, please try again."
        }])
      })
      .finally(() => setIsTyping(false))
  }

  const handleKey = e => { if (e.key === 'Enter') sendMessage() }

  const styles = `
    body { margin:0; padding:0; }
    .chat-container {
      height:100vh; display:flex; flex-direction:column;
      background:rgb(211, 212, 224); color:white; font-family:sans-serif;
    }
    .chat-header {
      padding:16px; border-bottom:1px solidrgb(29, 29, 31);
      text-align:center; font-size:18px; font-weight:600;
    }
    .chat-messages {
      flex:1; overflow-y:auto; padding:16px; display:flex;
      flex-direction:column; gap:12px;
    }
    .bubble {
      max-width:80%; padding:12px;
      border-radius:12px; position:relative;
      word-wrap:break-word;
    }
    .ai-bubble {
      align-self:flex-start; background:#444654;
    }
    .user-bubble {
      align-self:flex-end; background:#10a37f; color:white;
    }
    .bubble:before {
      content:'';
      position:absolute; width:0; height:0;
    }
    .ai-bubble:before {
      top:8px; left:-8px;
      border-right:8px solidrgb(231, 232, 240);
      border-top:8px solid transparent;
      border-bottom:8px solid transparent;
    }
    .user-bubble:before {
      top:8px; right:-8px;
      border-left:8px solid #10a37f;
      border-top:8px solid transparent;
      border-bottom:8px solid transparent;
    }
    .message-row { display:flex; align-items:flex-end; gap:8px; }
    .avatar { font-size:24px; margin-top:4px; color:#adbac7; }
    .typing-dots {
      display:flex; gap:4px;
      align-self:flex-start;
    }
    .typing-dot {
      width:8px; height:8px;
      background:#adb0b8; border-radius:50%;
      animation: blink 1.4s infinite;
    }
    @keyframes blink {
      0%,80%,100% { opacity:0.2 }
      40% { opacity:1 }
    }
    .input-section {
      display:flex; padding:16px; gap:12px;
      border-top:1px solid #4b4b56;
    }
    .input-section input {
      flex:1; padding:12px; border-radius:8px;
      border:none; background:#454654; color:white;
      outline:none;
    }
    .input-section button {
      background:#10a37f; border:none; padding:0 16px;
      border-radius:8px; color:white; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
    }
    .input-section button:hover {
      background:#0e8c6d;
    }
  `

  return (
    <>
      <style>{styles}</style>
      <div className="chat-container">
        <div className="chat-header">Welcome</div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className="message-row">
              {msg.sender==='ai' && <FaRobot className="avatar" />}
              <div className={`bubble ${msg.sender==='ai' ? 'ai-bubble' : 'user-bubble'}`}>
                {msg.text}
              </div>
              {msg.sender==='user' && <FaUserCircle className="avatar" />}
            </div>
          ))}
          {isTyping && (
            <div className="message-row">
              <FaRobot className="avatar" />
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey} />
          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  )
}

export default Chatbot
