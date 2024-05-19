import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Cart from './Cart';
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
  const date = day(createdAt).format('MMM Do,YYY');

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
        <div className='footer-container'>
          <button
            className='px-3 py-2 rounded-md bg-[#2cb1bc] hover:bg-[#14919b] text-[#fff] text-[14px]  border-0'
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            Add To Cart
          </button>
        </div>
        <Cart />
      </div>
    </Wrapper>
  );
};
export default Artwork;
