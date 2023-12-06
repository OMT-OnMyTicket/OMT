import styled from '../../../styles/ticketingP_S/map.module.css';

const Map = () => {
  const CLIENT_ID = process.env.NAVER_MAP_CLIENT_ID;

  return (
    <>
      <div className={styled.Map_Container}>
        <div>map</div>
        <script
          type='text/javascript'
          src='https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=jlhfr029e2'
        ></script>
      </div>
    </>
  );
};

export default Map;
