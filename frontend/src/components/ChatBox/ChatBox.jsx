import React, { useState } from 'react';
import './ChatBox.css';
import { GrSend } from "react-icons/gr";
import { IoChatbubbleEllipses } from "react-icons/io5";
function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
  
    const newMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setLoading(true);
  
    const fallback = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: "👋 Hi, we're contacting you soon. Please wait..." }
      ]);
      setLoading(false);
    }, 5000);
  
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
  
      clearTimeout(fallback);
      if (!response.ok) throw new Error("Server error");
  
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (err) {
      clearTimeout(fallback); // ensure fallback doesn't trigger later
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: " Could not reach server. Try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="chat-toggle-button" onClick={toggleChat}>
        {open ? '✖' : <IoChatbubbleEllipses className="chat-icon" />}
      </div>

      {open && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && <div className="chat-message bot">⏳ Typing...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder="Ask something..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                  }
                 }}
            />
            <button onClick={sendMessage}><GrSend/></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
