import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { ARTWORK_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/artworks/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-artworks');
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/artworks/${params.id}`, data);
    toast.success('item edited successfully');
    return redirect('/dashboard/all-artworks');
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob = () => {
  const { artwork } = useLoaderData();
  // console.log(artwork);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  // console.log(Object.values(ARTWORK_STATUS));

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Your work </h4>

        <div className='form-center'>
          <FormRow type='text' name='title' defaultValue={artwork.title} />
          <FormRow
            type='text'
            labelText='Add short Description'
            name='description'
            defaultValue={artwork.description}
          />
          <FormRow type='text' name='price' defaultValue={artwork.price} />
          <FormRow
            type='text'
            name='location'
            defaultValue={artwork.location}
          />
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

export default EditJob;
