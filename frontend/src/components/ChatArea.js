import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { IoChatboxEllipsesOutline, IoSendSharp } from "react-icons/io5";
import { CgGirl } from "react-icons/cg";
import { BiSolidSearchAlt2, BiSolidSmile } from "react-icons/bi";

const ChatArea = ({ conversation, messages, onSendMessage, onDeleteMessage, businessNumber }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  if (!conversation) {
    return (
      <div className="chat-area-placeholder">
        <div className="placeholder-icon">
          <IoChatboxEllipsesOutline />
        </div>
        <div className="placeholder-text">Select a conversation to start chatting</div>
      </div>
    );
  }
  
  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-avatar">
          {conversation.type === 'group' ? (
            <div className="group-avatar">
              <CgGirl />
            </div>
          ) : (
            <div className="user-avatar">
              {conversation.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="chat-info">
          <div className="chat-name">
            {conversation.name}
            {conversation.type === 'group' && <span className="group-indicator"> (Group)</span>}
          </div>
          <div className="chat-status">
            {conversation.type === 'group' ? 'Ravi, Neha and You' : 'Online'}
          </div>
        </div>
        <div className="chat-icons">
          <BiSolidSearchAlt2 className="search-icon" />
          <span className="more-options">⋯</span>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.map(msg => (
          <MessageBubble 
            key={msg._id} 
            message={msg} 
            businessNumber={businessNumber}
            onDelete={onDeleteMessage}
            isGroup={conversation.type === 'group'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="message-input-container">
        <form onSubmit={handleSubmit} className="message-form">
          <BiSolidSmile className="emoji-picker" />
          <input
            type="text"
            className="message-input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            <IoSendSharp />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;