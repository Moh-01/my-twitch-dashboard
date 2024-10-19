import axios from 'axios';

const CLIENT_ID = 'joornkn6six0ohi98jdd540ihrn046';
const REDIRECT_URI = 'http://localhost:3000';
//const SCOPES = 'user:read:email user:edit chat:read channel:manage:broadcast channel:read:redemptions channel:manage:redemptions';
const SCOPES = 'channel:read:redemptions channel:manage:redemptions user:read:email user:edit chat:read channel:manage:broadcast';

export const getAuthUrl = () => {
  return `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${encodeURIComponent(SCOPES)}`;
};

export const api = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});


// Function to set the authorization token and Client ID in headers
export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  api.defaults.headers.common['Client-ID'] = CLIENT_ID;
  api.defaults.headers.common['Content-Type'] = 'application/json';
};