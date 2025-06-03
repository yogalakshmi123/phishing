import { useState, useRef, useEffect } from 'react'
import axios from "axios";
import './App.css'

function Chatbot(){

    const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    axios.get("http://127.0.0.1:8000/", {
      params: { message: input }
    })
    .then((res) => {
      console.log(res)
      setMessages(prev => [...prev, { text: res.data.message + input   + " " + res.data.reason, sender: 'ai' }]);
    })
    .catch((err) => {
      console.log(err);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: 'ai' 
      }]);
    })
    .finally(() => {
      setIsTyping(false);
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h1>AI CHAT</h1>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="message ai typing">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className="input-container">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}


export default Chatbot
