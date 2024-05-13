import React from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import JobsContainer from '../components/JobsContainer';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs');
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllJobsContext = createContext();
const AllJobs = () => {
  const { data } = useLoaderData();
  // console.log(data);
  return (
    <AllJobsContext.Provider value={{ data }}>
      {/* <SearchContainer /> */}
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
