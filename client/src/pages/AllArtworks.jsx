import React from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import ArtworksContainer from '../components/artworksContainer';
import SearchContainer from '../components/SearchContainer';
export const loader = async ({ request }) => {
  // !this is how our query params are converted to objects extracted from the url

  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(params);
    const { data } = await customFetch.get('/artworks/all-artworks', {
      params,
    });
    // console.log(data);
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllArtworksContext = createContext();
const AllArtworks = () => {
  const { data, searchValues } = useLoaderData();
  // console.log(data);
  return (
    <AllArtworksContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <ArtworksContainer />
    </AllArtworksContext.Provider>
  );
};

export const useAllArtworksContext = () => useContext(AllArtworksContext);
export default AllArtworks;
