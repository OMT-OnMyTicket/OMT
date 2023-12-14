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
  }, [router]); // Include router in the dependency array

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
