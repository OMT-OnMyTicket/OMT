import Header from '@/components/_loginpage/header';
import FirstMain from '@/components/_loginpage/firstmain';
import SecondMain from '@/components/_loginpage/secondmain';
import ThirdMain from '@/components/_loginpage/thirdmain';
import FourthMain from '@/components/_loginpage/fourthmain';

const LoginP = () => {
  return (
    <>
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
    </>
  );
};

export default LoginP;
