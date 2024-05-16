import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import CartModal from './CartModel';
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
}) => {
  const date = day(createdAt).format('MMM Do,YYY');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Wrapper>
      <img
        src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
        alt='Shoes'
        className='artwork-image'
      />

      <div className='content'>
        <h3 className='artwork-title'>{title}</h3>
        <p className='artwork-description'>{description}</p>
        <div className='content-center'>
          <ArtworkInfo icon={<FaLocationArrow />} text={location} />
          <ArtworkInfo icon={<FaCalendarAlt />} text={createdAt} />
          <ArtworkInfo icon={<BsCurrencyDollar />} text={price} isbirr />
          <ArtworkInfo icon={<FaUser />} text={createdByName} />
        </div>
        <div className='footer-container'>
          <footer className='actions'>
            <Link className='btn edit-btn' to={`../edit-artwork/${_id}`}>
              Edit
            </Link>
            <Form method='post' action={`../delete-artwork/${_id}`}>
              <button type='submit' className='btn delete-btn'>
                Delete
              </button>
            </Form>
          </footer>
          {/* <Link className='btn add-cart-btn' to={`../edit-artwork/${_id}`}>
            Add to Cart
          </Link> */}
          <button className='btn add-cart-btn' onClick={openCart}>
            Add to Cart
          </button>
          {isCartOpen && <CartModal onClose={closeCart} />}
        </div>
      </div>
    </Wrapper>
  );
};
export default Artwork;
