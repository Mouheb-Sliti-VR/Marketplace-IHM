import style from './HomePage.module.css';

const Values: React.FC = () => {
  return (
    <div className={`${style.values} text-black position-relative`}>
      <div className={`${style.valuesContainer} container position-absolute top-50 start-50 translate-middle`}>
        <div className="row">
          <div className='col-md-4 text-center'>
            <i className={`fas fa-lightbulb fa-3x`}></i>
            <h4 className='fw-bold'>Innovation</h4>
            <p>We strive to push the boundaries of technology and creativity, delivering cutting-edge solutions for our partners.</p>
          </div>
          <div className='col-md-4 text-center'>
            <i className={"fas fa-user-check fa-3x"}></i>
            <h4 className='fw-bold'>Onboarding</h4>
            <p>We ensure a seamless onboarding experience for our partners, providing the support and resources needed to succeed from day one.</p>
          </div>
          <div className='col-md-4 text-center'>
            <i className={`fas fa-chart-bar fa-3x`}></i>
            <h4 className='fw-bold'>Integrity</h4>
            <p>We uphold the highest standards of honesty and transparency in all our interactions, fostering trust and respect.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Values;