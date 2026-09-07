import { useState, useEffect } from 'react';
import { dummyItems } from '../utils/dummyData';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Stage 2: Simulate backend fetch using dummy data
        if (url === '/api/items') {
          // Simulate network latency
          await new Promise(resolve => setTimeout(resolve, 1000));
          setData(dummyItems);
          setLoading(false);
          return;
        }

        // Real fetch implementation for future stages
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message || 'Something went wrong');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
