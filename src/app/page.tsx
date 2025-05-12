'use client';

import ChatSidebar from './components/ChatSidebar';

const mockChatHistory = [
  {
    id: '1',
    title: 'Project Discussion',
    timestamp: '2h ago',
    isActive: true,
  },
  {
    id: '2',
    title: 'Marketing Campaign',
    timestamp: '1d ago',
  },
  {
    id: '3',
    title: 'Product Roadmap',
    timestamp: '3d ago',
  },
  {
    id: '4',
    title: 'Customer Feedback',
    timestamp: '1w ago',
  },
  {
    id: '5',
    title: 'Team Meeting',
    timestamp: '2w ago',
  },
];

export default function Home() {
  const handleChatSelect = (id: string) => {
    console.log(`Selected chat: ${id}`);
  };

  return (
    <main className="flex h-screen bg-gray-100">
      <ChatSidebar 
        companyName="Lokam.ai" 
        chatHistory={mockChatHistory} 
        onChatSelect={handleChatSelect} 
      />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Lokam.ai Chat Interface</h1>
          <p className="text-gray-600">Select a chat from the sidebar or create a new one</p>
        </div>
      </div>
    </main>
  );
}
