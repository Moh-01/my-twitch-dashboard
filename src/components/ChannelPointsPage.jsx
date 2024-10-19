import React, { useState, useEffect } from 'react';
import { api } from '../api/twitchApi.js';
import '../styles/ChannelPointsPage.css';

const ChannelPointsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const userResponse = await api.get('/users');
        const userId = userResponse.data.data[0].id;

        const response = await api.get('/channel_points/custom_rewards', {
          params: {
            broadcaster_id: userId,
            // Remove only_manageable_rewards parameter for now
          },
        });
        setRewards(response.data.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load channel point rewards.');
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  if (loading) {
    return <div className="channel-points-managments"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="channel-points-managments"><p>{error}</p></div>;
  }

  if (!rewards || rewards.length === 0) {
    return <div className="channel-points-managments"><p>No channel point rewards found.</p></div>;
  }

const toggleReward = async (rewardId, isPaused) => {
  try {
    // Fetch broadcaster (user) ID - you can hardcode this if you already know it
    const userResponse = await api.get('/helix/users?login=YOUR_TWITCH_USERNAME');
    const userId = userResponse.data.data[0].id;

    // Correct API endpoint and header setup for pausing/unpausing rewards
    await api.patch('/helix/channel_points/custom_rewards', 
      { is_paused: !isPaused },  // Toggling the paused state
      {
        params: {
          broadcaster_id: userId,   // Broadcaster ID
          id: rewardId,             // Reward ID
        },
        headers: {
          'Authorization': `Bearer ge0hk4urorgtl9690a3vsv3mrqzl4s`,
          'Client-Id': 'joornkn6six0ohi98jdd540ihrn046',   // The app's client ID
        }
      }
    );

    // Update state to reflect the change
    setRewards((prevRewards) =>
      prevRewards.map((reward) =>
        reward.id === rewardId ? { ...reward, is_paused: !isPaused } : reward
      )
    );
  } catch (error) {
    console.error('Error response:', error.response ? error.response.data : error.message);
    alert(`Failed to update reward status: ${error.response.data.message || error.message}`);
  }
};

  return (
    <div className="channel-points-managments">
      <h1 style={{ fontSize: "5rem" }}> <center> Channel Points </center> </h1>
      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div key={reward.id} className="reward-box">
            <h3>{reward.title}</h3>
            <button onClick={() => toggleReward(reward.id, reward.is_paused)}>
              {reward.is_paused ? 'Unpause' : 'Pause'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPointsPage;
