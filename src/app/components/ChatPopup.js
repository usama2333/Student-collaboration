'use client';

import '../styles/chat.css';
import { useEffect, useRef, useState } from 'react';
import { getSocket } from '@/app/utils/socket';
import { FaTimes, FaPaperclip } from 'react-icons/fa';
import axios from 'axios';
import getMessagesApi from '@/app/api/getMessagesApi';
import DeletePopup from './DeletePopup';

export default function ChatPopup({ user, onClose, userData }) {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const socket = getSocket();
  //   const userData = JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.auth.token = localStorage.getItem('token');
    socket.connect();

    const fetchMessages = async () => {
      try {

        const response = await getMessagesApi(user._id);
        setMessages(response?.data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('private_message', (msg) => {
      const isRelevant =
        (msg.sender === user._id && msg.recipients.includes(userData.id)) ||
        (msg.sender === userData.id && msg.recipients.includes(user._id));
      if (isRelevant) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off('private_message');
    };
  }, [user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDeleteMessage = async (messageId) => {
    console.log(messageId, 'Message id..............')
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/messages/${messageId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Emit to notify others (optional if you want live updates)
      socket.emit('delete_message', { messageId, recipientId: user._id });

      setMessages(prev => prev.filter(msg => msg._id !== messageId));
      setShowDeletePopup(false);
      setSelectedMessageId(null);
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  useEffect(() => {
    socket.on('message_deleted', ({ messageId }) => {
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
    });

    return () => {
      socket.off('message_deleted');
    };
  }, []);


  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    let fileUrl = '';
    let type = 'text';

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/api/chat/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          },
        });
        // Reset progress after success
        setUploadProgress(0);
        fileUrl = response.data.fileUrl;
        type = file.type.startsWith('image/')
          ? 'image'
          : file.type.startsWith('audio/')
            ? 'audio'
            : 'file';
      } catch (error) {
        setUploadProgress(0);
        console.error('File upload failed:', error);
        return;
      }
    }

    const msg = {
      recipientId: user._id,
      content: input,
      type,
      fileUrl,
    };

    socket.emit('private_message', msg);

    setMessages((prev = []) => [
      ...prev,
      {
        ...msg,
        sender: userData.id,
        recipients: [user._id],
        createdAt: new Date().toISOString(),
      },
    ]);


    setInput('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <span>Chat with {user.name}</span>
        <FaTimes onClick={onClose} style={{ cursor: 'pointer' }} />
      </div>

      <div className="chat-messages">
        {messages && userData && messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-bubble ${msg.sender === userData.id ? 'sent' : 'received'
              }`}
            onClick={() => {
              setSelectedMessageId(msg._id);
              setShowDeletePopup(true);
            }}
          >
            {msg.type === 'text' && <p>{msg.content}</p>}

            {msg.type === 'image' && (
              <img src={msg.fileUrl} alt="attachment" className="chat-image" />
            )}

            {msg.type === 'audio' && (
              <audio controls src={msg.fileUrl} className="chat-audio" />
            )}

            {msg.type === 'file' && (
              <a href={msg.fileUrl} download className="chat-file">
                Download File
              </a>
            )}

            <span className="message-time">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <label htmlFor="fileInput">
          <FaPaperclip className="chat-icon" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {uploadProgress > 0 && (
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
        <button onClick={sendMessage}>Send</button>
      </div>
      {showDeletePopup && (
        <DeletePopup
        selectedMessageId={selectedMessageId}
        handleDeleteMessage={handleDeleteMessage}
        setShowDeletePopup={setShowDeletePopup}
      />

      )}

    </div>
  );
}
