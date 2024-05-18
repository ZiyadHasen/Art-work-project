import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');
  // ! reduce the last zero
  if (file && file.size > 5000000) {
    toast.error('Image size too large');
    return null;
  }
  try {
    await customFetch.post('/artworks', formData);
    toast.success('Your work Added Successfully');
    return redirect('all-artworks');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Add Your Artwork </h4>

        <div className='form-center'>
          <FormRow type='text' name='title' />
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow
            type='text'
            labelText='Add short Description'
            name='description'
          />
          <FormRow type='text' name='price' />
          <FormRow type='text' name='location' />

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
