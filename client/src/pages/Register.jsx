import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import { Form, redirect, useNavigation, Link, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  const handleDemoLogin = async () => {
    try {
      await customFetch.post('/auth/demo-login');
      // Remove the success toast for demo login
      // Use React Router navigation instead of window.location.href
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Demo login failed');
    }
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <button
          type='submit'
          className='button-block button'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>

        <div className='demo-section'>
          <button
            type='button'
            className='button button-block demo-btn'
            onClick={handleDemoLogin}
            disabled={isSubmitting}
          >
            Demo User Login
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
