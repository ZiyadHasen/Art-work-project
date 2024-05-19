import React from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import MyArtworkContainer from '../components/MyArtworkContainer';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/artworks/my-artworks');
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { error: error.message };
  }
};

const MyArtworksContext = createContext();

const MyArtworks = () => {
  const { data, error } = useLoaderData();

  if (error) {
    return <div>Error loading artworks: {error}</div>;
  }

  return (
    <MyArtworksContext.Provider value={{ data }}>
      <MyArtworkContainer />
    </MyArtworksContext.Provider>
  );
};

export const useMyArtworksContext = () => useContext(MyArtworksContext);
export default MyArtworks;
