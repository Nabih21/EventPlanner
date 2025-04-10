

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState('');

  // Get username from localStorage (fallback to Anonymous)
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.name || 'Anonymous';

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    if (e.key === 'Enter' && input.trim() !== '' && socket) {
      socket.emit('sendMessage', {
        message: input.trim(),
        sender: username,
        senderId: socketId,
      });
      setInput('');
    }
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setSocketId(newSocket.id);
    });

    newSocket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <div
        onClick={handleToggle}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#007bff',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '25px',
          cursor: 'pointer',
          zIndex: 999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}
      >
        💬
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            width: '300px',
            height: '400px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#007bff',
              color: 'white',
              padding: '10px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              fontWeight: 'bold',
            }}
          >
            Live Chat
          </div>

          <div
            style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              fontSize: '14px',
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                {msg.senderId === socketId ? 'You' : msg.sender}: {msg.message}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSend}
            style={{
              border: 'none',
              borderTop: '1px solid #ccc',
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>
      )}
    </>
  );
};

export default LiveChat;
