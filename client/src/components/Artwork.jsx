import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { toast } from 'react-toastify';
import { useCartContext } from '../contexts/cartContext';
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
  const { addToCart, cartItems } = useCartContext(); // Destructure addToCart from the context
  const [showFullDescription, setShowFullDescription] = useState(false);
  const date = day(createdAt).format('MMM Do, YYYY');

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
        toast.success('Artwork added to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add artwork to cart');
    }
  };

  return (
    <Wrapper>
      <img src={avatar} alt='artwork image' className='artwork-image ' />
              <div className='content'>
          <div className='artwork-title'>{title}</div>
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
          className='w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#2cb1bc] to-[#14919b] hover:from-[#14919b] hover:to-[#0f7a87] text-white font-medium text-sm border-0 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg'
        >
          Add To Cart
        </button>
      </div>
    </Wrapper>
  );
};

export default Artwork;
