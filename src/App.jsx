import React, { useEffect, useState } from 'react';
import { setAuthToken } from './api/twitchApi';
import LoginPage from './components/LoginPage';
import StreamManagementPage from './components/StreamManagementPage';
import ChatPage from './components/ChatPage';
import ChannelPointsPage from './components/ChannelPointsPage';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token is in URL
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        setToken(accessToken);
        setAuthToken(accessToken);
        alert(accessToken);
        window.history.replaceState(null, null, ' ');
      }
    }
  }, []);

  if (!token) {
    return <LoginPage/>;
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/stream" element={<StreamManagementPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/channel-points-managments" element={<ChannelPointsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
