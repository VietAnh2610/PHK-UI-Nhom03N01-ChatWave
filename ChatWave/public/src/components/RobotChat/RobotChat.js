import React, { useState } from 'react';
import './RobotChat.scss';
import { CloseOutlined } from '@ant-design/icons';
import chatBotIcon from '../../assets/Chatbot.png';
import axios from 'axios';

const RobotChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-icon">
          <img src={chatBotIcon} alt="Chatbot Icon" />
        </div>
        <div className="close-icon" onClick={onClose}>
          <CloseOutlined />
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Bạn có câu hỏi thắc mắc nào không?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-button" onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}

export default RobotChat;
