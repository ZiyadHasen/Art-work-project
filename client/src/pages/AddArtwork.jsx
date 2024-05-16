import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  try {
    await customFetch.post('/artworks', data);
    toast.success('Job Added Successfully');

    return redirect('all-artworks');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Your Artwork </h4>

        <div className='form-center'>
          <FormRow type='text' name='title' />
          <FormRow
            type='text'
            labelText='Add short Description'
            name='description'
          />
          <FormRow type='text' name='price' />
          <FormRow type='text' name='location' />
          <div>wi will add fill add soon</div>
          {/* there will be image field */}

          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
