import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const BUSINESS_NUMBER = '918329446654';

  useEffect(() => {
    // Fetch conversations
    fetch('https://whatsapp-web-a88p.onrender.com/api/conversations')
      .then(res => res.json())
      .then(data => setConversations(data))
      .catch(err => console.error('Error fetching conversations:', err));

    // Setup socket connection
    const newSocket = io('https://whatsapp-web-a88p.onrender.com');
    setSocket(newSocket);

    // Listen for new messages
    newSocket.on('newMessage', (message) => {
      if (selectedConversation && message.wa_id === selectedConversation.wa_id) {
        setMessages(prev => {
          // Check if message already exists to avoid duplicates
          if (prev.some(msg => msg.meta_msg_id === message.meta_msg_id)) {
            return prev;
          }
          return [...prev, message];
        });
      }
      
      // Update conversation list
      setConversations(prev => {
        const updated = prev.map(conv => 
          conv.wa_id === message.wa_id 
            ? { ...conv, lastMessage: message.message, lastTimestamp: message.timestamp } 
            : conv
        );
        return updated.sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp));
      });
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Fetch messages for selected conversation
      fetch(`https://whatsapp-web-a88p.onrender.com/api/messages/${selectedConversation.wa_id}`)
        .then(res => res.json())
        .then(data => {
          // Remove duplicates based on meta_msg_id
          const uniqueMessages = data.filter((msg, index, self) =>
            index === self.findIndex(m => m.meta_msg_id === msg.meta_msg_id)
          );
          setMessages(uniqueMessages);
        })
        .catch(err => console.error('Error fetching messages:', err));
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      wa_id: selectedConversation.wa_id,
      name: selectedConversation.name,
      message: messageText,
      timestamp: new Date(),
      status: "sent",
      meta_msg_id: Math.random().toString(36).substr(2, 9),
      direction: "outgoing"
    };

    // Add to UI immediately
    setMessages(prev => [...prev, newMessage]);
    
    // Send to backend
    try {
      const response = await fetch('https://whatsapp-web-a88p.onrender.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      
      if (!response.ok) throw new Error('Failed to send message');
    } catch (err) {
      console.error('Error sending message:', err);
      // Remove from UI on error
      setMessages(prev => prev.filter(msg => msg.meta_msg_id !== newMessage.meta_msg_id));
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await fetch(`https://whatsapp-web-a88p.onrender.com/api/messages/${messageId}`, {
        method: 'DELETE'
      });
      
      // Remove from UI
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        conversations={conversations} 
        onSelectConversation={setSelectedConversation}
        selectedConversation={selectedConversation}
      />
      <ChatArea 
        conversation={selectedConversation} 
        messages={messages}
        onSendMessage={handleSendMessage}
        onDeleteMessage={handleDeleteMessage}
        businessNumber={BUSINESS_NUMBER}
      />
    </div>
  );
}

export default App;