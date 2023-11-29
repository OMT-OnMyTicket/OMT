import styled from '../../styles/ticketingP_S/time.module.css';
const Time = () => {
  return (
    <>
      <div className={styled.Time_Layout}>
        <div>날짜를 먼저 선택해주세요 !</div>

        <div className={styled.Time_Boxes}>
          <div className={styled.Time_Box}>
            <p className={styled.Time}>11:30</p>
            <div className={styled.Seat}>
              <p className={styled.Out_Seat}>0 </p>
              <p className={styled.Seat_Slash}>/</p>
              <p className={styled.Posible_Seat}>200</p>
            </div>
          </div>
          <div className={styled.Time_Box}>
            <p className={styled.Time}>15:30</p>
            <div className={styled.Seat}>
              <p className={styled.Out_Seat}>9 </p>
              <p className={styled.Seat_Slash}>/</p>
              <p className={styled.Posible_Seat}>200</p>
            </div>
          </div>
          <div className={styled.Time_Box}>
            <p className={styled.Time}>18:30</p>
            <div className={styled.Seat}>
              <p className={styled.Out_Seat}>34 </p>
              <p className={styled.Seat_Slash}>/</p>
              <p className={styled.Posible_Seat}>200</p>
            </div>
          </div>
          <div className={styled.Time_Box}>
            <p className={styled.Time}>21:30</p>
            <div className={styled.Seat}>
              <p className={styled.Out_Seat}>110 </p>
              <p className={styled.Seat_Slash}>/</p>
              <p className={styled.Posible_Seat}>200</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Time;
