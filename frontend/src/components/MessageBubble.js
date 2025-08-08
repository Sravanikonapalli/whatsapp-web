import React, { useState } from 'react';
import { FaTrash, FaCheck, FaCheckDouble } from 'react-icons/fa';

const MessageBubble = ({ message, businessNumber, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <FaCheck className="status-icon sent" />;
      case 'delivered':
        return <FaCheckDouble className="status-icon delivered" />;
      case 'read':
        return <FaCheckDouble className="status-icon read" />;
      default:
        return null;
    }
  };
  
  // Determine if this is our own message
  const isOwn = message.direction === "outgoing" || message.wa_id === businessNumber;
  
  return (
    <div 
      className={`message-bubble ${isOwn ? 'own' : ''}`}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="message-content">
        {message.message}
      </div>
      <div className="message-meta">
        <span className="message-time">{formatTime(message.timestamp)}</span>
        {isOwn && getStatusIcon(message.status)}
        {isOwn && showDelete && (
          <button 
            className="delete-button" 
            onClick={() => onDelete(message._id)}
            title="Delete message"
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;