import Link from 'next/link';
import styled from '@/styles/loginP_S/header.module.css';

const Header = () => {
  return (
    <>
      <div className={styled.Layout}>
        <Link href='/' className={styled.Home}>
          Home
        </Link>
        <Link href='/' className={styled.Login}>
          Login
        </Link>
      </div>
    </>
  );
};
export default Header;
