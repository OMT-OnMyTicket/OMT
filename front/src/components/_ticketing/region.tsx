import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;

const region = () => {
  const cinema = localStorage.getItem('영화관');

  const handleRegion = (region: string) => {
    axios
      .get(`${URL}/api/v1/theaters/region/cinema`, {
        params: {
          region,
          cinema: cinema
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div id='서울' onClick={() => handleRegion('서울')}>
        서울
      </div>
      <div id='경기/인천' onClick={() => handleRegion('경기/인천')}>
        경기/인천
      </div>
    </div>
  );
};
export default region;
