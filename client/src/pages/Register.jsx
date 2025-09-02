import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { useState } from 'react';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
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
        <h4>register</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            name='name'
            className='form-input'
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='lastName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            name='lastName'
            className='form-input'
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            className='form-input'
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
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='location' className='form-label'>
            Location
          </label>
          <input
            type='text'
            name='location'
            className='form-input'
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
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
