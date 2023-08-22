import styled from '../styles/support.module.css';

interface PageCheckProps {
  activePage: number;
}

const PageCheck: React.FC<PageCheckProps> = ({ activePage }) => {
  return (
    <div className={styled.PageCheck}>
      <div className={activePage === 1 ? styled.ActivePage : styled.Page1}>
        1
      </div>
      <div className={activePage === 2 ? styled.ActivePage : styled.Page2}>
        2
      </div>
      <div className={activePage === 3 ? styled.ActivePage : styled.Page3}>
        3
      </div>
      <div className={activePage === 4 ? styled.ActivePage : styled.Page4}>
        4
      </div>
      <div className={activePage === 5 ? styled.ActivePage : styled.Page5}>
        5
      </div>
      <div className={activePage === 6 ? styled.ActivePage : styled.Page6}>
        6
      </div>
    </div>
  );
};

export default PageCheck;
