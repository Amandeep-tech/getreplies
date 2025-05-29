import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import CallTable from '../components/CallTable/CallTable';
import { useState } from 'react';
import AddAccountModal from '@/components/AddAccountModal/AddAccountModal';

export default function Home() {
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const handleAddAccountClick = () => {
    console.log('Add Account Clicked');
    setIsAddAccountModalOpen(true);
  }
  
  

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Call" />
        <main className="flex-1 overflow-y-auto p-6 border-radius-lg">
          <CallTable
            handleAddAccountClick={handleAddAccountClick}
          />
        </main>
      </div>
      {isAddAccountModalOpen &&
        <AddAccountModal
          open={isAddAccountModalOpen}
          onOk={() => setIsAddAccountModalOpen(false)}
          onCancel={() => setIsAddAccountModalOpen(false)}
        />}
    </div>
  );
}