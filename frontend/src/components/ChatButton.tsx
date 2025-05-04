// src/components/ChatButton.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../redux/hooks/hooks';
import io from 'socket.io-client';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{sender: string; message: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const { user, token } = useAppSelector((state) => state.auth);
  const initializedRef = useRef(false);

  // Connect to WebSocket when component mounts and user is authenticated
  useEffect(() => {
    if (!user || !token || initializedRef.current) return;

    initializedRef.current = true;

    // Initialize socket connection
    socketRef.current = io('ws://localhost:8000', {
      auth: { token },
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket');
      addSystemMessage('Connected to premium support');
    });

    socketRef.current.on('receive_message', (data: {sender: string; message: string}) => {
      addMessage(data.sender, data.message);
    });

    socketRef.current.on('disconnect', () => {
      addSystemMessage('Disconnected from chat');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        initializedRef.current = false;
      }
    };
  }, [user, token]);

  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [...prev, { sender, message }]);
    scrollToBottom();
  };

  const addSystemMessage = (message: string) => {
    setMessages((prev) => [...prev, { sender: 'system', message }]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !socketRef.current) return;
    console.log("✅ Sending message:", inputMessage); // debug
    const message = inputMessage.trim();
    addMessage('user', message);
    socketRef.current.emit('send_message', { message });
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-xl flex items-center justify-center ${
          isOpen ? 'bg-red-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
        } text-white transition-all duration-300`}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-8 z-40 w-96 h-[32rem] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Chatbot Support</h3>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Start chatting with our support team</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : msg.sender === 'system'
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Our premium support team is here to help you 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;