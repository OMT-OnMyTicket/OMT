import styled from '../../styles/ticketingP_S/main.module.css';
import Link from 'next/link';

const TicketingMain = () => {
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
          <div className={styled.Left_Box}>
            <div className={styled.Box_Title}>
              빠른예매
              <img className={styled.arrow} src={'/ticketing_arrow.svg'} />
            </div>
            <p className={styled.Box_Txt}>
              자주가는 극장과 결제수단이
              <br />
              등록되어 있다면 <br />
              빠르고 간편하게 예매가 가능합니다.
            </p>
          </div>
          <Link href='/ticketing/direct'>
            <div className={styled.Right_Box}>
              <div className={styled.Box_Title}>
                직접예매
                <img className={styled.arrow} src={'/ticketing_arrow.svg'} />
              </div>
              <p className={styled.Box_Txt}>
                일반적인 예매방식과
                <br />
                비슷하게 <br />
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
