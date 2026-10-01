import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { JagoChatbot } from '../components/common/JagoChatbot';
import { DigiLockerModal } from '../components/common/DigiLockerModal';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <JagoChatbot />
      <DigiLockerModal />
    </div>
  );
};
