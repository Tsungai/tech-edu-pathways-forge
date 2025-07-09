
import { useState, useEffect } from 'react';

interface LocationData {
  country: string;
  currency: string;
  loading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    country: 'ZA', // Default to South Africa
    currency: 'ZAR',
    loading: true,
    error: null
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Try to get user's location using IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        console.log('Geolocation data:', data);
        
        if (data.country_code) {
          setLocationData({
            country: data.country_code,
            currency: data.country_code === 'ZW' ? 'USD' : 'ZAR',
            loading: false,
            error: null
          });
        } else {
          throw new Error('Unable to determine location');
        }
      } catch (error) {
        console.error('Geolocation error:', error);
        // Default to South Africa if geolocation fails
        setLocationData({
          country: 'ZA',
          currency: 'ZAR',
          loading: false,
          error: 'Unable to determine location'
        });
      }
    };

    getLocation();
  }, []);

  return locationData;
};
