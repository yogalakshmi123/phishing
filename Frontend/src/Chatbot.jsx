import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { FaPaperPlane } from 'react-icons/fa'

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
    setInput('')
    setIsTyping(true)

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

  const handleKey = e => {
    if (e.key === 'Enter') sendMessage()
  }

  const styles = `
    body {
      margin: 0;
      padding: 0;
    }
    .chat-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f5f5f5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .chat-header {
      padding: 20px;
      background: #1e1e2f;
      color: white;
      font-size: 20px;
      text-align: center;
      font-weight: bold;
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .bubble {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 16px;
      word-wrap: break-word;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .ai-bubble {
      align-self: flex-start;
      background-color: white;
      color: #333;
    }
    .user-bubble {
      align-self: flex-end;
      background-color: #007bff;
      color: white;
    }
    .typing-dots {
      display: flex;
      gap: 6px;
      align-self: flex-start;
      margin-left: 4px;
    }
    .typing-dot {
      width: 8px;
      height: 8px;
      background-color: #aaa;
      border-radius: 50%;
      animation: blink 1.4s infinite;
    }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0.3 }
      40% { opacity: 1 }
    }
    .input-section {
      display: flex;
      padding: 16px;
      gap: 10px;
      background: white;
      border-top: 1px solid #ddd;
    }
    .input-section input {
      flex: 1;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 16px;
      outline: none;
    }
    .input-section button {
      background-color: #007bff;
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .input-section button:hover {
      background-color: #0069d9;
    }
      
  `

  

  if(messages.length > 5){

    const chatHistory = messages.map(msg => `${msg.sender}: ${msg.text}`).join("\n");
    const loginUrl = 'http://localhost:8000/checkactivities';

    axios.get(loginUrl, {
      params: {
        id: sessionStorage.getItem("userid"),
        messages: chatHistory,
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Login failed:', error);
       
      });

console.log(chatHistory);

  }





  return (
    <>
      <style>{styles}</style>
      <center>
        <div className="chat-container" style={{width:"800px"}}>
        {/* <div className="chat-header" >Welcome</div> */}
        <div className="chat-messages" >
          {messages.map((msg, i) => (
            <div key={i} className={`bubble ${msg.sender === 'ai' ? 'ai-bubble' : 'user-bubble'}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
      </center>
    </>
  )
}

export default Chatbot
