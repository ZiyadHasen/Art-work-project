import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
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
