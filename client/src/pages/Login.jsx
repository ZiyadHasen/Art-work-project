import { Link, Form, redirect, useNavigation, } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { useState } from 'react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'
  const [isDemoLoggingIn, setIsDemoLoggingIn] = useState(false);

  const handleDemoLogin = async () => {
    setIsDemoLoggingIn(true);
    try {
      await customFetch.post('/auth/demo-login');
      // Remove the success toast for demo login
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Demo login failed');
    } finally {
      setIsDemoLoggingIn(false);
    }
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            className='form-input'
            defaultValue='test@test.com'
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-input'
            defaultValue='secret123'
            required
          />
        </div>
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <div className='demo-section'>
          <button
            type='button'
            className='button button-block demo-btn'
            onClick={handleDemoLogin}
            disabled={isDemoLoggingIn}
          >
            {isDemoLoggingIn ? 'Logging in...' : 'Demo User Login'}
          </button>
        </div>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
