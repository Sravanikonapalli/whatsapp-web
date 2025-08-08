import React, { useState } from 'react';
import { BiSolidSearchAlt2 } from "react-icons/bi";

const Sidebar = ({ conversations, onSelectConversation, selectedConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter out any duplicate conversations
  const uniqueConversations = conversations.filter((conv, index, self) =>
    index === self.findIndex(c => c.wa_id === conv.wa_id)
  );
  
  const filteredConversations = uniqueConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">W</div>
          <div className="user-name">WhatsApp Web</div>
        </div>
        <div className="header-icons">
          <span><BiSolidSearchAlt2 size={25}/></span>
          <span>⋯</span>
        </div>
      </div>
      
      <div className="search-bar">
        <span><BiSolidSearchAlt2 size={25}/></span>
        <input 
          type="text" 
          placeholder="Search or start new chat" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="conversations-list">
        {filteredConversations.map(conversation => (
          <div 
            key={conversation.wa_id}
            className={`conversation-item ${selectedConversation?.wa_id === conversation.wa_id ? 'active' : ''}`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="conversation-avatar">
              {conversation.name.charAt(0)}
            </div>
            <div className="conversation-details">
              <div className="conversation-header">
                <div className="conversation-name">{conversation.name}</div>
                <div className="conversation-time">
                  {conversation.lastTimestamp ? new Date(conversation.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </div>
              </div>
              <div className="conversation-preview">
                {conversation.lastMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;