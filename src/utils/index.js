import axios from 'axios';
import { useState, useCallback, useRef, useEffect } from 'react';

// const url= 'https://unsplash.com/'

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
    return data;
  },
  reqLike: async (token, id) => {
    const url = `https://api.unsplash.com/photos/${id}/like`
    const { data } = await axios.post(
      url,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
    return data;
  },
  reqUnLike: async (token, id) => {
    const url = `https://api.unsplash.com/photos/${id}/like`
    console.log(token)
    const { data } = await axios.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      },
      { id }
      )
    return data;
  },
  getMainImgs: async (page) => {
    const API = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${page}&per_page=20`
    const res = await axios.get(API);
    return res;
  },
  useObserver: ({ 
    target, 
    onIntersect, 
    root = null, 
    rootMargin = '0px',
    threshold = 0.5
  }) => {
    useEffect(() => {
      let observer;
      if(target && target.current) {
        observer = new IntersectionObserver(onIntersect, {
          root,
          rootMargin,
          threshold
        })

        observer.observe(target.current);
      }
      return () => {
        observer && observer.disconnect();
      }

    }, [target, rootMargin, threshold])
  }
}