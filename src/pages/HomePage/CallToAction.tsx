import style from './HomePage.module.css';
import ButtonMedium from '../../components/Button/ButtonMedium';

const Cta: React.FC = () => {
  return (
    <div className={`${style.cta} d-flex align-items-center justify-content-start text-white position-relative font-sans-serif`}>
      <div className={`${style.overlay} w-100 h-100 d-flex align-items-center`}>
        <div className={`${style.content} `}>
          <h2>GROW YOUR BUSINESS</h2>
          <p>Our marketplace solution offers powerful services designed to drive growth, expand your reach, and unlock new opportunities.</p>
          <ButtonMedium
            value="Get Started"
            icon=''
            onClick={() => {
              window.location.href = '#offers';
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Cta;