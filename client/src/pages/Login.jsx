import {
  Link,
  Form,
  redirect,
  useNavigation,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

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
  const isSubmitting = navigation.state === 'submitting';

  const handleDemoLogin = async () => {
    try {
      await customFetch.post('/auth/demo-login');
      toast.success('Demo login successful');
      // Redirect to dashboard (works for both local and production)
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <button
          type='submit'
          className='button button-block my-3'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>

        <div className='demo-section'>
          <p className='demo-text'>Want to try the app?</p>
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
          Not a member yet?
          <Link to='/register' className=' member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
