// src/components/Layout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from './ChatBox/ChatBox';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet will render the specific page component for the current route */}
        <Outlet />
      </main>
      <ChatBot />
      <Footer />
    </>
  );
};

export default Layout;