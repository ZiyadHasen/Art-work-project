import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { toast } from 'react-toastify';
import { useCartContext } from '../contexts/cartContext';

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
        <div className='collapse'>
          <input type='checkbox' />
          <div className='collapse-title artwork-title z-0'>{title}</div>
          <div className='collapse-content'>
            <p className='artwork-description'>{description}</p>
          </div>
        </div>
        <div className='content-center'>
          <ArtworkInfo icon={<FaLocationArrow />} text={location} />
          <ArtworkInfo icon={<FaCalendarAlt />} text={date} />
          <ArtworkInfo icon={<BsCurrencyDollar />} text={price} isbirr />
          <ArtworkInfo icon={<FaUser />} text={createdByName} />
        </div>

        <button
          onClick={handleAddToCart}
          className='px-3 py-2 rounded-md bg-[#2cb1bc] hover:bg-[#14919b] text-[#fff] text-[14px]  border-0'
        >
          Add To Cart
        </button>
      </div>
    </Wrapper>
  );
};

export default Artwork;
