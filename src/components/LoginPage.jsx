import React from 'react';
import { getAuthUrl } from '../api/twitchApi.js';
import '../styles/LoginPage.css'; // Importing the CSS file

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <div className="login-page">
      <div className="floating-elements"></div> {/* Floating elements */}
      <div className="content">
        
        <img src="/logo.png" alt="zMoh Logo" />
        <div className="typewriter">
          <h1 style={{ fontSize: "5rem", fontFamily: "'Silkscreen', Pacifico" }}> Welcome to zMoh's Twitch Dashboard </h1>
        </div> 
        <button onClick={handleLogin}>Login with Twitch</button>
      </div>
    </div>
  );
};

export default LoginPage;
