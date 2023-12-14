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

    // Change loading text after 5 seconds
    const timeoutId = setTimeout(() => {
      setLoadingText('후방 가장자리를 탐색중입니다.');

      // Save today's date in yyyy-mm-dd format to local storage
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

      // Find the closest time (current time + 1 hour)
      const closestTime = new Date(currentDate.getTime() + 60 * 60 * 1000);
      closestTime.setMinutes(30 * Math.ceil(closestTime.getMinutes() / 30)); // Round to the nearest 30 minutes

      // Save the closest time to local storage
      const formattedTime = `${closestTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${closestTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      localStorage.setItem('예매정보', JSON.stringify({ time: formattedTime }));

      // Generate random seat selections based on the number of attendees
      const numberOfAttendees = parseInt(
        localStorage.getItem('인원수') || '0',
        10
      );
      const selectedSeats = generateConsecutiveSeats(numberOfAttendees);
      localStorage.setItem('선택좌석', selectedSeats);

      // Redirect to the ticketing/pay page after another 5 seconds
      setTimeout(() => {
        router.push('/ticketing/pay');
      }, 5000);
    }, 5000);

    return () => {
      // Release event handler
      document.removeEventListener('mousedown', handler);
      document.body.style.overflow = 'unset'; // Do not scroll when creating a modal
      // document.removeEventListener('touchstart', handler); // Mobile response

      // Clear the timeouts when the component unmounts or the effect is re-run
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
