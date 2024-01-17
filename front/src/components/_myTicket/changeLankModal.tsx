import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '../../styles/myticketP_S/changeLank.module.css';

interface PropsType {
  setModalOpen: (open: boolean) => void;
}

const ChangeLankModal = ({ setModalOpen }: PropsType) => {
  const router = useRouter();
  const closeModal = () => {
    setModalOpen(false);
  };

  const [movieTitles, setMovieTitles] = useState([
    '1위 영화제목',
    '2위 영화제목',
    '3위 영화제목',
    '4위 영화제목'
  ]);

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const updatedTitles = [...movieTitles];
      const temp = updatedTitles[index - 1];
      updatedTitles[index - 1] = updatedTitles[index];
      updatedTitles[index] = temp;
      setMovieTitles(updatedTitles);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < movieTitles.length - 1) {
      const updatedTitles = [...movieTitles];
      const temp = updatedTitles[index + 1];
      updatedTitles[index + 1] = updatedTitles[index];
      updatedTitles[index] = temp;
      setMovieTitles(updatedTitles);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    document.addEventListener('mousedown', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handler);
      document.body.style.overflow = 'unset';
    };
  });

  const handleOkayBtn = () => {
    // apply fill
  };

  return (
    <>
      <div className={styled.Modal_background}>
        <div ref={modalRef} className={styled.Modal_Container}>
          <div className={styled.Modal_Title}> 나의 영화 순위 </div>
          <div className={styled.Lank_Container}>
            {movieTitles.map((title, index) => (
              <div key={index} className={styled.Lank_div}>
                <p className={styled.Lank}>{`${index + 1}위`}</p>
                <p className={styled.Lanked_moive}>{title}</p>
                <div className={styled.Moving_Lank}>
                  <img
                    src='/png/Up.png'
                    className={styled.Moving_UP}
                    onClick={() => handleMoveUp(index)}
                  />
                  <img
                    src='/png/Down.png'
                    className={styled.Moving_Down}
                    onClick={() => handleMoveDown(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styled.Okay}>
            <div className={styled.Okay_btn} onClick={() => handleOkayBtn()}>
              변경하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeLankModal;
