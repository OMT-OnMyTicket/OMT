import styled from '../../styles/ticketingP_S/success.module.css';

const Success = () => {
  return (
    <div className={styled.Container}>
      <div className={styled.Box}>
        <div className={styled.Box_Top}>
          <div className={styled.Success_Check}>
            <img src={'/check.svg'} />
          </div>
          <div className={styled.Success_ment1}>예매완료</div>
          <div className={styled.Success_ment2}>즐거운 관람 되세요.</div>
        </div>
        <div className={styled.Tickets}>
          <div className={styled.Ticket1}></div>
          <div className={styled.Ticket2}></div>
        </div>
        <div className={styled.Last_Check}>
          <div className={styled.Last_Check_Title}>예매확인</div>
          <div className={styled.Last_Check_Content}>
            <div className={styled.Last_Check_Key}>결제ID</div>
            <div className={styled.Last_Check_Value}></div>
            <div className={styled.Last_Check_Key}>결제수단</div>
            <div className={styled.Last_Check_Value}></div>
            <div className={styled.Last_Check_Key}>결제금액</div>
            <div className={styled.Last_Check_Value}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
