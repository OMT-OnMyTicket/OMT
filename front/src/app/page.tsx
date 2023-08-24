import Header from '@/components/_loginpage/header';
import FirstMain from '@/components/_loginpage/firstmain';
import SecondMain from '@/components/_loginpage/secondmain';
import ThirdMain from '@/components/_loginpage/thirdmain';
import FourthMain from '@/components/_loginpage/fourthmain';
import Loginpage from '@/components/_loginpage/loginpage';
import styled from '@/styles/loginP_S/main.module.css';

const LoginP = () => {
  return (
    <>
      <nav>
        <Header />
      </nav>
      <main className={styled.Login_Page_Layout}>
        <section>
          <FirstMain />
        </section>
        <section>
          <SecondMain />
        </section>
        <section>
          <ThirdMain />
        </section>
        <section>
          <FourthMain />
        </section>
        <section>
          <Loginpage />
        </section>
      </main>
    </>
  );
};

export default LoginP;
