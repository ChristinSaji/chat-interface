import React, { useState, useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPaperPlane, faPaperclip);

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const formatBoldText = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export default function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setIsLoading(true);
      onSendMessage(inputMessage);
      setInputMessage('');
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div key={chatContainerId} className="flex flex-col h-full bg-[#121212]" suppressHydrationWarning>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#2a2a2a] text-gray-100'
              }`}
            >
              <div 
                className="text-sm whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: formatBoldText(message.content) }}
              />
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-[#2a2a2a]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700 bg-[#121212]">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-grow flex items-center bg-[#2a2a2a] rounded-full pr-2">
            <button 
              type="button" 
              className="p-2 text-gray-400 hover:text-gray-300"
              aria-label="Attach file"
            >
              <FontAwesomeIcon icon={faPaperclip} className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Lokam AI's services and solutions..."
              className="flex-grow px-2 py-2 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
} 