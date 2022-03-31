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
      return data;
    }
  },
  useInfiniteScroll(targetEl) {
    const observerRef = useRef(null);
    const [intersecting, setIntersecting] = useState(false);

    const getObserver = useCallback(() => {
      if(!observerRef.current) {
        observerRef.current = new IntersectionObserver(entries => setIntersecting(entries.some(entry => entry.isIntersecting)));
      } 
      return observerRef.current
    }, [observerRef.current]);

    useEffect(() => {
      if(targetEl.current) getObserver().observe(targetEl.current);

      return () => {
        getObserver().disconnect();
      }
    }, [targetEl.current])

    return intersecting;
  } 
}