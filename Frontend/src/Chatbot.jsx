import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function Chatbot() {
  const hasSentActivityCheck = useRef(false);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI assistant. How can I help today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    axios
      .get('http://127.0.0.1:8000/', { params: { message: input } })
      .then(res => {
        typeAiMessage(res.data.message);
      })
      .catch(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'ai', text: 'Oops! Something went wrong, please try again.' },
        ]);
        setIsTyping(false);
      });
  };

  const typeAiMessage = (fullText) => {
    let index = 0;
    let currentText = '';
    const typingSpeed = 5; // milliseconds per character

    const type = () => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setMessages(prev => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.sender === 'ai-temp') {
            updated[updated.length - 1].text = currentText;
          } else {
            updated.push({ sender: 'ai-temp', text: currentText });
          }
          return updated;
        });
        index++;
        setTimeout(type, typingSpeed);
      } else {
        // Replace temp with final AI message
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'ai', text: fullText };
          return updated;
        });
        setIsTyping(false);
      }
    };

    type();
  };

  const handleKey = e => {
    if (e.key === 'Enter') sendMessage();
  };

  const styles = `
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .chat-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 10px;
    }
    .chat-header {
      padding: 20px;
      background: #1e1e2f;
      color: white;
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      border-radius: 10px 10px 0 0;
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
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      position: relative;
      display: flex;
      align-items: left;
    }
    .ai-bubble {
      align-self: flex-start;
      background-color: #fff;
      color: #333;
      text-align: left;
    }
    .user-bubble {
      align-self: flex-end;
      background-color: #007bff;
      color: white;
    }
    .bubble-icon {
      margin-right: 8px;
      font-size: 20px;
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
      background: rgba(255, 255, 255, 0.7);
      border-top: 1px solid #ddd;
      border-radius: 0 0 10px 10px;
      backdrop-filter: blur(10px);
    }
    .input-section input {
      flex: 1;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease-in-out;
      background: rgba(255, 255, 255, 0.9);
    }
    .input-section input:focus {
      border-color: #007bff;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    }
    .input-section button {
      background-color: #007bff;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-in-out;
    }
    .input-section button:hover {
      background-color: #0069d9;
    }
    .input-section button:active {
      background-color: #005cbf;
    }
    .reset-button {
      position: absolute;
      top: 10px;
      right: 20px;
      background: #ff6347;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .reset-button:hover {
      background-color: #e55347;
    }
  `;

  // console.log()

 
if (messages.length > 10 && !hasSentActivityCheck.current) {
  hasSentActivityCheck.current = true; // set flag to true so it won't send again

  const lastFiveUserMessages = messages
    .filter(msg => msg.sender === 'user')
    .slice(-5)
    .map(msg => msg.text)
    .join('\n');

  console.log('Sending last 5 user messages:', lastFiveUserMessages);

  axios
    .get('http://127.0.0.1:8000/checkactivities', {
      params: {
        messages: lastFiveUserMessages,
        id: JSON.parse(sessionStorage.getItem("userdetails")).id
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
  }
 
  return (
    <>
      <style>{styles}</style>
      <center>
        <div className="chat-container" style={{ width: '800px' }}>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`bubble ${(msg.sender === 'ai' || msg.sender === 'ai-temp') ? 'ai-bubble' : 'user-bubble'}`}>
                <div className="bubble-icon">
                  {msg.sender === 'ai' || msg.sender === 'ai-temp' ? <FaRobot /> : <FaUser />}
                </div>
                <div>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
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
  );
}

export default Chatbot;
