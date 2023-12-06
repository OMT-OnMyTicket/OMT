'use client';

import styled from '../../styles/ticketingP_S/main.module.css';
import Link from 'next/link';

const TicketingMain = () => {
  const handleTicketingWay = (id: string) => {
    localStorage.setItem('예매방법', id);
  };

  return (
    <>
      <div className={styled.Container}>
        <div className={styled.Main_Layout}>
          <div className={styled.Main_Title}>On My Ticket만의 예매방식</div>
          <p className={styled.Main_Txt}>
            예매방식을 두 가지로 나누어 사용자 편의에 집중했습니다.
          </p>
        </div>

        <div className={styled.Box_Container}>
          <Link href='/ticketing/choice'>
            <div
              className={styled.Left_Box}
              onClick={() => handleTicketingWay('빠른예매')}
            >
              <div className={styled.Box_Title}>
                빠른예매
                <img className={styled.arrow} src={'/ticketing_arrow.svg'} />
              </div>
              <p className={styled.Box_Txt}>
                가장 가까운 시간과
                <br />
                가장자리 좌석이 <br />
                자동으로 선택되어 <br />
                빠르고 간편하게 예매가 가능합니다.
              </p>
            </div>
          </Link>
          <Link href='/ticketing/direct'>
            <div
              className={styled.Right_Box}
              onClick={() => handleTicketingWay('직접예매')}
            >
              <div className={styled.Box_Title}>
                직접예매
                <img className={styled.arrow} src={'/ticketing_arrow.svg'} />
              </div>
              <p className={styled.Box_Txt}>
                일반적인 예매방식과
                <br />
                마찬가지로 <br />
                모든 것을 선택할 수 있습니다.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default TicketingMain;
