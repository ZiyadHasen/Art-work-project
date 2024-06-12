import React from 'react';
import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

day.extend(advancedFormat);
let CartItems = [];

const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/artworks/${params.id}`);
    CartItems.push(data);
    console.log('CartItems:', CartItems);
    return data;
  } catch (error) {
    console.error(error);
    toast.error('Failed to fetch artwork data');
    return {};
  }
};
// console.log(CartItems);
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
  const date = day(createdAt).format('MMM Do,YYY');

  const handleAddToCart = async () => {
    try {
      const data = await loader({ params: { id: _id } });
      console.log('Artwork data:', data);
      // Handle adding the artwork to the cart here
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
          <div className='collapse-title artwork-title'>{title}</div>
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

export { CartItems, loader }; // Export CartItems and loader as named exports

export default Artwork;
