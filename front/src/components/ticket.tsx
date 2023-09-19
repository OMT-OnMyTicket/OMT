import styled from '../styles/ticket.module.css';

const Ticket = () => {
  return (
    <div className={styled.TicketBox}>
      <div className={styled.Circle_Line_T}>
        <div className={styled.Circle_T}></div>
        <div className={styled.Circle_T}></div>
        <div className={styled.Circle_T}></div>
        <div className={styled.Circle_T}></div>
        <div className={styled.Circle_T}></div>
        <div className={styled.Circle_T}></div>
      </div>
      <div className={styled.Circle_Line_B}>
        <div className={styled.Circle_B}></div>
        <div className={styled.Circle_B}></div>
        <div className={styled.Circle_B}></div>
        <div className={styled.Circle_B}></div>
        <div className={styled.Circle_B}></div>
        <div className={styled.Circle_B}></div>
      </div>
    </div>
  );
};

export default Ticket;
