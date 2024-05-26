import Artwork from './Artwork';
import Wrapper from '../assets/wrappers/ArtworksContainer';

import { useAllArtworksContext } from '../pages/AllArtworks';
import PageBtnContainer from './PageBtnContainer';

const ArtworksContainer = () => {
  const { data } = useAllArtworksContext();
  // console.log(data);
  const { artworks, totalArtworks, numOfPages } = data;
  // console.log(artworks, totalArtworks, numOfPages);
  if (artworks.length === 0) {
    return (
      <Wrapper>
        <h2>No artworks to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalArtworks} artwork{artworks.length > 1 && 's'} found
      </h5>
      <div className='artworks'>
        {artworks.map((artwork) => {
          return <Artwork key={artwork._id} {...artwork} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default ArtworksContainer;
