'use client';

import styled from '../../styles/ticketingP_S/pay.module.css';

const Pay = () => {
  const MovieTitle = localStorage.getItem('영화');
  const Users = localStorage.getItem('인원수');
  const ChoicedSeat = localStorage.getItem('선택좌석');
  const Theater = localStorage.getItem('영화관');
  const Charge = Number(Users) * 12000;

  return (
    <div className={styled.Container}>
      <div className={styled.Pay_Coment}>
        영화 관람의 <br /> 마지막 단계
      </div>
      <div className={styled.Boxes}>
        <div className={styled.Ticket_Container}>
          <div className={styled.Ticket_Box_MovieInfo}>
            <img
              src={localStorage.포스터URL}
              className={styled.Ticket_Box_Poster}
            />
            <div className={styled.Circle_Line_T}>
              {[...Array(6)].map((_, index) => (
                <div className={styled.Circle_T} key={index}></div>
              ))}
            </div>
            <div className={styled.Circle_Line_B}>
              {[...Array(6)].map((_, index) => (
                <div className={styled.Circle_B} key={index}></div>
              ))}
            </div>
          </div>
          <div className={styled.Ticket_Box_MovieInfo2}>
            <div className={styled.Original}>Original Ticket</div>
            <div className={styled.Ticket_Info}>
              <div className={styled.Ticket_Info_Title}>
                <div className={styled.Txt_Title}>Title :</div>
                <div className={styled.Txt_Conetent}>{MovieTitle}</div>
              </div>
              <div className={styled.Ticket_Info_Release}>
                <div className={styled.Txt_Title}>Release :</div>
                <div className={styled.Txt_Conetent}>{Theater}</div>
                <div className={styled.Txt_Conetent}>00시 00분</div>
              </div>
              <div className={styled.Ticket_Info_Seat}>
                <div className={styled.Txt_Title}>Seat :</div>
                <div className={styled.Txt_Conetent}>성인 {Users}명</div>
                <div className={styled.Txt_Conetent}>{ChoicedSeat}</div>
              </div>
            </div>
            <div className={styled.OMT}>OMT</div>
            <img
              src={localStorage.포스터URL}
              className={styled.Ticket_Box_Poster2}
            />
            <div className={styled.Circle_Line_T2}>
              {[...Array(6)].map((_, index) => (
                <div className={styled.Circle_T2} key={index}></div>
              ))}
            </div>
            <div className={styled.Circle_Line_B2}>
              {[...Array(6)].map((_, index) => (
                <div className={styled.Circle_B2} key={index}></div>
              ))}
            </div>
          </div>
        </div>

        <div className={styled.Payment}>
          <div className={styled.Payment_Title}>간편결제</div>
          <div className={styled.Charge}>{Charge} 원</div>
          <div className={styled.Payment_Way_Container}>
            <div className={styled.Payment_Way}>
              <img
                src={'/토스페이.png'}
                alt='토스페이'
                className={styled.Payment_Toss}
              />
              <img
                src={'/카카오페이.png'}
                alt='카카오페이'
                className={styled.Payment_KaKao}
              />
              <img
                src={'/네이버페이.png'}
                alt='네이버페이'
                className={styled.Payment_Naver}
              />
            </div>
            <img src={'/캐릭터.png'} className={styled.charactor} />
            <div>
              <div className={styled.Payment_Confirmation}>
                <div>약관동의</div>
                <div>결제하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
