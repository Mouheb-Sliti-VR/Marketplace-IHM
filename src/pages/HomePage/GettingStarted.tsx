import style from './HomePage.module.css';
import ButtonLarge from '../../components/Button/ButtonLarge';

const GettingStarted: React.FC = () => {
  const steps = [
    {
      icon: "fas fa-user-plus",
      title: "Step 1",
      desc: "Create an account",
      side: "left",
    },
    {
      icon: "fas fa-id-card",
      title: "Step 2",
      desc: "Finish your account details and upload your logo",
      side: "right",
    },
    {
      icon: "fas fa-sign-in-alt",
      title: "Step 3",
      desc: "Login",
      side: "left",
    },
    {
      icon: "fas fa-box-open",
      title: "Step 4",
      desc: "Choose your desired offer",
      side: "right",
    },
    {
      icon: "fas fa-upload",
      title: "Step 5",
      desc: "Upload your content",
      side: "left",
    },
    {
      icon: "fas fa-credit-card",
      title: "Step 6",
      desc: "Checkout your subscription",
      side: "right",
    },
  ];

  return (
    <section className={style.gettingStartedZigzag}>
      <h2 className="text-center mb-4 fw-bold" style={{ padding: 60, color: "black" }}>
        Getting Started
      </h2>
      <div className={style.gettingStartedSteps}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`${style.stepRow} ${step.side === "right" ? style.stepRowRight : ""}`}
          >
            <div className={style.stepBubble}>
              <i className={`${step.icon} ${style.stepIcon}`}></i>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}

        <div style={{marginTop: 150, marginBottom: 100}} className="text-center">
          <ButtonLarge           
            value="Login And Subscribe"
            icon=""
            onClick={() => {
              window.location.href = '/login';
            }}  
          />
        </div>

        
      </div>
    </section>
  );
}

export default GettingStarted;