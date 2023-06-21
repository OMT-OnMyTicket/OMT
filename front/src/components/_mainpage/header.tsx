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
              <img src='/search.svg' className={styled.search} />
            </li>
            <li>
              <Link href='/' className={styled.ticketing}>
                예매하기
              </Link>
            </li>
            <li>
              <Link href='/' className={styled.myTickets}>
                My Tickets
              </Link>
            </li>

            <li className={styled.UserName}>
              <img src='/userProfile.svg' className={styled.UserProfile} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
