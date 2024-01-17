import React, { useEffect, useState } from 'react';
import styled from '../../../styles/ticketingP_S/map.module.css';
import { useRouter } from 'next/navigation';
import FastTicket from './fastTicket';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LodingModal from './loding';
import GlobalLoding from '@/components/globalloding';
declare const kakao: any;

const KakaoMap: React.FC = () => {
  // const [loading, setLoading] = useState(true);

  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${CLIENT_ID}&autoload=false&libraries=services`;
  const [currentMarker, setCurrentMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  //영화 티켓 데이터
  const [MovieTitle, setMovieTitle] = useState('');
  const [Users, setUsers] = useState('');
  const [Theater, setTheater] = useState('');
  const [Poster, setPoster] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedMovieTitle = localStorage.getItem('영화');
    const storedUsers = localStorage.getItem('인원수');
    const storedTheater = localStorage.getItem('장소');
    const storedPoster = localStorage.getItem('포스터URL');

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
    if (storedMovieTitle) {
      setMovieTitle(storedMovieTitle);
    }

    if (storedUsers) {
      setUsers(storedUsers);
    }

    if (storedTheater) {
      setTheater(storedTheater);
    }

    if (storedPoster) {
      setPoster(storedPoster);
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
        AOS.init();
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
        const ps = new kakao.maps.services.Places();

        // Define a red marker image
        const redMarkerImage = new kakao.maps.MarkerImage(
          '/png/영화관마커.png', // Replace with the path to your red marker image
          new kakao.maps.Size(30, 30), // Set the size of the image
          { offset: new kakao.maps.Point(15, 30) } // Set the offset for the anchor
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

              // Add a click event listener to update the currentMarker state
              kakao.maps.event.addListener(marker, 'click', function () {
                setCurrentMarker(place);
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

  const handleXClick = () => {
    setCurrentMarker(null);
  };
  const handleNextClick = (id: string) => {
    localStorage.setItem('장소', id);
    setModalOpen(true);
  };

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
  // if (loading) {
  //   return (
  //     <>
  //       <GlobalLoding LodingTxt={'영화관 정보를 로드중입니다.'} />
  //     </>
  //   );
  // }

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
        {currentMarker && (
          <div
            className={styled.Theater_Marker}
            data-aos='fade-left'
            data-aos-duration='1000'
            id='Img'
          >
            <div className={styled.close} onClick={handleXClick}>
              x
            </div>

            <div className={styled.Theater_Content}>
              <div className={styled.Theater_Title}>
                {currentMarker.place_name}
              </div>
              <FastTicket
                MovieTitle={MovieTitle}
                Theater={Theater}
                Users={Users}
                posterURL={Poster}
                showCircles={true}
              />
            </div>
            <div
              className={styled.NextBtn}
              onClick={() => handleNextClick(currentMarker.place_name)}
            >
              완료 & 예매하기
            </div>
          </div>
        )}
      </div>
      {modalOpen && <LodingModal setModalOpen={setModalOpen} />}
    </>
  );
};

export default KakaoMap;
