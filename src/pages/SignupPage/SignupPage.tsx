import React from 'react';
import style from '../Form.module.css';
import { useAuth } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    companyName: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    companyName: '',
    password: '',
  });
  const [invalid, setInvalid] = React.useState(false);
  const {register} = useAuth();

  const validate = () => {
    const errs = {
      email: '',
      password: '',
      companyName: '',
    };
    if (!formData.email) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email format';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    }
    if (!formData.companyName) {
      errs.companyName = 'Company Name is required';
    }
    setErrors(errs);
    return (!errs.email && !errs.password);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Form submitted:', formData);
    e.preventDefault();

    if(!validate()) {
      setInvalid(true);
      return;
    }
    else{
      register(formData);
      setInvalid(false);
    }
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.titleBar}>
        <div className="row justify-content-center">
          <h1 className="text-center">Become a partner</h1>
        </div>
      </div>

      <div className={style.formContainer}>
        <p>
          Want to showcase your content in the metaverse ? Signin then
        </p>

        <form id='registerForm'>

          <div className={style.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder='name@orange.com'
              style={invalid ? {border: '2px solid red'} : {border: '1px solid #ccc'}}
            />
            {invalid ? 
              <div style={{ color: 'red', marginTop: 0 }}>
                {errors.email}
              </div>
            : null}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder='Your Company Name'
              style={invalid ? {border: '2px solid red'} : {border: '1px solid #ccc'}}
            />
            {invalid ? 
              <div style={{ color: 'red', marginTop: 0 }}>
                {errors.companyName}
              </div>
            : null}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder='Password'
              style={invalid ? {border: '2px solid red'} : {border: '1px solid #ccc'}}
            /> 
            {invalid ? 
              <div style={{ color: 'red', marginTop: 0 }}>
                {errors.password}
              </div>
            : null}
          </div>

          <div className={style.formGroup}>
            <button type="submit" className={style.submitButton} onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className={style.registerLinks}>
        <Link className={style.registerLink} to='/login'>Already a partner?</Link>
        <Link className={style.registerLink} to=''>Forgot Password?</Link>
      </div>
    </div>
  );
};

export default SignupPage;