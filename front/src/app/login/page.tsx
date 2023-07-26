import Header from '@/components/_loginpage/header';
import FirstMain from '@/components/_loginpage/firstmain';
import SecondMain from '@/components/_loginpage/secondmain';
import GotoTop from '@/components/gotoTop';

const LoginP = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <FirstMain />
      </div>
      <div>
        <SecondMain />
      </div>
    </>
  );
};

export default LoginP;
