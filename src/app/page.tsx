'use client';

import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatInterface from './components/ChatInterface';

const mockChatHistory = [
  {
    id: '1',
    title: 'About Lokam AI',
    timestamp: '2h ago',
    isActive: true,
  },
  {
    id: '2',
    title: 'AI Solutions',
    timestamp: '1d ago',
  },
  {
    id: '3',
    title: 'Our Process',
    timestamp: '3d ago',
  },
  {
    id: '4',
    title: 'Featured Projects',
    timestamp: '1w ago',
  },
  {
    id: '5',
    title: 'Our Team',
    timestamp: '2w ago',
  },
];

const mockMessages = [
  {
    id: '1',
    sender: 'user' as const,
    content: 'Tell me about Lokam AI and what you offer',
    timestamp: '02:12 am',
  },
  {
    id: '2',
    sender: 'assistant' as const,
    content: '🌍 **Lokam AI** is an AI consulting company helping mid-sized businesses unlock growth and efficiency using custom, secure, and production-grade AI solutions. We transform businesses with intelligent AI solutions, simplifying your journey from data to AI.\n\n**Who We Are**\nWe bridge industry, culture, and innovation — from intelligent agents to automated workflows — to drive real business value. Our team of experts helps businesses leverage AI technologies to solve complex problems and create new opportunities.\n\n**What We Offer**\n1. **Data Strategy** – We help you turn your data into a business advantage by identifying valuable insights and opportunities.\n2. **Custom AI Development** – Our team builds AI solutions tailored specifically to your business needs and challenges.\n3. **AI Consulting** – We provide expert guidance on GenAI adoption, helping you navigate the complex AI landscape.\n4. **AI Workflow Automation** – Our solutions help you save time and cut costs by automating repetitive tasks.\n5. **AI Agent Development** – We create smart agents that make intelligent decisions to improve your business processes.\n\nOur approach focuses on delivering practical, measurable results that drive business growth and efficiency. We work closely with you to understand your unique challenges and develop solutions that address your specific needs.',
    timestamp: '1.2s',
  },
];

export default function Home() {
  const [messages, setMessages] = useState(mockMessages);
  const [activeChat, setActiveChat] = useState('1');

  const handleChatSelect = (id: string) => {
    console.log(`Selected chat: ${id}`);
    setActiveChat(id);
  };

  const handleSendMessage = (content: string) => {
    const newUserMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user' as const,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newUserMessage]);
    
    setTimeout(() => {
      const newAssistantMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant' as const,
        content: '**Our Process**\n1. **Identify Use Cases** – We start by spotting high-impact opportunities where AI can make a significant difference in your business.\n2. **Design Custom Solutions** – We blueprint AI solutions to fit your specific vision and business requirements.\n3. **Develop & Train** – Our team builds robust, scalable systems trained on your data to deliver accurate results.\n4. **Implement** – We seamlessly integrate our solutions into your existing technology stack.\n5. **Support** – We provide continuous improvements and value tracking to ensure ongoing success.\n\n**Featured Projects**\n🛍️ **E-commerce Shopping Assistant** – Conversational AI for online shopping\n📣 **AI Social Media Agent** – Predictive content planning & automation\n📄 **Invoice Automation** – Extract, validate, and process invoices with AI',
        timestamp: '0.5s',
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
    }, 1500);
  };

  return (
    <main className="flex h-screen bg-[#1a1a1a]">
      <ChatSidebar 
        companyName="Lokam.ai" 
        chatHistory={mockChatHistory} 
        onChatSelect={handleChatSelect} 
      />
      <div className="flex-1 border-l border-gray-700">
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
        />
      </div>
    </main>
  );
}
