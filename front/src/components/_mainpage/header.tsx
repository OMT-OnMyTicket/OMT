import Link from 'next/link';
import styled from '../../styles/mainP_S/header.module.css';

const Header = () => {
  return (
    <div className={styled.header}>
      <div className={styled.header_content}>
        <div className={styled.conetent}>
          <img src='/OMT_logo4.png' className={styled.logo} />
          <ul className={styled.headerInfo}>
            <li>
              <img src='/search.svg' />
            </li>
            <li>
              <Link href='/'>예매하기</Link>
            </li>
            <li>
              <Link href='/'>My Tickets</Link>
            </li>
            <li>이름</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
