import Header from '@/components/_loginpage/header';
import FirstMain from '@/components/_loginpage/firstmain';
import SecondMain from '@/components/_loginpage/secondmain';
import ThirdMain from '@/components/_loginpage/thirdmain';
import FourthMain from '@/components/_loginpage/fourthmain';
import Loginpage from '@/components/_loginpage/loginpage';
import styled from '@/styles/loginP_S/main.module.css';

const LoginP = () => {
  return (
    <div className={styled.Login_Page_Layout}>
      <header>
        <Header />
      </header>
      <div>
        <FirstMain />
      </div>
      <div>
        <SecondMain />
      </div>
      <div>
        <ThirdMain />
      </div>
      <div>
        <FourthMain />
      </div>
      <div>
        <Loginpage />
      </div>
    </div>
  );
};

export default LoginP;
