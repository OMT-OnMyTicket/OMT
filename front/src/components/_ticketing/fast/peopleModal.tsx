import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '../../../styles/ticketingP_S/peopleModal.module.css';
interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const PeopleModal = ({ setModalOpen }: PropsType) => {
  const [count, setcount] = useState(1);
  const router = useRouter();
  const closeModal = () => {
    setModalOpen(false);
  };
  // 모달 외부 클릭시 끄기 기능
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event?: MouseEvent) => {
      if (event) {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setModalOpen(false);
        }
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    document.body.style.overflow = 'hidden'; // 모달 생성시 스크롤 금지
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      document.body.style.overflow = 'unset'; // 모달 생성시 스크롤 금지
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });
  const handlePlusBtn = () => {
    if (count < 10) {
      setcount(count + 1);
    } else {
      alert('10명 이상으로는 예매할 수 없습니다.');
    }
  };

  const handleMinusBtn = () => {
    if (count > 1) {
      setcount(count - 1);
    } else {
      alert('최소 1명이상 예매가 가능합니다.');
    }
  };
  const handleOkayBtn = (id: any) => {
    localStorage.setItem('인원수', id);
    router.push('/ticketing/fast');
  };

  return (
    <>
      <div className={styled.Modal_background}>
        <div ref={modalRef} className={styled.Modal_Container}>
          <div className={styled.Selected_People}>
            {/* <img src='/People.svg' className={styled.People_svg} /> */}
            <p className={styled.Check_Txt}>인원을 선택해주세요</p>
            <div className={styled.Check_Person}>
              <img
                src='/Minus.svg'
                className={styled.Minus}
                onClick={handleMinusBtn}
              />
              <div className={styled.Circle}>
                <div className={styled.Circle_Number}>{count} 명</div>
              </div>
              <img
                src='/Plus.svg'
                className={styled.Plus}
                onClick={handlePlusBtn}
              />
            </div>
            <div className={styled.Okay}>
              <div
                className={styled.Okay_btn}
                onClick={() => handleOkayBtn(count)}
              >
                확인
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleModal;
