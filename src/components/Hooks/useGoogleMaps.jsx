import { useState, useEffect } from 'react';

const useGoogleMaps = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return isLoaded;
};

export default useGoogleMaps;
