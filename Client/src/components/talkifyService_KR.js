// src/talkifyService.js
import axios from 'axios';

const API_KEY = '55c2712f-856f-43f9-b532-d0049ca07d06';
const BASE_URL = 'https://api.talkify.net/';

const talkifyServiceKR = {
  getSpeechUrl: async (text) => {
    try {
      const response = await axios.post(`${BASE_URL}speech/v1/texttospeech`, {
        text,
        voice: "ko-KR",
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching speech URL:', error);
      return null;
    }
  }
};

export default talkifyServiceKR;
