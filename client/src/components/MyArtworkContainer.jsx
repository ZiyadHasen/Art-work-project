import ArtworkMy from './ArtworkMy';
import Wrapper from '../assets/wrappers/ArtworksContainer';

import { useMyArtworksContext } from '../pages/MyArtworks';

const MyArtworkContainer = () => {
  const { data } = useMyArtworksContext();
  const { artworks } = data;
  // console.log(artworks);
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
          return <ArtworkMy key={artwork._id} {...artwork} />;
        })}
      </div>
    </Wrapper>
  );
};

export default MyArtworkContainer;
