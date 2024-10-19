import React, { useState, useEffect } from 'react';
import { api } from '../api/twitchApi.js';
import '../styles/StreamManagementPage.css';

const StreamManagementPage = () => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    // Fetch current stream info
    const fetchStreamInfo = async () => {
      try {
        const userResponse = await api.get('/users');
        const userId = userResponse.data.data[0].id;

        const response = await api.get('/channels', { params: { broadcaster_id: userId } });
        const channel = response.data.data[0];
        setTitle(channel.title);
        setCategoryId(channel.game_id);
        setCategoryName(channel.game_name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStreamInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      const userResponse = await api.get('/users');
      const userId = userResponse.data.data[0].id;

      await api.patch('/channels', null, {
        params: {
          broadcaster_id: userId,
          title,
          game_id: categoryId,
        },
      });
      alert('Stream info updated!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySearch = async (e) => {
    const query = e.target.value;
    setCategoryName(query);
    if (query.length > 2) {
      try {
        const response = await api.get('/search/categories', { params: { query } });
        if (response.data.data.length > 0) {
          setCategoryId(response.data.data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="stream-management-page">
      <h2>Stream Management</h2>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        <input value={categoryName} onChange={handleCategorySearch} />
      </div>
      <button onClick={handleUpdate}>Update Stream Info</button>
    </div>
  );
};

export default StreamManagementPage;
