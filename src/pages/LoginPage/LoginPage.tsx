import React from 'react';
import {useAuth } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import style from '../Form.module.css';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });
  const [invalid, setInvalid] = React.useState(false);
  const {login, isLoggedIn} = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    const errs = {
      email: '',
      password: '',
    };
    if (!formData.email) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email format';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return (!errs.email && !errs.password);
  };
  const handleSubmit = () => {
    console.log('Form submitted:', formData);

    if(!validate()) {
      setInvalid(true);
      return;
    }
    else{
      setInvalid(false);    
      login({email: formData.email, password: formData.password});
    }
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.titleBar}>
        <div className="row justify-content-center">
          <h1 className="text-center">Already a partner</h1>
        </div>
      </div>

      <div className={style.formContainer}>
        <p>
          Advertise your content in the Metaverse world ? Login and subscribe
          to our offers
        </p>

        <form id='loginForm'>
          <div className={style.formGroup}>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email} 
              onChange={(e)=> setFormData({...formData, 'email': e.target.value})} 
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
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={formData.password} 
              onChange={(e)=> setFormData({...formData, 'password': e.target.value})} 
              placeholder='Password'
              style={invalid ? {border: '2px solid red'} : {border: '1px solid #ccc'}}
            />
            {invalid ? 
              <div style={{ color: 'red', marginTop: 0 }}>
                {errors.password}
              </div> 
            : null}
          </div>
          <button type='button' onClick={handleSubmit}>Login</button>
        </form>

        <div className={style.registerLinks}>
          <Link className={style.registerLink} to='/signup'>Create Account</Link>
          <Link className={style.registerLink} to=''>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;