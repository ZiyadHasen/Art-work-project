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

  // Validate description length
  const description = formData.get('description');
  if (description && description.length > 400) {
    toast.error('Description should not exceed 400 characters');
    return null;
  }

  try {
    await customFetch.post('/artworks', formData);
    toast.success('Your work Added Successfully');
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
          <div className='form-row'>
            <label className='form-label'>Add Description</label>
            <textarea
              type='text'
              name='description'
              className='form-input w-full textarea-bordered textarea-xs '
            ></textarea>
          </div>
          {/* <FormRow type='text' labelText='' name='description' /> */}
          <FormRow type='text' name='price' />
          <FormRow type='text' name='location' />

          <button
            type='submit'
            className='btn bg-[#2cb1bc] disabled:bg-[#14919b] disabled:text-[#fff] hover:bg-[#14919b] text-[#fff] text-[16px] btn-block form-btn border-0'
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
