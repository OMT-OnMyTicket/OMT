import Search from '../../components/_mainpage/search';
import Link from 'next/link';

const Test = () => {
  return (
    <div>
      <Search />
      <Link href='/testpage/a' as={'/testpage/a'}>
        <div>Click me!</div>
      </Link>
    </div>
  );
};
export default Test;
