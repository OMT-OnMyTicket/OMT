import Search from '../../components/_mainpage/search';
import Link from 'next/link';

const Test = () => {
  return (
    <div>
      <Search />
      <Link href='/testpage/dasfk' as={'/testpage/dasfk'}>
        <div>Click me!</div>
      </Link>
    </div>
  );
};
export default Test;
