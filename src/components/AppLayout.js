// src/components/AppLayout.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Weather from '../pages/Weather/Weather';
import News from '../pages/News/News';
import Chat from '../pages/Chat/Chat';
import About from '../pages/About/About';
import UserCenter from '../pages/UserCenter/UserCenter';

function AppLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/news/*" element={<News />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/about" element={<About />} />
      <Route path="/user" element={<UserCenter />} />
    </Routes>
  );
}

export default AppLayout;