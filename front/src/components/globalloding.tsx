import styled from '../styles/support.module.css';

interface InfoLodingProps {
  LodingTxt: string | null;
}

const GlobalLoding: React.FC<InfoLodingProps> = ({ LodingTxt }) => {
  return (
    <div className={styled.Modal_background}>
      <div className={styled.Modal_Container}>
        <div className={styled.Loding_Container}>
          <p className={styled.Loding_Txt}>{LodingTxt} </p>
          <div className={styled.Loder_Layout}>
            <span className={styled.loader1}>Load ng</span>
            <span className={styled.loader}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GlobalLoding;
