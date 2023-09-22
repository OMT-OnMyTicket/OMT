import Link from 'next/link';
import styled from '../../styles/mainP_S/header.module.css';

const Header = () => {
  // const UserProfile = localStorage.getItem('userProfile');
  // const profileImage = UserProfile ? `${UserProfile}` : '/userProfile.svg';
  // const Userid = localStorage.getItem('userId');
  // const UserName = localStorage.getItem('userName');
  // const LoginCheck = Userid ? `${UserName}` : `로그인하기`;

  return (
    <div className={styled.header}>
      <div className={styled.header_content}>
        <div className={styled.conetent}>
          <img src='/png/OMT_logo4.png' className={styled.logo} />
          <ul className={styled.headerInfo}>
            {/* <li>
              <img src='/search.svg' className={styled.search} />
            </li> */}
            <li>
              <Link href='/ticketing' className={styled.ticketing}>
                예매하기
              </Link>
            </li>
            <li>
              <Link href='/' className={styled.myTickets}>
                My Tickets
              </Link>
            </li>

            <li className={styled.User}>
              <img src={'/userProfile.svg'} className={styled.UserProfile} />
              <div className={styled.UserName}>김세훈 님</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
