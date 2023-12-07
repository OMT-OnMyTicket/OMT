import React, { useEffect, useState } from 'react';
import styled from '../../../styles/ticketingP_S/map.module.css';
import Script from 'next/script';

const KakaoMap: React.FC = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const KAKAO_SDK_URL = `"//dapi.kakao.com/v2/maps/sdk.js?appkey=${CLIENT_ID}&libraries=services,clusterer"`;

  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const kakao = (window as any).kakao;

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  useEffect(() => {
    // Load Kakao Map SDK
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Kakao Map API
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
          ),
          level: 3
        };

        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);

        // Add Marker
        const markerInstance = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
          )
        });

        markerInstance.setMap(mapInstance);
        setMarker(markerInstance);
      });
    };
  }, [currentLocation]);

  const handleCurrentLocation = () => {
    if (map && marker) {
      // Move the map to the current location
      map.panTo(
        new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
      );

      // Move the marker to the current location
      marker.setPosition(
        new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
      );
    }
  };

  return (
    <>
      <div className={styled.Map_Container}>
        <div
          id='map'
          style={{ width: '100%', height: '500px' }}
          className={styled.kakaoMap}
        ></div>
        <div
          className={styled.current_location}
          onClick={handleCurrentLocation}
        >
          <img src='/png/현재위치.png' alt='Current Location' />
        </div>
      </div>
    </>
  );
};

export default KakaoMap;
