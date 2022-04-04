import axios from 'axios';
import { useState, useCallback, useRef, useEffect } from 'react';

export default {
  keywordSearch(data) {
    const { results } = data;
    const arr = [];
    results.forEach(item => {
      arr.push({
        id: item.id,
        liked_by_user: item.liked_by_user,
        likes: item.likes,
        url: item.urls.thumb,
        user: item.user
      })
    })
    return arr;
  },
  async getAccessToken(code) {
    const url = `https://unsplash.com/oauth/token`
    const res = await axios.post(url, 
      {
        client_id: `${process.env.REACT_APP_ACCESS_KEY}`,
        client_secret: `${process.env.REACT_APP_SECRET_KEY}`,
        redirect_uri: `${process.env.NODE_ENV ==='development' ? 'http://localhost:3000' : 'https://best-gallery.vercel.app'}`,
        code: `${code}`,
        grant_type: 'authorization_code'
      }
    )
    if(res) {
      const data = res.data;
      // console.log(data)
      return data;
    }
  },
  getUserInfo: async (token) => {
    const { data } = await axios.get(
      `https://api.unsplash.com/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        // withCredentials: true
      }
    );
    // console.log(data);
    return data;
  } 
}