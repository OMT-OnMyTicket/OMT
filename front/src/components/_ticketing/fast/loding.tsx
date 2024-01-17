import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Update import statement
import styled from '../../../styles/ticketingP_S/loding.module.css';

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const LodingModal = ({ setModalOpen }: PropsType) => {
  const [loadingText, setLoadingText] = useState(
    '가장 가까운 시간대를 탐색중입니다.'
  );
  const router = useRouter();
  const closeModal = () => {
    setModalOpen(false);
  };
  // Turn off function when clicking outside the modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // event handler function
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

    // Register event handler
    document.addEventListener('mousedown', handler);
    document.body.style.overflow = 'hidden'; // Do not scroll when creating a modal
    // document.addEventListener('touchstart', handler); // Mobile response

    // 5초 후 로딩 텍스트 변경
    const timeoutId = setTimeout(() => {
      setLoadingText('후방 가장자리를 탐색중입니다.');

      // 오늘 날짜 yyyy-mm-dd 변환
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${currentDate
        .getDate()
        .toString()
        .padStart(2, '0')}`;
      localStorage.setItem('예매날짜', formattedDate);

      // 현재시각에서 1시간 + 하기
      const closestTime = new Date(currentDate.getTime() + 60 * 60 * 1000);
      closestTime.setMinutes(30 * Math.ceil(closestTime.getMinutes() / 30)); // Round to the nearest 30 minutes

      // localSotrage에 예매정보 저장
      const formattedTime = `${closestTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${closestTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      localStorage.setItem('예매정보', JSON.stringify({ time: formattedTime }));

      // 인원 수에 따라 임의 좌석 선택 생성
      const numberOfAttendees = parseInt(
        localStorage.getItem('인원수') || '0',
        10
      );
      const selectedSeats = generateConsecutiveSeats(numberOfAttendees);
      localStorage.setItem('선택좌석', selectedSeats);

      // 5초 후에 티켓팅/결제 페이지로 리디렉션
      setTimeout(() => {
        router.push('/ticketing/pay');
      }, 5000);
    }, 5000);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.body.style.overflow = 'unset'; // Do not scroll when creating a modal
      // document.removeEventListener('touchstart', handler); // Mobile response

      // 구성 요소가 마운트 해제되거나 효과가 다시 실행될 때의 시간 초과를 지우기
      clearTimeout(timeoutId);
    };
  }, [router]);

  // Function to generate consecutive seat selections
  const generateConsecutiveSeats = (numberOfSeats: number) => {
    const seatCategories = ['E', 'F', 'G', 'H'];
    const seatNumbers = ['3', '4', '5', '6', '7', '8', '9', '10', '11'];
    const selectedSeats: string[] = [];

    for (let i = 0; i < numberOfSeats; i++) {
      const randomCategoryIndex = Math.floor(
        Math.random() * seatCategories.length
      );
      const randomCategory = seatCategories[randomCategoryIndex];

      const randomSeatNumberIndex = Math.floor(
        Math.random() * seatNumbers.length
      );
      const randomSeatNumber = seatNumbers[randomSeatNumberIndex];

      const seat = `${randomCategory}${randomSeatNumber}`;
      selectedSeats.push(seat);
    }

    return selectedSeats.join(',');
  };

  return (
    <>
      <div className={styled.Modal_background}>
        <div ref={modalRef} className={styled.Modal_Container}>
          <div className={styled.Loding_Container}>
            <p className={styled.Loding_Txt}>{loadingText}</p>
            <div className={styled.Loder_Layout}>
              <span className={styled.loader1}>Load ng</span>
              <span className={styled.loader}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LodingModal;
