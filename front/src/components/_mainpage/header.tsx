import styled from '../../styles/mainP_S/header.module.css';

const Header = () => {
  return (
    <div className={styled.header}>
      <div className={styled.header_content}>
        <div className={styled.conetent}>
          <h1 className={styled.logo}>로고</h1>
          <ul className={styled.headerInfo}>
            <li>검색icon</li>
            <li>예매하기</li>
            <li>My Tickets</li>
            <li>이름</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
