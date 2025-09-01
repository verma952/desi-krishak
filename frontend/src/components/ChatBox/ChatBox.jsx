// src/components/ChatBox/ChatBox.jsx - Refactored

import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';
import { GrSend } from "react-icons/gr";
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;

// Store static text for easy language switching
const translations = {
  en: {
    welcome: "Hello! How can I help you today? Ask about products, how to sell, or anything else.",
    placeholder: "Ask something...",
    typing: "Typing...",
    error: "Sorry, I'm having trouble connecting. Please try again later."
  },
  hi: {
    welcome: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? आप उत्पादों के बारे में, बेचने के तरीके, या कुछ और पूछ सकते हैं।",
    placeholder: "कुछ पूछें...",
    typing: "लिख रहा है...",
    error: "क्षमा करें, मुझे कनेक्ट करने में समस्या आ रही है। कृपया बाद में पुनः प्रयास करें।"
  }
};

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null); // Ref for auto-scrolling

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Set the initial welcome message when the chat opens
  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'bot', content: translations[language].welcome }]);
    } else {
      setMessages([]); // Clear messages when chat is closed
    }
  }, [isOpen, language]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ✅ Send the user's message AND selected language to the backend
        body: JSON.stringify({ message: userInput, language: language })
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { role: 'bot', content: translations[language].error };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chat-toggle-button" onClick={toggleChat}>
        {isOpen ? <IoClose /> : <IoChatbubbleEllipsesOutline />}
      </div>

      {isOpen && (
        <div className="chatbot-container">
          {/* --- Chat Header --- */}
          <div className="chat-header">
            <div className="header-title">
              <h4>DesiKrishak Support</h4>
              <span>सहायता</span>
            </div>
            <div className="language-toggle">
              <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>English</button>
              <button onClick={() => setLanguage('hi')} className={language === 'hi' ? 'active' : ''}>हिंदी</button>
            </div>
          </div>

          {/* --- Messages Window --- */}
          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-message bot typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={chatEndRef} /> {/* Anchor for auto-scrolling */}
          </div>

          {/* --- Input Area --- */}
          <div className="chat-input-area">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              placeholder={translations[language].placeholder}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={loading} aria-label="Send Message">
              <GrSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;