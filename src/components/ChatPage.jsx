import React from 'react';
import '../styles/ChatPage.css';

const ChatPage = () => {
  return (
    <div className="chat-page">
      <h2>Chat</h2>
      <iframe
        src="https://www.twitch.tv/embed/zmoh/chat?parent=localhost&theme=dark"
        height="600"
        width="400"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default ChatPage;
