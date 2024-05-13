import Artwork from './Artwork';
import Wrapper from '../assets/wrappers/ArtworksContainer';

import { useAllArtworksContext } from '../pages/AllArtworks';

const ArtworksContainer = () => {
  const { data } = useAllArtworksContext();
  const { artworks } = data;
  // console.log(artworks);
  // console.log(artworks[0].artworkstatus);
  if (artworks.length === 0) {
    return (
      <Wrapper>
        <h2>No artworks to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='artworks'>
        {artworks.map((artwork) => {
          return <Artwork key={artwork._id} {...artwork} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ArtworksContainer;
