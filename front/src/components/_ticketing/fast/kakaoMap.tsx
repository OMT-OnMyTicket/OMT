import React, { useEffect, useState } from 'react';
import styled from '../../../styles/ticketingP_S/map.module.css';
import Script from 'next/script';
declare const kakao: any;

const KakaoMap: React.FC = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${CLIENT_ID}&autoload=false&libraries=services`;

  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);
  const [currentMarker, setCurrentMarker] = useState<any>(null);

  useEffect(() => {
    // 현재 위치 가져오기
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
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
          ),
          level: 5
        };

        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
        const ps = new kakao.maps.services.Places();

        // Define a red marker image
        const redMarkerImage = new kakao.maps.MarkerImage(
          '/png/영화관마커.png',
          new kakao.maps.Size(30, 30),
          { offset: new kakao.maps.Point(15, 30) }
        );

        // Function to add markers with the red marker image
        const addMarkers = (data: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            data.forEach((place: any) => {
              const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(place.y, place.x),
                map: mapInstance,
                title: place.place_name,
                image: redMarkerImage
              });

              // Register a click event on the marker
              kakao.maps.event.addListener(marker, 'click', function () {
                // Update the currentMarker state
                setCurrentMarker(place);

                // Create and set content for the infowindow
                const infowindowContent = `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`;
                infowindow.setContent(infowindowContent);

                // Open the infowindow at the marker's position
                infowindow.open(map, marker);
              });
            });
          }
        };

        ps.keywordSearch('CGV', addMarkers);
        ps.keywordSearch('메가박스', addMarkers);
        ps.keywordSearch('롯데시네마', addMarkers);

        // Add marker for current location
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

  useEffect(() => {
    // Initialize the infowindow
    if (map) {
      const infowindowInstance = new kakao.maps.InfoWindow({
        zIndex: 1
      });

      setInfowindow(infowindowInstance);

      // Close the infowindow when the map is clicked
      kakao.maps.event.addListener(map, 'click', function () {
        infowindowInstance.close();
      });
    }
  }, [map]);

  const handleCurrentLocation = () => {
    if (map && marker) {
      map.panTo(
        new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng)
      );

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
