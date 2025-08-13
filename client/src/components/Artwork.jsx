import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { toast } from 'react-toastify';
import { useCartContext } from '../contexts/cartContext';
import { useDashboardContext } from '../pages/DashboardLayout';
import { useState } from 'react';

day.extend(advancedFormat);

const Artwork = ({
  _id,
  title,
  location,
  price,
  description,
  createdAt,
  createdByName,
  avatar,
}) => {
  const { addToCart, cartItems, isDemoUser } = useCartContext();
  const { user } = useDashboardContext();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const date = day(createdAt).format('MMM Do, YYYY');

  // Check if this is a demo artwork
  const isDemoArtwork = _id.startsWith('demo_') || user?.role === 'demo';

  const handleAddToCart = () => {
    try {
      const artworkData = {
        artwork: {
          _id,
          title,
          location,
          price,
          description,
          createdAt,
          createdByName,
          avatar,
        }
      };

      const isInCartItem = cartItems.some(
        (item) => item.artwork._id === _id
      );

      if (isInCartItem) {
        toast.error('Artwork already in cart');
      } else {
        addToCart(artworkData);
        if (isDemoUser) {
          toast.success('🎨 Demo artwork added to cart! (Demo mode)');
        } else {
          toast.success('Artwork added to cart');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add artwork to cart');
    }
  };

  return (
    <Wrapper>
      <div className='relative'>
        <img src={avatar} alt='artwork image' className='artwork-image' />
        {(isDemoUser || isDemoArtwork) && (
          <div className='absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold z-10'>
            DEMO
          </div>
        )}
      </div>
      <div className='content'>
        <div className='artwork-title flex items-center gap-2'>
          {title}
          {(isDemoUser || isDemoArtwork) && (
            <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
              DEMO
            </span>
          )}
        </div>
        <div 
          className='artwork-description-container'
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          <p className={`artwork-description ${showFullDescription ? 'expanded' : 'truncated'}`}>
            {description}
          </p>
          {description.length > 100 && (
            <span className='read-more'>
              {showFullDescription ? 'Show less' : 'Read more'}
            </span>
          )}
        </div>
        <div className='content-center'>
          <ArtworkInfo icon={<FaLocationArrow />} text={location} />
          <ArtworkInfo icon={<FaCalendarAlt />} text={date} />
          <ArtworkInfo icon={<BsCurrencyDollar />} text={price} isbirr />
          <ArtworkInfo icon={<FaUser />} text={createdByName} />
        </div>

        <button
          onClick={handleAddToCart}
          className='w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#2cb1bc] to-[#14919b] hover:from-[#14919b] hover:to-[#0f7a87] text-white font-medium text-sm border-0 transition-all duration-300 shadow-md hover:shadow-lg'
        >
          {isDemoUser ? '🎨 Add To Cart (Demo)' : 'Add To Cart'}
        </button>
      </div>
    </Wrapper>
  );
};

export default Artwork;
