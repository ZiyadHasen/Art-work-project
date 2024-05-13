import React from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import ArtworksContainer from '../components/artworksContainer';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/artworks');
    // console.log(data);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllArtworksContext = createContext();
const AllArtworks = () => {
  const { data } = useLoaderData();
  // console.log(data);
  return (
    <AllArtworksContext.Provider value={{ data }}>
      {/* <SearchContainer /> */}
      <ArtworksContainer />
    </AllArtworksContext.Provider>
  );
};

export const useAllArtworksContext = () => useContext(AllArtworksContext);
export default AllArtworks;
