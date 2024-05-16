import React from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
export const action = async ({ params }) => {
  // this param is id inside an object
  // console.log(params);
  try {
    await customFetch.delete(`artworks/${params.id}`);
    toast.success('item deleted successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard/all-artworks');
};
const DeleteJob = () => {
  return <h1>DeleteJob</h1>;
};
export default DeleteJob;
