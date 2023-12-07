import React, { useEffect } from 'react';
import styled from '../../../styles/ticketingP_S/map.module.css';

const Map: React.FC = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_MAP_KEY;
  let map: naver.maps.Map | null = null;

  useEffect(() => {
    if (!CLIENT_ID) {
      console.error('Naver Map API Client ID is missing.');
      return;
    }

    const initMap = () => {
      // 현재 내 위치 정보
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(latitude, longitude),
            zoom: 15
          });

          // Add a marker for the user's current location
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(latitude, longitude),
            map: map
          });
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    };

    // Load Naver Maps API script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}&submodules=geocoder`;
    script.async = true;
    script.onload = initMap;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [CLIENT_ID]);

  const handleCurrentLocation = () => {
    if (map) {
      // Try to get the current location again
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Center the map on the new location
          map!.setCenter(new naver.maps.LatLng(latitude, longitude));
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    }
  };

  return (
    <>
      <div className={styled.Map_Container}>
        <div
          id='map'
          style={{ width: '100%', height: '500px' }}
          className={styled.naverMap}
        >
          <div
            className={styled.current_location}
            onClick={handleCurrentLocation}
          >
            <img src='/png/현재위치.png' alt='Current Location' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
